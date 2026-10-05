export type ButtonVariant = "primary" | "secondary" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold whitespace-nowrap " +
  "transition-[background-color,border-color,color,box-shadow,transform,filter] duration-300 ease-fluid " +
  "active:translate-y-px active:scale-[0.98] focus-visible:outline-offset-4";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-b from-gold-light to-gold text-[#0b0b0b] " +
    "shadow-[0_10px_30px_-12px_rgb(216_163_59/0.55)] hover:brightness-110 " +
    "hover:shadow-[0_14px_36px_-12px_rgb(240_198_106/0.7)]",
  secondary:
    "border border-gold/70 bg-black/70 text-text backdrop-blur-sm " +
    "hover:border-gold-light hover:bg-black/85",
  whatsapp:
    "border border-whatsapp bg-whatsapp-strong text-white " +
    "hover:bg-[#0c6a36] hover:border-[#34c873]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-6 text-base sm:px-8",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  extra = "",
): string {
  return [base, variants[variant], sizes[size], extra].filter(Boolean).join(" ");
}
