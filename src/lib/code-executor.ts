export interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'info';
  message: string;
  timestamp: number;
}

export interface ExecutionResult {
  success: boolean;
  output: ConsoleMessage[];
  error?: string;
  executionTime: number;
}

// TypeScript type annotation stripper
function stripTypeScript(code: string): string {
  let result = code;

  // Remove interface and type definitions
  result = result.replace(/^(interface|type)\s+\w+.*$/gm, '');

  // Remove generic type parameters from class/function definitions
  result = result.replace(/(class|function)\s+(\w+)<[^>]+>/g, '$1 $2');

  // Remove return type annotations (including complex types with generics)
  // Handles: ): Type => or ): Type {
  result = result.replace(/\)\s*:\s*[^=>{]+(\s*=>|\s*\{)/g, ')$1');

  // Remove type annotations from parameters and variables
  // Handles: : Type, : Type), : Type =, : Type;, : Type {
  // This regex handles nested generics like Promise<string> or Record<string, number>
  result = result.replace(/:\s*([A-Z]\w*(<[^>]+>)?(\[\])?|string|number|boolean|any|void|unknown|never|object)(\s*[,)=;{])/g, '$4');

  // Remove optional type markers (?)
  result = result.replace(/\?\s*:/g, ':');
  result = result.replace(/:\s*([,)=;{])/g, '$1');

  // Remove 'as Type' assertions (including complex types)
  result = result.replace(/\s+as\s+[A-Z]\w*(<[^>]+>)?(\[\])?/g, '');

  // Remove Array<Type> syntax and replace with []
  result = result.replace(/Array<[^>]+>/g, '[]');

  // Clean up any remaining standalone : followed by a type
  result = result.replace(/:\s*\w+(<[^>]+>)?(\[\])?\s*([,)=;{])/g, '$3');

  return result;
}

export async function executeCode(code: string): Promise<ExecutionResult> {
  const output: ConsoleMessage[] = [];
  const startTime = performance.now();

  // Store original console methods
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalInfo = console.info;

  try {
    // Strip TypeScript type annotations
    const jsCode = stripTypeScript(code);

    // Log stripped code for debugging (only in development)
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      originalLog('[Code Executor] Stripped code:', jsCode);
    }

    // Create console interceptors
    const createInterceptor = (type: ConsoleMessage['type']) => {
      return (...args: unknown[]) => {
        const message = args
          .map((arg) => {
            if (typeof arg === 'object' && arg !== null) {
              try {
                return JSON.stringify(arg, null, 2);
              } catch {
                return String(arg);
              }
            }
            return String(arg);
          })
          .join(' ');

        output.push({
          type,
          message,
          timestamp: Date.now(),
        });
      };
    };

    // Override console methods
    console.log = createInterceptor('log');
    console.error = createInterceptor('error');
    console.warn = createInterceptor('warn');
    console.info = createInterceptor('info');

    // Create async function to support await
    const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

    // Wrap code in try-catch to capture runtime errors
    // Also wrap in async IIFE and await it to ensure all async operations complete
    const wrappedCode = `
      return (async () => {
        try {
          ${jsCode}
        } catch (error) {
          console.error('Runtime Error:', error.message);
          console.error('Stack:', error.stack);
          throw error;
        }
      })();
    `;

    // Execute code
    const func = new AsyncFunction('require', 'crypto', 'Buffer', 'performance', wrappedCode);

    // Browser-compatible Buffer polyfill
    const BufferPolyfill = {
      from: (data: string | Uint8Array | number[], encoding?: string) => {
        if (typeof data === 'string') {
          if (encoding === 'base64') {
            const binaryString = atob(data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes;
          }
          return new TextEncoder().encode(data);
        }
        if (Array.isArray(data)) {
          return new Uint8Array(data);
        }
        if (data instanceof Uint8Array) {
          return data;
        }
        return new Uint8Array(0);
      },
      alloc: (size: number) => {
        return new Uint8Array(size);
      },
    };

    // Add Buffer methods to Uint8Array prototype
    Object.defineProperty(Uint8Array.prototype, 'toString', {
      value: function(this: Uint8Array, encoding?: string) {
        if (encoding === 'base64') {
          const bytes = Array.from(this) as number[];
          const binaryString = String.fromCharCode(...bytes);
          return btoa(binaryString);
        }
        return new TextDecoder().decode(this);
      },
      writable: true,
      configurable: true,
    });

    Object.defineProperty(Uint8Array.prototype, 'writeBigInt64BE', {
      value: function(value: bigint, offset: number = 0) {
        const view = new DataView(this.buffer);
        view.setBigInt64(offset, value, false); // false = big-endian
      },
      writable: true,
      configurable: true,
    });

    // Browser-compatible crypto polyfill with Node.js-like API using Web Crypto API
    const cryptoPolyfill = {
      createHmac: (algorithm: string, key: Uint8Array | string) => {
        // Always convert key to Uint8Array upfront
        const keyData: Uint8Array = typeof key === 'string' ? new TextEncoder().encode(key) : key;
        let data: Uint8Array = new Uint8Array(0);

        // Map Node.js algorithm names to Web Crypto API names
        const algoMap: Record<string, string> = {
          'sha1': 'SHA-1',
          'sha256': 'SHA-256',
          'sha512': 'SHA-512',
        };

        return {
          update: (input: Uint8Array | string) => {
            const inputData = typeof input === 'string' ? new TextEncoder().encode(input) : input;
            const combined = new Uint8Array(data.length + inputData.length);
            combined.set(data);
            combined.set(inputData, data.length);
            data = combined;
            return {
              update: cryptoPolyfill.createHmac(algorithm, keyData).update,
              digest: async (encoding?: string) => {
                const webCryptoAlgo = algoMap[algorithm.toLowerCase()] || 'SHA-256';

                try {
                  // Create a proper ArrayBuffer-backed Uint8Array for Web Crypto API
                  const keyBuffer = new Uint8Array(keyData);

                  // Import key for HMAC
                  const cryptoKey = await crypto.subtle.importKey(
                    'raw',
                    keyBuffer,
                    { name: 'HMAC', hash: webCryptoAlgo },
                    false,
                    ['sign']
                  );

                  // Create a proper ArrayBuffer-backed Uint8Array for data
                  const dataBuffer = new Uint8Array(data);

                  // Sign the data (HMAC)
                  const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
                  const result = new Uint8Array(signature);

                  // Return based on encoding
                  if (encoding === 'hex') {
                    return Array.from(result)
                      .map(b => b.toString(16).padStart(2, '0'))
                      .join('');
                  } else if (encoding === 'base64') {
                    const binaryString = String.fromCharCode(...result);
                    return btoa(binaryString);
                  }

                  return result;
                } catch (err) {
                  console.error('HMAC Error:', err);
                  throw err;
                }
              },
            };
          },
          digest: async (encoding?: string) => {
            const webCryptoAlgo = algoMap[algorithm.toLowerCase()] || 'SHA-256';

            try {
              // Create a proper ArrayBuffer-backed Uint8Array for Web Crypto API
              const keyBuffer = new Uint8Array(keyData);

              // Import key for HMAC
              const cryptoKey = await crypto.subtle.importKey(
                'raw',
                keyBuffer,
                { name: 'HMAC', hash: webCryptoAlgo },
                false,
                ['sign']
              );

              // Create a proper ArrayBuffer-backed Uint8Array for data
              const dataBuffer = new Uint8Array(data);

              // Sign the data (HMAC)
              const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
              const result = new Uint8Array(signature);

              // Return based on encoding
              if (encoding === 'hex') {
                return Array.from(result)
                  .map(b => b.toString(16).padStart(2, '0'))
                  .join('');
              } else if (encoding === 'base64') {
                const binaryString = String.fromCharCode(...result);
                return btoa(binaryString);
              }

              return result;
            } catch (err) {
              console.error('HMAC Error:', err);
              throw err;
            }
          },
        };
      },
      randomBytes: (size: number) => {
        const bytes = new Uint8Array(size);
        crypto.getRandomValues(bytes);
        return bytes;
      },
    };

    // Provide safe mock implementations
    const mockRequire = (module: string) => {
      if (module === 'crypto') {
        return cryptoPolyfill;
      }
      throw new Error(`Module "${module}" is not available in this environment`);
    };

    // Execute and await all async operations
    const result = await func(mockRequire, cryptoPolyfill, BufferPolyfill, performance);

    // If the code returns a promise, await it
    if (result instanceof Promise) {
      await result;
    }

    // Small delay to ensure all console output is captured
    await new Promise(resolve => setTimeout(resolve, 50));

    const executionTime = performance.now() - startTime;

    // Log output for debugging
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      originalLog('[Code Executor] Output:', output);
      originalLog('[Code Executor] Output length:', output.length);
    }

    return {
      success: true,
      output,
      executionTime,
    };
  } catch (error) {
    const executionTime = performance.now() - startTime;

    // Add error to output if not already captured
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorStack = error instanceof Error ? error.stack : '';

    if (!output.some((msg) => msg.type === 'error' && msg.message.includes(errorMessage))) {
      output.push({
        type: 'error',
        message: `Error: ${errorMessage}`,
        timestamp: Date.now(),
      });

      if (errorStack) {
        output.push({
          type: 'error',
          message: errorStack,
          timestamp: Date.now(),
        });
      }
    }

    // Log error for debugging
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      originalError('[Code Executor] Error:', error);
      originalError('[Code Executor] Output:', output);
    }

    return {
      success: false,
      output,
      error: errorMessage,
      executionTime,
    };
  } finally {
    // Restore original console methods
    console.log = originalLog;
    console.error = originalError;
    console.warn = originalWarn;
    console.info = originalInfo;
  }
}

export function formatExecutionTime(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(0)}µs`;
  } else if (ms < 1000) {
    return `${ms.toFixed(2)}ms`;
  } else {
    return `${(ms / 1000).toFixed(2)}s`;
  }
}
