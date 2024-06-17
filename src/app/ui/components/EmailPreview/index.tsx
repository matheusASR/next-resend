import { useContext } from "react";
import styles from "./emailPreview.module.css";
import { EmailPreviewContext } from "../../providers/emailPreviewContext";
import { EmailCreateContext } from "../../providers/emailCreateContext";
import Image from "next/image";

export default function EmailPreview() {
  const { setActive } = useContext(EmailPreviewContext);
  const { formData, links } = useContext(EmailCreateContext);

  return (
    <div className={styles.emailpreview__container}>
      <div className={styles.emailpreview__header}>
        <p className={styles.emailpreview__headertitle}>Preview do Email</p>
        <button onClick={() => setActive(false)}>X</button>
      </div>
      <div className={styles.emailpreview__contentcontainer}>
        {formData.image.length > 0 ? (
          <Image
            alt="banner-image"
            width={300}
            height={300}
            src={formData.image}
          />
        ) : (
          <></>
        )}
        <p className={styles.body__text}>{formData.body}</p>
        <div className={styles.links__container}>
          {links.length > 0 &&
            links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                className={styles.link}
                style={{ display: "block" }}
              >
                {link}
              </a>
            ))}
        </div>
        {formData.button_color.length > 0 && formData.button_name.length > 0 ? (
          <button
            style={{
              borderRadius: 10,
              fontWeight: "bold",
              fontSize: 16,
              height: 40,
              backgroundColor: formData.button_color,
              marginLeft: 20,
            }}
          >
            {formData.button_name}
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
