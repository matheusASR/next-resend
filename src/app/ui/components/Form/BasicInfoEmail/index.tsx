import { useContext } from "react";
import styles from "./basicInfoEmail.module.css";
import { EmailCreateContext } from "@/app/ui/providers/emailCreateContext";

export default function BasicInfoEmail() {
  const { formData, handleInputChange } = useContext(EmailCreateContext)

  return (
    <>
      <div className={styles.form__container__div}>
        <label className={styles.form__container__namelabel}>
          Nome da Campanha
        </label>
        <input
          className={styles.form__container__input}
          type="text"
          name="campaign_name"
          value={formData.campaign_name}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__container__div}>
        <label className={styles.form__container__label}>Tipo</label>
        <input
          className={styles.form__container__input}
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__container__div}>
        <label className={styles.form__container__label}>Cliente</label>
        <input
          className={styles.form__container__input}
          type="text"
          name="client"
          value={formData.client}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__container__div}>
        <label className={styles.form__container__label}>Remetente</label>
        <input
          className={styles.form__container__input}
          type="email"
          name="sender"
          value={formData.sender}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__container__div}>
        <label className={styles.form__container__label}>Assunto</label>
        <input
          className={styles.form__container__input}
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
        />
      </div>
    </>
  );
}
