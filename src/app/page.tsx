"use client";
import { useContext } from "react";
import EmailPreview from "./ui/components/EmailPreview";
import Form from "./ui/components/Form";
import Header from "./ui/components/Header";
import styles from "./ui/page.module.css";
import { EmailPreviewContext, EmailPreviewProvider } from "./ui/providers/emailPreviewContext";

export default function SendEmail() {
  return (
    <EmailPreviewProvider>
      <SendEmailContent />
    </EmailPreviewProvider>
  );
}

function SendEmailContent() {
  const { active } = useContext(EmailPreviewContext);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Form />
        {active ? (
          <EmailPreview />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}
