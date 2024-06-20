"use client";
import { useEffect, useState } from "react";
import styles from "./emailsList.module.css";
import { api } from "@/api";
import EmailViewModal from "./Modals/EmailView";
import EmailSendModal from "./Modals/EmailSend";
import EmailScheduleModal from "./Modals/EmailSchedule";

export default function EmailsList() {
  const [emails, setEmails] = useState([]);
  const [scheduledEmails, setScheduledEmails] = useState([]);
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
    const getEmails = async () => {
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

    const getSchedules = async () => {
      try {
        const response = await api.get("/schedules");
        if (response.status === 200) {
          const scheduledEmails = response.data.filter(
            (obj: any) => obj.status === "Agendado"
          );
          setScheduledEmails(scheduledEmails);
        }
      } catch (error: any) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    getEmails();
    getSchedules();
  }, [scheduledEmails]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      <div className={styles.emailsList__container}>
        {emails.map((email: any) => {
          const scheduledEmail: any = scheduledEmails.find(
            (scheduledEmail: any) => scheduledEmail.email.id === email.id
          );

          return (
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
                {scheduledEmail ? (
                  <div className={styles.scheduled}>
                    <p className={styles.scheduledText}>Agendado</p>
                    <p className={styles.scheduledText}>{scheduledEmail.send_date}</p>
                    <p className={styles.scheduledText}>{scheduledEmail.send_time}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => openEmailScheduleModal(email)}
                    className={styles.emailButton}
                  >
                    Agendar
                  </button>
                )}
              </section>
            </div>
          );
        })}
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
