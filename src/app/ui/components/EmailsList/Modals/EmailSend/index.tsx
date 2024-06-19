import Modal from "react-modal";
import styles from "./EmailView.module.css";

Modal.setAppElement("#__next");

const EmailSendModal = ({ isOpen, onRequestClose, email }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
    >
        <p>Send</p>
      <p>{email.title}</p>
    </Modal>
  );
};

export default EmailSendModal;