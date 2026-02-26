import Link from "next/link";
import styles from "./BackHeaderButton.module.css";

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
    <Link href={href} className={styles.backButton} aria-label={ariaLabel}>
      {label}
    </Link>
  );
}
