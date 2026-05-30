export type ProjectMarkId = "hooklens" | "devflow" | "beacon";

type Props = {
  id: ProjectMarkId;
  className?: string;
};

export function ProjectMark({ id, className = "" }: Props) {
  const stroke = "currentColor";
  const sw = 1.25;
  const size = 56;

  if (id === "hooklens") {
    return (
      <svg
        viewBox="0 0 56 56"
        width={size}
        height={size}
        fill="none"
        aria-hidden
        className={className}
      >
        <rect
          x="6"
          y="10"
          width="44"
          height="32"
          rx="4"
          stroke={stroke}
          strokeWidth={sw}
        />
        <path
          d="M14 22 L20 27 L14 32"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 33 L34 33"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path
          d="M42 36 L42 44"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <circle cx="42" cy="46" r="0.9" fill={stroke} />
      </svg>
    );
  }

  if (id === "devflow") {
    return (
      <svg
        viewBox="0 0 56 56"
        width={size}
        height={size}
        fill="none"
        aria-hidden
        className={className}
      >
        <circle cx="14" cy="14" r="3" stroke={stroke} strokeWidth={sw} />
        <circle cx="14" cy="42" r="3" stroke={stroke} strokeWidth={sw} />
        <circle cx="42" cy="28" r="3" stroke={stroke} strokeWidth={sw} />
        <path
          d="M14 17 L14 39"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path
          d="M14 17 C14 25, 22 28, 39 28"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <path
          d="M36 25 L39 28 L36 31"
          stroke={stroke}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 56 56"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={className}
    >
      <rect
        x="6"
        y="8"
        width="44"
        height="28"
        rx="3"
        stroke={stroke}
        strokeWidth={sw}
      />
      <path
        d="M20 36 L20 41 L36 41 L36 36"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      <path
        d="M16 43 L40 43"
        stroke={stroke}
        strokeWidth={sw}
        strokeLinecap="round"
      />
      <circle cx="28" cy="22" r="6" stroke={stroke} strokeWidth={sw} />
      <circle cx="28" cy="22" r="1.4" fill={stroke} />
    </svg>
  );
}
