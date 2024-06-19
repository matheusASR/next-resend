"use client"
import { ChangeEvent, useContext, useState } from "react";
import styles from "./scheduleEmail.module.css";
import { EmailCreateContext } from "@/app/ui/providers/emailCreateContext";

export default function ScheduleEmail() {
  const { formData, setFormData, agendar, setAgendar } = useContext(EmailCreateContext)

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgendar(e.target.value === "sim");
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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
                required
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                name="date_month"
                value={formData.date_month}
                onChange={handleDateChange}
                required
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                name="date_year"
                value={formData.date_year}
                onChange={handleDateChange}
                required
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
                required
              />
              <p className={styles.inputalt__simbol}>:</p>
              <input
                className={styles.form__container__inputalt}
                name="time_minute"
                value={formData.time_minute}
                onChange={handleTimeChange}
                required
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
