import { useContext } from "react";
import { EmailPreviewContext } from "../../providers/emailPreviewContext";
import { EmailCreateContext } from "../../providers/emailCreateContext";
import styles from "./emailPreview.module.css";
import Image from "next/image";

export function generateEmailHTML(
  formData: any,
  links: any,
  addLinks: any,
  addButton: any
) {
  const imageSection =
    formData.image.length > 0
      ? `<img alt="banner-image" width="300" height="300" src="${formData.image}" style="display: block; margin: 0 auto;"/>`
      : "";

  const linksSection =
    addLinks && links.length > 0
      ? links
          .map(
            (link: any) =>
              `<a href="${link}" target="_blank" style="display: block; margin: 10px 0; word-wrap: break-word;">${link}</a>`
          )
          .join("")
      : "";

  const buttonSection =
    addButton &&
    formData.button_color.length > 0 &&
    formData.button_name.length > 0
      ? `<a href="${formData.button_link}" target="_blank">
         <button style="border-radius: 10px; font-weight: bold; font-size: 16px; height: 40px; background-color: ${formData.button_color}; padding: 10px; margin: 10px 0; border: 1px solid black; cursor: pointer;">
           ${formData.button_name}
         </button>
       </a>`
      : "";

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email</title>
    </head>
    <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 15%;">
      <div style="width: 500px; padding: 20px; margin: 0 auto;">
        ${imageSection}
        <h1 style="margin: 20px 0; width: 100%; text-align: center;">${formData.title}</h1>
        <p style="white-space: pre-wrap; word-wrap: break-word; padding: 10px;">${formData.body}</p>
        <div>${linksSection}</div>
        <div>${buttonSection}</div>
      </div>
    </body>
    </html>
  `;
}

export default function EmailPreview() {
  const { setActive } = useContext(EmailPreviewContext);
  const { formData, links, addLinks, addButton } =
    useContext(EmailCreateContext);

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
        <h1>{formData.title}</h1>
        <p className={styles.body__text}>{formData.body}</p>
        <div className={styles.links__container}>
          {addLinks &&
            links.length > 0 &&
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
        <div className={styles.div__bttn}>
          {addButton &&
          formData.button_color.length > 0 &&
          formData.button_name.length > 0 ? (
            <a href={formData.button_link} target="_blank">
              <button
                style={{
                  borderRadius: 10,
                  fontWeight: "bold",
                  fontSize: 16,
                  height: 40,
                  backgroundColor: formData.button_color,
                  padding: 10,
                }}
              >
                {addButton && formData.button_name}
              </button>
            </a>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
