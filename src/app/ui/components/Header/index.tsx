import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header__container}>
      <h1 className={styles.header__title}>Novo Email</h1>
    </header>
  );
}