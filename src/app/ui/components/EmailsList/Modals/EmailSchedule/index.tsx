"use client";
import Modal from "react-modal";
import styles from "./emailSchedule.module.css";
import { ChangeEvent, FocusEvent, useState } from "react";
import { api } from "@/api";

const customStyles = {
  content: {
    width: "50%",
    height: 280,
    margin: "auto",
  },
};

const EmailScheduleModal = ({ isOpen, onRequestClose, email }: any) => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    date_year: "",
    date_month: "",
    date_day: "",
    time_hour: "",
    time_minute: "",
  });

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "date_year" && value.length > 4) {
      return;
    } else if (
      name === "date_month" &&
      (value.length > 2 || parseInt(value) > 12)
    ) {
      return;
    } else if (
      name === "date_day" &&
      (value.length > 2 || parseInt(value) > 31)
    ) {
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
    } else if (
      name === "time_minute" &&
      (value.length > 2 || parseInt(value) > 59)
    ) {
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

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    const data = {
      send_date: `${formData.date_year}/${formData.date_month}/${formData.date_day}`,
      send_time: `${formData.time_hour}:${formData.time_minute}`,
      status: "Agendado"
    }
    try {
      const response = await api.post(`/emails/schedule/${email.id}`, data);
      if (response.status === 200) {
        alert("Email agendado com sucesso!");
      }
    } catch (error: any) {
      console.error(
        "Erro ao agendar email:",
        error.response?.data || error.message
      );
      alert("Ocorreu um erro ao agendar email");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className={styles.modal__container}>
        <div className={styles.modal__header}>
          <h1 className={styles.modal__text}>
            Para quando deseja agendar este email?
          </h1>
          <button onClick={onRequestClose}>X</button>
        </div>
        <form className={styles.form__container} onSubmit={handleSubmit}>
          <h2>Data</h2>
          <div className={styles.div__form}>
            <input
              name="date_day"
              value={formData.date_day}
              onChange={handleDateChange}
              onBlur={handleBlurDate}
              required
              className={styles.input}
              maxLength={2}
            />
            <p>/</p>
            <input
              name="date_month"
              value={formData.date_month}
              onChange={handleDateChange}
              onBlur={handleBlurDate}
              required
              className={styles.input}
              maxLength={2}
            />
            <p>/</p>
            <input
              name="date_year"
              value={formData.date_year}
              onChange={handleDateChange}
              onBlur={handleBlurDate}
              required
              className={styles.input}
              maxLength={4}
            />
          </div>

          <h2>Horário</h2>
          <div className={styles.div__form}>
            <input
              name="time_hour"
              value={formData.time_hour}
              onChange={handleTimeChange}
              onBlur={handleBlurTime}
              required
              className={styles.input}
              maxLength={2}
            />
            <p>:</p>
            <input
              name="time_minute"
              value={formData.time_minute}
              onChange={handleTimeChange}
              onBlur={handleBlurTime}
              required
              className={styles.input}
              maxLength={2}
            />
          </div>
          <button className={styles.button}>Agendar</button>
        </form>
      </div>
    </Modal>
  );
};

export default EmailScheduleModal;
