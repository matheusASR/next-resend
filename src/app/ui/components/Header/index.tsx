import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header__container}>
      <h1 className={styles.header__title}>Novo Email</h1>
      <button className={styles.header__bttn}>Enviar Email</button>
    </header>
  );
}