"use client";
import { useState, ChangeEvent, FormEvent, useContext } from "react";
import styles from "./form.module.css";
import { api } from "@/api";
import { EmailPreviewContext } from "../../providers/emailPreviewContext";

export default function Form() {
  const { setActive, active } = useContext(EmailPreviewContext);
  const [fields, setFields] = useState<any[]>([{ name: "", email: "" }]);
  const [agendar, setAgendar] = useState(false);
  const [inputType, setInputType] = useState("manual");
  const [bodyType, setBodyType] = useState("creator");
  const [links, setLinks] = useState<string[]>([""]);
  const [addButton, setAddButton] = useState(false);
  const [addLinks, setAddLinks] = useState(false);
  const [formData, setFormData] = useState<any>({
    campaign_name: "",
    type: "",
    sender: "",
    subject: "",
    body: "",
    image: "",
    button_name: "",
    button_color: "",
    button_link: "",
    date_day: "",
    date_month: "",
    date_year: "",
    time_hour: "",
    time_minute: "",
    receivers: [{ name: "", email: "" }],
  });

  const showPreview = () => {
    setActive(true);
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgendar(e.target.value === "sim");
  };

  const handleInputTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputType(e.target.value);
  };

  const handleBodyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBodyType(e.target.value);
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

  const handleAddLink = (event: FormEvent) => {
    event.preventDefault();
    setLinks([...links, ""]);
  };

  const handleRemoveLastLink = (event: FormEvent) => {
    event.preventDefault();
    if (links.length > 1) {
      const newLinks = [...links];
      newLinks.pop();
      setLinks(newLinks);
    }
  };

  const handleLinkChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
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

  const handleFieldChange = (index: any, e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFields = [...fields];
    newFields[index][name as keyof any] = value;
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          body: reader.result as string,
        });
      };
      reader.readAsText(file);
    } else if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor, faça upload de um arquivo válido.");
    }
  };

  const handleAddButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddButton(e.target.value === "sim");
  };

  const handleAddLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddLinks(e.target.value === "sim");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const data = {
      ...formData,
      receivers: fields,
      links: links.filter((link) => link !== ""),
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
      <div className={styles.form__container__divAlt}>
        <label>Qual será o modelo do corpo do email?</label>
        <span>
          <input
            type="radio"
            name="bodyType"
            value="html"
            onChange={handleBodyTypeChange}
          />{" "}
          Arquivo HTML
        </span>
        <span>
          <input
            type="radio"
            name="bodyType"
            value="creator"
            onChange={handleBodyTypeChange}
            defaultChecked
          />{" "}
          Criador de Email
        </span>
      </div>

      {bodyType === "html" ? (
        <div className={styles.form__container__div}>
          <input
            type="file"
            name="file"
            accept=".html"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div>
          <div className={styles.form__container__divAlt}>
            <label>Insira aqui a imagem de banner</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.form__container__divAlt}>
            <textarea
              className={styles.form__container__textarea}
              placeholder="Corpo do email..."
              name="body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.form__container__divAlt}>
            <label>Deseja inserir algum link?</label>
            <span>
              <input
                type="radio"
                name="addLinks"
                value="sim"
                onChange={handleAddLinksChange}
              />{" "}
              Sim
            </span>
            <span>
              <input
                type="radio"
                name="addLinks"
                value="nao"
                onChange={handleAddLinksChange}
              />{" "}
              Não
            </span>
          </div>
          {addLinks && (
            <div className={styles.form__container__divlinks}>
              {links.map((link, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name={`link${index}`}
                    value={link}
                    placeholder="Link"
                    onChange={(e) => handleLinkChange(index, e)}
                    className={styles.input__link}
                  />
                </div>
              ))}
              <div className={styles.buttonsContainer}>
                <button onClick={handleAddLink} className={styles.addButton}>
                  +
                </button>
                <button
                  onClick={handleRemoveLastLink}
                  className={styles.removeButton}
                  disabled={links.length === 1}
                >
                  -
                </button>
              </div>
            </div>
          )}
          <div className={styles.form__container__divAlt}>
            <label>Deseja adicionar algum botão?</label>
            <span>
              <input
                type="radio"
                name="addButton"
                value="sim"
                onChange={handleAddButtonChange}
              />{" "}
              Sim
            </span>
            <span>
              <input
                type="radio"
                name="addButton"
                value="nao"
                onChange={handleAddButtonChange}
              />{" "}
              Não
            </span>
          </div>
          {addButton && (
            <div>
              <div className={styles.form__container__divAlt}>
                <label>Nome do Botão</label>
                <input
                  type="text"
                  name="button_name"
                  value={formData.button_name}
                  onChange={handleInputChange}
                  className={styles.input__receivers}
                />
              </div>
              <div className={styles.form__container__divAlt}>
                <label>Cor do Botão</label>
                <input
                  type="text"
                  name="button_color"
                  value={formData.button_color}
                  onChange={handleInputChange}
                  className={styles.input__receivers}
                />
              </div>
              <div className={styles.form__container__divAlt}>
                <label>Link do Botão</label>
                <input
                  type="text"
                  name="button_link"
                  value={formData.button_link}
                  onChange={handleInputChange}
                  className={styles.input__receivers}
                />
              </div>
            </div>
          )}
          <div className={styles.form__container__div}>
            <button
              type="button"
              className={styles.submitButton}
              onClick={() => showPreview()}
            >
              Preview do Email
            </button>
          </div>
        </div>
      )}

      <div className={styles.form__container__divAlt}>
        <label>Como deseja definir os destinatários?</label>
        <span>
          <input
            type="radio"
            name="inputType"
            value="csv"
            onChange={handleInputTypeChange}
          />{" "}
          Arquivo CSV
        </span>
        <span>
          <input
            type="radio"
            name="inputType"
            value="manual"
            onChange={handleInputTypeChange}
            defaultChecked
          />{" "}
          Inserir Manualmente
        </span>
      </div>

      {inputType === "csv" ? (
        <div className={styles.form__container__div}>
          <input
            type="file"
            name="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className={styles.form__container__receivers}>
          <div className={styles.form__container__divreceivers}>
            <label className={styles.form__container__label}>
              Destinatários
            </label>
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
      )}

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
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
                name="date_month"
                value={formData.date_month}
                onChange={handleDateChange}
              />
              <p className={styles.inputalt__simbol}>/</p>
              <input
                className={styles.form__container__inputalt}
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
                name="time_hour"
                value={formData.time_hour}
                onChange={handleTimeChange}
              />
              <p className={styles.inputalt__simbol}>:</p>
              <input
                className={styles.form__container__inputalt}
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
