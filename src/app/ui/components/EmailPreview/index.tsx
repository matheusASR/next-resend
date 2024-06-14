import { useContext } from "react";
import styles from "./emailPreview.module.css";
import { EmailPreviewContext } from "../../providers/emailPreviewContext";

export default function EmailPreview() {
  const { setActive } = useContext(EmailPreviewContext)

  return (
    <div className={styles.emailpreview__container}>
      <div className={styles.emailpreview__header}>
        <p className={styles.emailpreview__headertitle}>Preview do Email</p>
        <button onClick={() => setActive(false)}>X</button>
      </div>
      <div className={styles.emailpreview__contentcontainer}>
        {/* <img src="" alt="" />
        <p></p>
        <a href=""></a>
        <button></button> */}
      </div>
    </div>
  );
}