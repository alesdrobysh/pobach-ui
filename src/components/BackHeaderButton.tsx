import Link from "next/link";

type BackHeaderButtonProps = {
  href: string;
  label?: string;
  ariaLabel?: string;
};

export default function BackHeaderButton({
  href,
  label = "← Вярнуцца да гульні",
  ariaLabel = "Вярнуцца да гульні",
}: BackHeaderButtonProps) {
  return (
    <Link href={href} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}
