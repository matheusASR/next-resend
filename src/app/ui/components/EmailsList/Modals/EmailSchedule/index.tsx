import Modal from "react-modal";
import styles from "./EmailView.module.css";

Modal.setAppElement("#__next");

const EmailScheduleModal = ({ isOpen, onRequestClose, email }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
    >
        <p>Schedule</p>
      <p>{email.title}</p>
    </Modal>
  );
};

export default EmailScheduleModal;