"use client";
import { useContext } from "react";
import EmailPreview from "./ui/components/EmailPreview";
import Form from "./ui/components/Form";
import Header from "./ui/components/Header";
import styles from "./ui/page.module.css";
import {
  EmailPreviewContext,
  EmailPreviewProvider,
} from "./ui/providers/emailPreviewContext";
import {
  EmailCreateContext,
  EmailCreateProvider,
} from "./ui/providers/emailCreateContext";

export default function SendEmail() {
  return (
    <EmailPreviewProvider>
      <EmailCreateProvider>
        <SendEmailContent />
      </EmailCreateProvider>
    </EmailPreviewProvider>
  );
}

function SendEmailContent() {
  const { active } = useContext(EmailPreviewContext);
  const { bodyType } = useContext(EmailCreateContext);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Form />
        {bodyType === "creator" && active ? <EmailPreview /> : <></>}
      </main>
    </>
  );
}
