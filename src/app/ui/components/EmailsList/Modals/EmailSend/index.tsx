import Modal from "react-modal";
import styles from "./emailSend.module.css";
import { api } from "@/api";

const customStyles = {
  content: {
    width: "50%",
    height: 100,
    margin: "auto",
  },
};

const EmailSendModal = ({ isOpen, onRequestClose, email }: any) => {
  const sendEmail = async () => {
    try {
      const response = await api.post(`/emails/resend/${email.id}`);
      if (response.status === 200) {
        alert("Email disparado com sucesso!");
        onRequestClose()
      }
    } catch (error: any) {
      console.error(
        "Erro ao disparar email:",
        error.response?.data || error.message
      );
      alert("Ocorreu um erro ao disparar email");
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
            Tem certeza de que deseja disparar este email?
          </h1>
          <button onClick={onRequestClose}>X</button>
        </div>
        <div className={styles.buttons__container}>
          <button className={styles.button} onClick={sendEmail}>
            Sim
          </button>
          <button className={styles.button} onClick={onRequestClose}>
            Não
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EmailSendModal;
