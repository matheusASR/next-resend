import Form from "./ui/components/Form";
import Header from "./ui/components/Header";
import styles from "./ui/page.module.css";

export default function SendEmail() {
  return (
    <main className={styles.main}>
      <Header/>
      <Form/>
    </main>
  );
}
