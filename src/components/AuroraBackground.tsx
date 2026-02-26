"use client";

import styles from "./AuroraBackground.module.css";

export default function AuroraBackground() {
  return (
    <div className={styles.container}>
      <div className={styles.blob} />
      <div className={styles.blob} />
      <div className={styles.blob} />
    </div>
  );
}
