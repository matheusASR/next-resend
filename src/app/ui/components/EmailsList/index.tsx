"use client";
import { useEffect, useState } from "react";
import styles from "./emailsList.module.css";
import { api } from "@/api";
import EmailViewModal from "./Modals/EmailView";
import EmailSendModal from "./Modals/EmailSend";
import EmailScheduleModal from "./Modals/EmailSchedule";

export default function EmailsList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emailViewModal, setEmailViewModal] = useState<boolean>(false);
  const [emailSendModal, setEmailSendModal] = useState<boolean>(false);
  const [emailScheduleModal, setEmailScheduleModal] = useState<boolean>(false);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  const openEmailViewModal = (email: any) => {
    setSelectedEmail(email);
    setEmailViewModal(true);
  };

  const openEmailSendModal = (email: any) => {
    setSelectedEmail(email);
    setEmailSendModal(true);
  };

  const openEmailScheduleModal = (email: any) => {
    setSelectedEmail(email);
    setEmailScheduleModal(true);
  };

  const closeEmailViewModal = () => {
    setEmailViewModal(false);
    setSelectedEmail(null);
  };

  const closeEmailSendModal = () => {
    setEmailSendModal(false);
    setSelectedEmail(null);
  };

  const closeEmailScheduleModal = () => {
    setEmailScheduleModal(false);
    setSelectedEmail(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/emails");
        if (response.status === 200) {
          setEmails(response.data);
        }
      } catch (error: any) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.emailsList__container}>
        {emails.map((email: any) => (
          <div key={email.id} className={styles.emailItem}>
            <section>
              <p>Email {email.id}</p>
              <p>Tipo: {email.classification.name}</p>
              <p>Email do Remetente: {email.sender.alias}</p>
            </section>
            <section className={styles.section__bttns}>
              <button
                onClick={() => openEmailViewModal(email)}
                className={styles.emailButton}
              >
                Visualizar
              </button>
              <button
                onClick={() => openEmailSendModal(email)}
                className={styles.emailButton}
              >
                Disparar
              </button>
              <button
                onClick={() => openEmailScheduleModal(email)}
                className={styles.emailButton}
              >
                Agendar
              </button>
            </section>
          </div>
        ))}
      </div>
      <EmailViewModal
        isOpen={emailViewModal}
        onRequestClose={closeEmailViewModal}
        email={selectedEmail}
      />
      <EmailSendModal
        isOpen={emailSendModal}
        onRequestClose={closeEmailSendModal}
        email={selectedEmail}
      />
      <EmailScheduleModal
        isOpen={emailScheduleModal}
        onRequestClose={closeEmailScheduleModal}
        email={selectedEmail}
      />
    </>
  );
}
