"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  position?: string;
  description?: string;
};

type FormContextType = {
  formData: FormData;
  setFormData: (data: FormData) => void;
};

const defaultData: FormData = {
  name: "",
  email: "",
  phone: "",
  position: "",
  description: "",
};

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
