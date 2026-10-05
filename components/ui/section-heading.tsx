import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  /** Parte final del título destacada en dorado. */
  accent?: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto text-center" : "";

  return (
    <div className={`max-w-2xl ${alignment} ${className}`}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <h2
        id={id}
        className="font-serif text-4xl font-semibold tracking-tight text-text sm:text-5xl"
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        ) : null}
      </h2>
      {intro ? <p className="mt-4 text-base text-text-muted sm:text-lg">{intro}</p> : null}
    </div>
  );
}
