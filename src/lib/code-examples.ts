export interface CodeExample {
  id: string;
  title: string;
  description: string;
  code: string;
  category: "authentication" | "security" | "algorithms" | "utilities";
  difficulty: "beginner" | "intermediate" | "advanced";
  blogPost?: string;
  tags: string[];
}

export const codeExamples: CodeExample[] = [
  // Authentication Examples
  {
    id: "totp-generate",
    title: "TOTP Token Generation",
    description: "Generate a Time-based One-Time Password (TOTP) token. This is the algorithm used by Google Authenticator and other 2FA apps.",
    category: "authentication",
    difficulty: "advanced",
    blogPost: "/blog/implementing-totp-authentication",
    tags: ["2fa", "totp", "security"],
    code: `// TOTP Token Generation
// Time-based One-Time Password Algorithm (RFC 6238)

const crypto = require('crypto');

function base32Decode(base32: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';

  for (const char of base32.replace(/=/g, '')) {
    const val = alphabet.indexOf(char.toUpperCase());
    bits += val.toString(2).padStart(5, '0');
  }

  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substr(i, 8), 2));
  }

  return Buffer.from(bytes);
}

async function generateTOTP(secret: string, window: number = 0): Promise<string> {
  // Get current time step (30-second intervals)
  const epoch = Math.floor(Date.now() / 1000);
  const timeStep = Math.floor(epoch / 30) + window;

  // Convert time to 8-byte buffer
  const buffer = Buffer.alloc(8);
  buffer.writeBigInt64BE(BigInt(timeStep));

  // Decode secret from Base32
  const key = base32Decode(secret);

  // Generate HMAC-SHA1
  const hmac = crypto.createHmac('sha1', key);
  const hash = await hmac.update(buffer).digest();

  // Dynamic truncation (RFC 4226)
  const offset = hash[hash.length - 1] & 0x0f;
  const binary =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  // Generate 6-digit OTP
  const otp = binary % 1000000;
  return otp.toString().padStart(6, '0');
}

// Test with a secret (async execution)
(async () => {
  const secret = 'JBSWY3DPEHPK3PXP';
  const currentToken = await generateTOTP(secret);
  const timeLeft = 30 - (Math.floor(Date.now() / 1000) % 30);

  console.log('🔐 TOTP Token Generator');
  console.log('━'.repeat(40));
  console.log('Secret:', secret);
  console.log('Current Token:', currentToken);
  console.log('Valid for:', timeLeft, 'seconds');
  console.log('\\n💡 Try scanning this secret in Google Authenticator!');
})();`,
  },
  {
    id: "jwt-create-verify",
    title: "JWT Creation & Verification",
    description: "Create and verify JSON Web Tokens with HMAC-SHA256 signing. Learn how JWTs work under the hood.",
    category: "authentication",
    difficulty: "intermediate",
    blogPost: "/blog/jwt-refresh-tokens-architecture",
    tags: ["jwt", "tokens", "authentication"],
    code: `// JWT Token Creation and Verification
// Industry-standard authentication tokens

const crypto = require('crypto');

function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(str, 'base64').toString();
}

async function createJWT(payload: object, secret: string, expiresIn: number = 900): Promise<string> {
  const header = { alg: 'HS256', typ: 'JWT' };

  const now = Math.floor(Date.now() / 1000);
  const fullPayload = { ...payload, iat: now, exp: now + expiresIn };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signatureBase = \`\${encodedHeader}.\${encodedPayload}\`;
  const signatureRaw = await crypto
    .createHmac('sha256', secret)
    .update(signatureBase)
    .digest('base64');

  const signature = signatureRaw
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');

  return \`\${encodedHeader}.\${encodedPayload}.\${signature}\`;
}

async function verifyJWT(token: string, secret: string): Promise<{ valid: boolean; payload?: any; error?: string }> {
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Invalid token format' };
  }

  const [encodedHeader, encodedPayload, signature] = parts;

  // Verify signature
  const signatureBase = \`\${encodedHeader}.\${encodedPayload}\`;
  const expectedSignatureRaw = await crypto
    .createHmac('sha256', secret)
    .update(signatureBase)
    .digest('base64');

  const expectedSignature = expectedSignatureRaw
    .replace(/\\+/g, '-')
    .replace(/\\//g, '_')
    .replace(/=/g, '');

  if (signature !== expectedSignature) {
    return { valid: false, error: 'Invalid signature' };
  }

  // Decode payload
  const payload = JSON.parse(base64UrlDecode(encodedPayload));

  // Check expiration
  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    return { valid: false, error: 'Token expired' };
  }

  return { valid: true, payload };
}

// Demo (async execution)
(async () => {
  const payload = { sub: 'user123', email: 'test@example.com', role: 'admin' };
  const secret = 'your-secret-key-change-me';

  console.log('🎫 JWT Demo\\n');

  const token = await createJWT(payload, secret, 900); // 15 minutes
  console.log('Token:', token);
  console.log('\\n📋 Decoded Parts:');
  console.log('Header:', JSON.parse(base64UrlDecode(token.split('.')[0])));
  console.log('Payload:', JSON.parse(base64UrlDecode(token.split('.')[1])));

  console.log('\\nVerification:');
  const result = await verifyJWT(token, secret);
  console.log('Valid:', result.valid);
  console.log('Payload:', result.payload);
})();`,
  },

  // Security Examples
  {
    id: "rate-limiter",
    title: "Sliding Window Rate Limiter",
    description: "Implement a production-grade sliding window rate limiter to prevent API abuse and brute force attacks.",
    category: "security",
    difficulty: "intermediate",
    blogPost: "/blog/rate-limiting-nodejs",
    tags: ["rate-limiting", "security", "api"],
    code: `// Sliding Window Rate Limiter
// Prevents abuse by limiting requests per time window

class SlidingWindowRateLimiter {
  private requests: Map<string, number[]> = new Map();
  private windowMs: number;
  private maxRequests: number;

  constructor(windowMs: number, maxRequests: number) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
  }

  isAllowed(key: string): { allowed: boolean; remaining: number; resetAt: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    // Get existing requests for this key
    let timestamps = this.requests.get(key) || [];

    // Remove old requests outside the window
    timestamps = timestamps.filter(time => time > windowStart);

    // Check if limit exceeded
    const allowed = timestamps.length < this.maxRequests;

    if (allowed) {
      timestamps.push(now);
      this.requests.set(key, timestamps);
    }

    const remaining = Math.max(0, this.maxRequests - timestamps.length);
    const oldestRequest = timestamps[0] || now;
    const resetAt = oldestRequest + this.windowMs;

    return { allowed, remaining, resetAt };
  }

  reset(key: string): void {
    this.requests.delete(key);
  }
}

// Demo: Simulate API requests
const limiter = new SlidingWindowRateLimiter(5000, 3); // 3 requests per 5 seconds
const userId = 'user123';

console.log('Rate Limiter Demo');
console.log('Limit: 3 requests per 5 seconds\\n');

for (let i = 1; i <= 6; i++) {
  const result = limiter.isAllowed(userId);
  const status = result.allowed ? '' : '❌';
  const timeToReset = Math.ceil((result.resetAt - Date.now()) / 1000);

  console.log(\`Request #\${i}: \${status}\`);
  console.log(\`  Remaining: \${result.remaining}\`);
  console.log(\`  Resets in: \${timeToReset}s\\n\`);
}

console.log('💡 In production, use Redis for distributed rate limiting!');`,
  },
  {
    id: "password-strength",
    title: "Password Strength Analyzer",
    description: "Comprehensive password strength checker with entropy calculation and common password detection.",
    category: "security",
    difficulty: "beginner",
    tags: ["passwords", "security", "validation"],
    code: `// Password Strength Analyzer
// Checks password security and provides feedback

function analyzePassword(password: string) {
  // Common weak passwords
  const commonPasswords = [
    'password', '123456', 'qwerty', 'abc123',
    'password123', 'admin', 'letmein'
  ];

  const checks = {
    length: password.length >= 12,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    numbers: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommon: !commonPasswords.some(common =>
      password.toLowerCase().includes(common)
    ),
    noRepeating: !/(.)\x01{2,}/.test(password), // No 3+ repeated chars
    noSequential: !/(?:abc|123|qwe)/i.test(password)
  };

  // Calculate entropy (bits of randomness)
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const entropy = Math.log2(Math.pow(charsetSize, password.length));

  // Determine strength
  const passedChecks = Object.values(checks).filter(Boolean).length;
  let strength = 'Very Weak';
  let color = '🔴';
  let crackTime = 'Instant';

  if (passedChecks >= 7 && entropy >= 60) {
    strength = 'Strong';
    color = '🟢';
    crackTime = 'Centuries';
  } else if (passedChecks >= 5 && entropy >= 40) {
    strength = 'Medium';
    color = '🟡';
    crackTime = 'Years';
  } else if (passedChecks >= 3) {
    strength = 'Weak';
    color = '🟠';
    crackTime = 'Days';
  }

  return { checks, strength, color, entropy, crackTime, passedChecks };
}

function displayAnalysis(password: string) {
  const result = analyzePassword(password);

  console.log(\`Password: "\${password}"\`);
  console.log(\`\\nStrength: \${result.color} \${result.strength}\`);
  console.log(\`Entropy: \${result.entropy.toFixed(1)} bits\`);
  console.log(\`Crack Time: ~\${result.crackTime}\`);
  console.log(\`Score: \${result.passedChecks}/8\\n\`);
  console.log('Requirements:');
  console.log(\`  \${result.checks.length ? '' : '❌'} Length ≥ 12 characters\`);
  console.log(\`  \${result.checks.uppercase ? '' : '❌'} Contains uppercase\`);
  console.log(\`  \${result.checks.lowercase ? '' : '❌'} Contains lowercase\`);
  console.log(\`  \${result.checks.numbers ? '' : '❌'} Contains numbers\`);
  console.log(\`  \${result.checks.special ? '' : '❌'} Contains special chars\`);
  console.log(\`  \${result.checks.noCommon ? '' : '❌'} Not a common password\`);
  console.log(\`  \${result.checks.noRepeating ? '' : '❌'} No repeating characters\`);
  console.log(\`  \${result.checks.noSequential ? '' : '❌'} No sequential patterns\`);
}

// Test passwords
console.log('🔐 Password Strength Analyzer\\n');
console.log('═'.repeat(50) + '\\n');

displayAnalysis('password123');
console.log('\\n' + '─'.repeat(50) + '\\n');

displayAnalysis('MyS3cur3P@ssw0rd!2024');`,
  },
  {
    id: "timing-safe-compare",
    title: "Timing-Safe String Comparison",
    description: "Prevent timing attacks by comparing strings in constant time, crucial for comparing tokens and passwords.",
    category: "security",
    difficulty: "advanced",
    tags: ["timing-attacks", "security", "cryptography"],
    code: `// Timing-Safe String Comparison
// Prevents timing attacks on sensitive comparisons

function measureTime(fn: () => void): number {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

// UNSAFE: Vulnerable to timing attacks
function unsafeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false; // ⚠️ Returns early - leaks timing info!
    }
  }
  return true;
}

// SAFE: Constant-time comparison
function timingSafeCompare(a: string, b: string): boolean {
  // XOR lengths to create a diff variable
  let diff = a.length ^ b.length;

  // Compare all characters regardless
  const maxLen = Math.max(a.length, b.length);
  for (let i = 0; i < maxLen; i++) {
    const charA = a.charCodeAt(i) || 0;
    const charB = b.charCodeAt(i) || 0;
    diff |= charA ^ charB; // Accumulate differences
  }

  return diff === 0;
}

// Demo: Show timing difference
const correct = 'secret_token_abc123456789';
const wrong1  = 'aecret_token_abc123456789'; // Wrong at position 0
const wrong2  = 'secret_token_abc123456788'; // Wrong at position -1

console.log('⏱️  Timing Attack Demonstration\\n');
console.log('Testing against:', correct);
console.log('');

// Test unsafe comparison
console.log('UNSAFE Comparison:');
const time1 = measureTime(() => {
  for (let i = 0; i < 10000; i++) unsafeCompare(correct, wrong1);
});
const time2 = measureTime(() => {
  for (let i = 0; i < 10000; i++) unsafeCompare(correct, wrong2);
});

console.log(\`  Wrong at start: \${time1.toFixed(3)}ms\`);
console.log(\`  Wrong at end:   \${time2.toFixed(3)}ms\`);
console.log(\`  Difference:     \${Math.abs(time1 - time2).toFixed(3)}ms\`);
console.log('  ⚠️  Attacker can guess character by character!\\n');

// Test safe comparison
console.log('SAFE Comparison:');
const time3 = measureTime(() => {
  for (let i = 0; i < 10000; i++) timingSafeCompare(correct, wrong1);
});
const time4 = measureTime(() => {
  for (let i = 0; i < 10000; i++) timingSafeCompare(correct, wrong2);
});

console.log(\`  Wrong at start: \${time3.toFixed(3)}ms\`);
console.log(\`  Wrong at end:   \${time4.toFixed(3)}ms\`);
console.log(\`  Difference:     \${Math.abs(time3 - time4).toFixed(3)}ms\`);
console.log('   Constant time - no timing leak!');

console.log('\\n💡 Always use crypto.timingSafeEqual() in production!');`,
  },

  // Algorithms
  {
    id: "base64-encoding",
    title: "Base64 Encoding/Decoding",
    description: "Understand how Base64 encoding works by implementing it from scratch.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["encoding", "base64", "algorithms"],
    code: `// Base64 Encoding and Decoding
// Learn how Base64 works under the hood

const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function base64Encode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let result = '';

  for (let i = 0; i < bytes.length; i += 3) {
    // Get 3 bytes (24 bits)
    const byte1 = bytes[i];
    const byte2 = bytes[i + 1] || 0;
    const byte3 = bytes[i + 2] || 0;

    // Combine into 24-bit number
    const combined = (byte1 << 16) | (byte2 << 8) | byte3;

    // Split into four 6-bit groups
    const char1 = BASE64_CHARS[(combined >> 18) & 0x3F];
    const char2 = BASE64_CHARS[(combined >> 12) & 0x3F];
    const char3 = BASE64_CHARS[(combined >> 6) & 0x3F];
    const char4 = BASE64_CHARS[combined & 0x3F];

    result += char1 + char2;
    result += (i + 1 < bytes.length) ? char3 : '=';
    result += (i + 2 < bytes.length) ? char4 : '=';
  }

  return result;
}

function base64Decode(encoded: string): string {
  const bytes: number[] = [];

  // Remove padding
  encoded = encoded.replace(/=/g, '');

  for (let i = 0; i < encoded.length; i += 4) {
    // Get 4 characters (24 bits)
    const char1 = BASE64_CHARS.indexOf(encoded[i]);
    const char2 = BASE64_CHARS.indexOf(encoded[i + 1]);
    const char3 = BASE64_CHARS.indexOf(encoded[i + 2] || 'A');
    const char4 = BASE64_CHARS.indexOf(encoded[i + 3] || 'A');

    // Combine into 24-bit number
    const combined = (char1 << 18) | (char2 << 12) | (char3 << 6) | char4;

    // Extract 3 bytes
    bytes.push((combined >> 16) & 0xFF);
    if (encoded[i + 2] && encoded[i + 2] !== '=') {
      bytes.push((combined >> 8) & 0xFF);
    }
    if (encoded[i + 3] && encoded[i + 3] !== '=') {
      bytes.push(combined & 0xFF);
    }
  }

  return new TextDecoder().decode(new Uint8Array(bytes));
}

// Demo
const original = 'Hello, World! 🌍';
console.log('📝 Base64 Encoding Demo\\n');
console.log('Original:', original);

const encoded = base64Encode(original);
console.log('Encoded:', encoded);
console.log('Length increase:', ((encoded.length / original.length - 1) * 100).toFixed(1) + '%');

const decoded = base64Decode(encoded);
console.log('Decoded:', decoded);
console.log('\\nMatch:', original === decoded ? '' : '❌');

// Compare with native
const nativeEncoded = Buffer.from(original).toString('base64');
console.log('\\nNative encoding:', nativeEncoded);
console.log('Match with native:', encoded === nativeEncoded ? '' : '❌');`,
  },
  {
    id: "hash-table",
    title: "Hash Table Implementation",
    description: "Build a hash table from scratch with collision handling using separate chaining.",
    category: "algorithms",
    difficulty: "intermediate",
    tags: ["data-structures", "hash-table", "algorithms"],
    code: `// Hash Table Implementation
// Efficient key-value storage with O(1) average access

class HashTable<K, V> {
  private buckets: Array<Array<[K, V]>>;
  private size: number = 0;
  private capacity: number;

  constructor(capacity: number = 16) {
    this.capacity = capacity;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  private hash(key: K): number {
    const str = String(key);
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash) % this.capacity;
  }

  set(key: K, value: V): void {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Check if key exists
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value; // Update existing
        return;
      }
    }

    // Add new entry
    bucket.push([key, value]);
    this.size++;

    // Resize if load factor > 0.75
    if (this.size / this.capacity > 0.75) {
      this.resize();
    }
  }

  get(key: K): V | undefined {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (const [k, v] of bucket) {
      if (k === key) return v;
    }

    return undefined;
  }

  delete(key: K): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  private resize(): void {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = Array.from({ length: this.capacity }, () => []);
    this.size = 0;

    for (const bucket of oldBuckets) {
      for (const [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

  getStats() {
    const bucketSizes = this.buckets.map(b => b.length);
    const maxChain = Math.max(...bucketSizes);
    const avgChain = bucketSizes.reduce((a, b) => a + b, 0) / this.capacity;
    const emptyBuckets = bucketSizes.filter(s => s === 0).length;

    return {
      size: this.size,
      capacity: this.capacity,
      loadFactor: (this.size / this.capacity).toFixed(2),
      maxChainLength: maxChain,
      avgChainLength: avgChain.toFixed(2),
      emptyBuckets,
    };
  }
}

// Demo
console.log('🗂️  Hash Table Demo\\n');

const table = new HashTable<string, number>();

// Add entries
['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape']
  .forEach((fruit, i) => table.set(fruit, i + 1));

console.log('After adding 7 fruits:');
console.log(table.getStats());

console.log('\\nValues:');
console.log('apple:', table.get('apple'));
console.log('cherry:', table.get('cherry'));
console.log('grape:', table.get('grape'));
console.log('mango:', table.get('mango'), '(not found)');

// Delete
table.delete('banana');
console.log('\\nAfter deleting banana:');
console.log(table.getStats());`,
  },

  // Utilities
  {
    id: "debounce-throttle",
    title: "Debounce vs Throttle",
    description: "Understand the difference between debounce and throttle with interactive examples.",
    category: "utilities",
    difficulty: "beginner",
    tags: ["performance", "optimization", "utilities"],
    code: `// Debounce vs Throttle
// Essential utilities for performance optimization

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return function(...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Demo simulation
let eventCount = 0;
let debouncedCount = 0;
let throttledCount = 0;

function handleEvent() {
  eventCount++;
}

const debouncedHandler = debounce(() => {
  debouncedCount++;
}, 500);

const throttledHandler = throttle(() => {
  throttledCount++;
}, 500);

// Simulate 20 rapid events
console.log('🎯 Debounce vs Throttle Demo\\n');
console.log('Simulating 20 rapid events (every 100ms)...\\n');

const interval = setInterval(() => {
  if (eventCount < 20) {
    handleEvent();
    debouncedHandler();
    throttledHandler();
  } else {
    clearInterval(interval);

    // Wait for debounce to finish
    setTimeout(() => {
      console.log('Results after 20 events:\\n');
      console.log('📊 Statistics:');
      console.log('  Total events:', eventCount);
      console.log('  Throttled (500ms):', throttledCount);
      console.log('  Debounced (500ms):', debouncedCount);

      console.log('\\n💡 Explanation:');
      console.log('  • Throttle: Executes at most once per interval');
      console.log('  • Debounce: Executes only after events stop');

      console.log('\\n📚 Use Cases:');
      console.log('  Throttle → Scroll events, mousemove, window resize');
      console.log('  Debounce → Search input, form validation, API calls');
    }, 600);
  }
}, 100);`,
  },
];

export function getExamplesByCategory(category: CodeExample['category']) {
  return codeExamples.filter(ex => ex.category === category);
}

export function getExampleById(id: string) {
  return codeExamples.find(ex => ex.id === id);
}

export const categories = [
  { id: 'authentication', label: 'Authentication', icon: '🔐', color: 'blue' },
  { id: 'security', label: 'Security', icon: '🛡️', color: 'green' },
  { id: 'algorithms', label: 'Algorithms', icon: '⚡', color: 'purple' },
  { id: 'utilities', label: 'Utilities', icon: '🛠️', color: 'orange' },
] as const;
