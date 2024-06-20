"use client";
import Modal from "react-modal";
import styles from "./emailView.module.css";
import { useEffect, useState } from "react";

const customStyles = {
  content: {
    width: "50%",
    height: 600,
    margin: "auto",
  },
};
interface EmailViewModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  email: any | null;
}

const EmailViewModal = ({
  isOpen,
  onRequestClose,
  email,
}: EmailViewModalProps) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (email && email.html_file && email.html_file.data) {
      // Convert the array of bytes to a string
      const byteArray = new Uint8Array(email.html_file.data);
      const htmlString = new TextDecoder("utf-8").decode(byteArray);
      setHtmlContent(htmlString);
    }
  }, [email]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false}
      style={customStyles}
    >
      <div className={styles.modal__container}>
        <section className={styles.close__bttn__section}>
          <button onClick={onRequestClose}>X</button>
        </section>
        {htmlContent ? (
          <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
        ) : (
          <p>No Content</p>
        )}
      </div>
    </Modal>
  );
};

export default EmailViewModal;
