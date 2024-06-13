"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./form.module.css";
import { api } from "@/api";

interface Field {
  name: any;
  email: any;
}

interface FormData {
  campaign_name: string;
  type: string;
  sender: string;
  subject: string;
  body: string;
  date_day: string;
  date_month: string;
  date_year: string;
  time_hour: string;
  time_minute: string;
  receivers: Field[];
}

export default function Form() {
  const [fields, setFields] = useState<Field[]>([{ name: "", email: "" }]);
  const [agendar, setAgendar] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    campaign_name: "",
    type: "",
    sender: "",
    subject: "",
    body: "",
    date_day: "",
    date_month: "",
    date_year: "",
    time_hour: "",
    time_minute: "",
    receivers: [{ name: "", email: "" }],
  });

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgendar(e.target.value === "sim");
  };

  const handleAddFields = (event: FormEvent) => {
    event.preventDefault();
    setFields([...fields, { name: "", email: "" }]);
  };

  const handleRemoveLastField = (event: FormEvent) => {
    event.preventDefault();
    if (fields.length > 1) {
      const values = [...fields];
      values.pop();
      setFields(values);
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFieldChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index][name as keyof Field] = value;
    setFields(newFields);
    setFormData({
      ...formData,
      receivers: newFields,
    });
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      ...formData,
      receivers: fields, 
    };
    console.log("Form Data Submitted:", data);
    try {
      const response = await api.post("/emails", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
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
      <div className={styles.form__container__div}>
        <textarea
          className={styles.form__container__textarea}
          placeholder="Corpo do email..."
          name="body"
          value={formData.body}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.form__container__receivers}>
        <div className={styles.form__container__divreceivers}>
          <label className={styles.form__container__label}>Destinatários</label>
        </div>
        <div className={styles.form__container__divreceiversdata}>
          {fields.map((field, index) => (
            <div key={index} className={styles.fieldSet}>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={field.name}
                className={styles.input__receivers}
                onChange={(e) => handleFieldChange(index, e)}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={field.email}
                className={styles.input__receivers}
                onChange={(e) => handleFieldChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={handleAddFields} className={styles.addButton}>
            +
          </button>
          <button
            onClick={handleRemoveLastField}
            className={styles.removeButton}
            disabled={fields.length === 1}
          >
            -
          </button>
        </div>
      </div>
      <div className={styles.form__container__div}>
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
                type="number"
                name="date_day"
                value={formData.date_day}
                onChange={handleDateChange}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="date_month"
                value={formData.date_month}
                onChange={handleDateChange}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="date_year"
                value={formData.date_year}
                onChange={handleDateChange}
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
                type="number"
                name="time_hour"
                value={formData.time_hour}
                onChange={handleTimeChange}
              />
              <p className={styles.inputalt__simbol}>:</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="time_minute"
                value={formData.time_minute}
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.div__bttn}>
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </div>
    </form>
  );
}
