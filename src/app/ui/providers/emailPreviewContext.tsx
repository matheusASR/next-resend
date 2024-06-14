import React, { createContext, ReactNode, useState } from "react";

interface EmailPreviewContextType {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmailPreviewContext = createContext<EmailPreviewContextType>({} as EmailPreviewContextType);

interface EmailPreviewProviderProps {
  children: ReactNode;
}

const EmailPreviewProvider: React.FC<EmailPreviewProviderProps> = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <EmailPreviewContext.Provider value={{ active, setActive }}>
      {children}
    </EmailPreviewContext.Provider>
  );
};

export { EmailPreviewProvider, EmailPreviewContext };