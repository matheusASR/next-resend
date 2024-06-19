import { useContext, useState } from "react";
import styles from "./header.module.css";
import { HeaderContext } from "../../providers/headerContext";

export default function Header() {
  const { mode, setMode } = useContext(HeaderContext);

  return (
    <header className={styles.header__container}>
      <div
        className={`${mode === "new-email" ? styles.selected : styles.header__div}`}
      >
        <button
          className={styles.header__bttn}
          onClick={() => setMode("new-email")}
        >
          Novo Email
        </button>
      </div>
      <div
        className={`${mode === "emails" ? styles.selected : styles.header__div}`}
      >
        <button
          className={styles.header__bttn}
          onClick={() => setMode("emails")}
        >
          Emails
        </button>
      </div>
    </header>
  );
}
