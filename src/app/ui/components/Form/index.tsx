"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import styles from "./form.module.css";

interface Field {
  name: string;
  email: string;
}

interface FormData {
  campaignName: string;
  type: string;
  sender: string;
  subject: string;
  body: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  time: {
    hour: string;
    minute: string;
  };
  receivers: Field[]; // Adicionando campo receivers ao FormData
}

export default function Form() {
  const [fields, setFields] = useState<Field[]>([{ name: "", email: "" }]);
  const [agendar, setAgendar] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    campaignName: "",
    type: "",
    sender: "",
    subject: "",
    body: "",
    date: { day: "", month: "", year: "" },
    time: { hour: "", minute: "" },
    receivers: [{ name: "", email: "" }], // Inicializando receivers com um campo vazio
  });

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgendar(e.target.value === "sim");
  };

  const handleAddFields = (event: FormEvent) => {
    event.preventDefault();
    setFields([...fields, { name: "", email: "" }]);
    setFormData({
      ...formData,
      receivers: [...fields, { name: "", email: "" }],
    });
  };

  const handleRemoveLastField = (event: FormEvent) => {
    event.preventDefault();
    if (fields.length > 1) {
      const values = [...fields];
      values.pop();
      setFields(values);
      setFormData({
        ...formData,
        receivers: values,
      });
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
      date: {
        ...formData.date,
        [name]: value,
      },
    });
  };

  const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      time: {
        ...formData.time,
        [name]: value,
      },
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const data = {
      ...formData,
      receivers: fields,
    };
    console.log("Form Data Submitted:", data);
    // Aqui você pode adicionar o código para enviar os dados para o servidor, se necessário
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
          name="campaignName"
          value={formData.campaignName}
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
                name="day"
                value={formData.date.day}
                onChange={handleDateChange}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="month"
                value={formData.date.month}
                onChange={handleDateChange}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="year"
                value={formData.date.year}
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
                name="hour"
                value={formData.time.hour}
                onChange={handleTimeChange}
              />
              <p className={styles.inputalt__simbol}>:</p>
              <input
                className={styles.form__container__inputalt}
                type="number"
                name="minute"
                value={formData.time.minute}
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
