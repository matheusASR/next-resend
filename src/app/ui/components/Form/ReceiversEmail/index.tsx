"use client";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import styles from "./receiversEmail.module.css";
import { EmailCreateContext } from "@/app/ui/providers/emailCreateContext";

export default function ReceiversEmail() {
  const { formData, handleFileChange, setFormData, fields, setFields, inputType, setInputType } =
    useContext(EmailCreateContext);

  const handleInputTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputType(e.target.value);
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

  return (
    <>
      <div className={styles.form__container__divAlt}>
        <label>Destinatários</label>
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
            required
          />
        </div>
      ) : (
        <div className={styles.form__container__receivers}>
          <div className={styles.form__container__divreceiversdata}>
            {fields.map((field: any, index: any) => (
              <div key={index} className={styles.fieldSet}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  value={field.name}
                  className={styles.input__receivers}
                  onChange={(e) => handleFieldChange(index, e)}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={field.email}
                  className={styles.input__receivers}
                  onChange={(e) => handleFieldChange(index, e)}
                  required
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
    </>
  );
}
