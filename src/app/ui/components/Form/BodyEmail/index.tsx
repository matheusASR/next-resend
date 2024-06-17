"use client";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "./bodyEmail.module.css";
import { EmailPreviewContext } from "@/app/ui/providers/emailPreviewContext";
import { EmailCreateContext } from "@/app/ui/providers/emailCreateContext";

export default function BodyEmail() {
  const { setActive } = useContext(EmailPreviewContext);
  const {
    links,
    setLinks,
    handleInputChange,
    formData,
    handleFileChange,
    addButton,
    setAddButton,
    addLinks,
    setAddLinks,
  } = useContext(EmailCreateContext);
  const [bodyType, setBodyType] = useState("creator");

  const handleLinkChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
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

  const handleAddLinksChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddLinks(e.target.value === "sim");
  };

  const handleBodyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBodyType(e.target.value);
  };

  const handleAddButtonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddButton(e.target.value === "sim");
  };

  return (
    <>
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
              onClick={() => setActive(true)}
            >
              Preview do Email
            </button>
          </div>
        </div>
      )}
    </>
  );
}
