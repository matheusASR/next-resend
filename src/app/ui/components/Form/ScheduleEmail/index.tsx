"use client";
import { ChangeEvent, FocusEvent, useContext } from "react";
import styles from "./scheduleEmail.module.css";
import { EmailCreateContext } from "@/app/ui/providers/emailCreateContext";

export default function ScheduleEmail() {
  const { formData, setFormData, agendar, setAgendar } = useContext(EmailCreateContext);
  const currentYear = new Date().getFullYear();

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgendar(e.target.value === "sim");
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "date_year" && value.length > 4) {
      return;
    } else if (name === "date_month" && (value.length > 2 || parseInt(value) > 12)) {
      return;
    } else if (name === "date_day" && (value.length > 2 || parseInt(value) > 31)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "time_hour" && (value.length > 2 || parseInt(value) > 23)) {
      return;
    } else if (name === "time_minute" && (value.length > 2 || parseInt(value) > 59)) {
      return;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleBlurDate = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "date_year") {
      if (value.length < 4) {
        alert("O ano deve ter 4 dígitos");
        setFormData({
          ...formData,
          [name]: "",
        });
        return;
      } else if (parseInt(value) < currentYear) {
        alert("O ano deve ser igual ou maior ao ano atual");
        setFormData({
          ...formData,
          [name]: "",
        });
        return;
      }
    } else if (value.length === 1) {
      newValue = "0" + value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleBlurTime = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (value.length === 1) {
      newValue = "0" + value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  return (
    <>
      <div className={styles.form__container__divAlt}>
        <label>Deseja agendar o disparo de email?</label>
        <span>
          <input
            type="radio"
            name="agendar"
            value="sim"
            onChange={handleRadioChange}
          />{" "}
          Sim
        </span>
        <span>
          <input
            type="radio"
            name="agendar"
            value="nao"
            onChange={handleRadioChange}
          />{" "}
          Não
        </span>
      </div>

      {agendar && (
        <div className={styles.form__container__div}>
          <div className={styles.form__container__smalldiv}>
            <label className={styles.form__container__label}>
              Data de Agendamento
            </label>
            <div className={styles.div__input}>
              <input
                className={styles.form__container__inputalt}
                name="date_day"
                value={formData.date_day}
                onChange={handleDateChange}
                onBlur={handleBlurDate}
                required
                maxLength={2}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                name="date_month"
                value={formData.date_month}
                onChange={handleDateChange}
                onBlur={handleBlurDate}
                required
                maxLength={2}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                name="date_year"
                value={formData.date_year}
                onChange={handleDateChange}
                onBlur={handleBlurDate}
                required
                maxLength={4}
              />
            </div>
          </div>
          <div className={styles.form__container__smalldiv}>
            <label className={styles.form__container__label}>
              Horário de Agendamento
            </label>
            <div className={styles.div__input}>
              <input
                className={styles.form__container__inputalt}
                name="time_hour"
                value={formData.time_hour}
                onChange={handleTimeChange}
                onBlur={handleBlurTime}
                required
                maxLength={2}
              />
              <p className={styles.inputalt__simbol}>:</p>
              <input
                className={styles.form__container__inputalt}
                name="time_minute"
                value={formData.time_minute}
                onChange={handleTimeChange}
                onBlur={handleBlurTime}
                required
                maxLength={2}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}






