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
  const [emailViewModal, setEmailViewModal] = useState(false);
  const [emailSendModal, setEmailSendModal] = useState(false);
  const [emailScheduleModal, setEmailScheduleModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);

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
          console.log(response.data);
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
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.emailsList__container}>
        {emails.map((email: any) => (
          <div key={email.id} className={styles.emailItem}>
            <p>{email.id}</p>
            <section className={styles.section__bttns}>
              <button className={styles.emailButton}>Visualizar</button>
              <button className={styles.emailButton}>Disparar</button>
              <button className={styles.emailButton}>Agendar</button>
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
