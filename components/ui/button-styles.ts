export type ButtonVariant = "primary" | "secondary" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-300 ease-fluid " +
  "active:translate-y-px active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-b from-gold-light to-gold text-[#0b0b0b] " +
    "shadow-[0_8px_20px_-12px_rgb(216_163_59/0.45)] hover:brightness-110",
  secondary:
    "border border-gold/70 bg-black/70 text-text backdrop-blur-sm " +
    "hover:border-gold-light hover:bg-black/85",
  whatsapp:
    "border border-whatsapp bg-whatsapp-strong text-white " +
    "hover:bg-[#0c6a36] hover:border-[#34c873]",
};

// 44 px de alto: mínimo táctil recomendado en iOS y Android.
const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-11 px-5 text-sm sm:px-6",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}
