import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";

interface Receiver {
  name: string;
  email: string;
}

interface FormData {
  campaign_name: string;
  type: string;
  sender: string;
  subject: string;
  body: string;
  image: string;
  button_name: string;
  button_color: string;
  button_link: string;
  date_day: string;
  date_month: string;
  date_year: string;
  time_hour: string;
  time_minute: string;
  csv_file: string;
  receivers: Receiver[];
}

interface EmailCreateContextType {
  formData: FormData;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: Dispatch<SetStateAction<FormData>>;
  fields: any;
  setFields: any;
  links: string[];
  setLinks: Dispatch<SetStateAction<any[]>>;
  addLinks: boolean;
  addButton: boolean;
  setAddLinks: any;
  setAddButton: any;
  bodyType: string;
  setBodyType: any;
}

const EmailCreateContext = createContext<EmailCreateContextType>(
  {} as EmailCreateContextType
);

interface EmailCreateProviderProps {
  children: ReactNode;
}

const EmailCreateProvider: React.FC<EmailCreateProviderProps> = ({
  children,
}) => {
  const [fields, setFields] = useState<Receiver[]>([{ name: "", email: "" }]);
  const [links, setLinks] = useState<string[]>([""]);
  const [addLinks, setAddLinks] = useState(false);
  const [addButton, setAddButton] = useState(false);
  const [bodyType, setBodyType] = useState("creator");
  const [formData, setFormData] = useState<FormData>({
    campaign_name: "",
    type: "",
    sender: "",
    subject: "",
    body: "",
    image: "",
    button_name: "",
    button_color: "",
    button_link: "",
    date_day: "",
    date_month: "",
    date_year: "",
    time_hour: "",
    time_minute: "",
    receivers: [{ name: "", email: "" }],
    csv_file: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          body: reader.result as string,
        });
      };
      reader.readAsText(file);
    } else if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    } else if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          csv_file: reader.result as string,
        });
      };
      reader.readAsText(file);
    } else {
      alert("Por favor, faça upload de um arquivo válido.");
    }
  };

  return (
    <EmailCreateContext.Provider
      value={{
        formData,
        setFormData,
        handleInputChange,
        handleFileChange,
        fields,
        setFields,
        links,
        setLinks,
        addLinks,
        setAddLinks,
        addButton,
        setAddButton,
        bodyType,
        setBodyType,
      }}
    >
      {children}
    </EmailCreateContext.Provider>
  );
};

export { EmailCreateProvider, EmailCreateContext };
