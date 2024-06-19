"use client";
import { FormEvent, useContext } from "react";
import styles from "./form.module.css";
import { api } from "@/api";
import BasicInfoEmail from "./BasicInfoEmail";
import BodyEmail from "./BodyEmail";
import ReceiversEmail from "./ReceiversEmail";
import ScheduleEmail from "./ScheduleEmail";
import { EmailCreateContext } from "../../providers/emailCreateContext";

export default function Form() {
  const { formData, fields, bodyType, inputType, agendar } =
    useContext(EmailCreateContext);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      ...formData,
      receivers: fields,
    };

    if (bodyType === "html") {
      data.title = "";
      data.body = "";
      data.image = "";
      data.button_name = "";
      data.button_color = "";
      data.button_link = "";
    }

    if (inputType === "csv") {
      data.receivers = [];
    }

    if (agendar === false) {
      data.date_day = "";
      data.date_month = "";
      data.date_year = "";
      data.time_hour = "";
      data.time_minute = "";
    }

    try {
      const response = await api.post("/emails", data);
      if (response.status === 201) {
        alert("Email criado com sucesso!");
      }
    } catch (error: any) {
      console.error(
        "Erro ao criar email:",
        error.response?.data || error.message
      );
      alert("Ocorreu um erro ao criar email");
    }
  };

  return (
    <form className={styles.form__container} onSubmit={handleSubmit}>
      <BasicInfoEmail />
      <BodyEmail />
      <ReceiversEmail />
      <ScheduleEmail />
      <div className={styles.div__bttn}>
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </div>
    </form>
  );
}
