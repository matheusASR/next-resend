import React, { createContext, ReactNode, useState } from "react";

interface HeaderContextType {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const HeaderContext = createContext<HeaderContextType>({} as HeaderContextType);

interface HeaderProviderProps {
  children: ReactNode;
}

const HeaderProvider: React.FC<HeaderProviderProps> = ({ children }) => {
  const [mode, setMode] = useState("new-email");

  return (
    <HeaderContext.Provider value={{ mode, setMode }}>
      {children}
    </HeaderContext.Provider>
  );
};

export { HeaderProvider, HeaderContext };