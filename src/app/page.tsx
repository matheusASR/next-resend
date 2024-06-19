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
import { HeaderContext, HeaderProvider } from "./ui/providers/headerContext";
import EmailsList from "./ui/components/EmailsList";

export default function SendEmail() {
  return (
    <HeaderProvider>
      <EmailPreviewProvider>
        <EmailCreateProvider>
          <SendEmailContent />
        </EmailCreateProvider>
      </EmailPreviewProvider>
    </HeaderProvider>
  );
}

function SendEmailContent() {
  const { active } = useContext(EmailPreviewContext);
  const { bodyType } = useContext(EmailCreateContext);
  const { mode } = useContext(HeaderContext)

  return (
    <>
      <Header />
      <main className={styles.main}>
        {mode === "new-email" ? (
          <>
            <Form />
            {bodyType === "creator" && active ? <EmailPreview /> : <></>}
          </>
        ) : (
          <>
            <EmailsList />
          </>
        )}
      </main>
    </>
  );
}
