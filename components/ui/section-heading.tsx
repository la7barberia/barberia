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
        className="font-serif text-[1.8rem] leading-[1.1] font-[480] tracking-tight text-text sm:text-[2.4rem] sm:leading-none"
      >
        {title}
        {accent ? (
          <>
            {" "}
            <span className="text-gold-gradient">{accent}</span>
          </>
        ) : null}
      </h2>
      {intro ? (
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-text-muted sm:text-base">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
