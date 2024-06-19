import Modal from "react-modal";
import styles from "./emailSend.module.css";

const customStyles = {
  content: {
    width: "50%",
    height: 100,
    margin: "auto",
  },
};

const EmailSendModal = ({ isOpen, onRequestClose, email }: any) => {
  const sendEmail = () => {
    console.log("email enviado");
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
