import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateUniqueId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// Type for a field type
export type FieldType =
  | "text"
  | "checkbox"
  | "radio"
  | "select"
  | "number"
  | "date"
  | "email"
  | "file"
  | "range";

// Type for a field value
export type FieldValue = string | number | boolean | string[];

// Interface for a field option
export interface FieldOption {
  id: number;
  value: string | number | boolean;
}

// Interface for a field
export interface Field {
  id: number;
  fieldType: FieldType;
  fieldName: string;
  value: FieldValue;
  required: boolean;
  options?: FieldOption[];
  min?: number;
  max?: number;
}
[];

// Interface for a form field
export interface FormData {
  id: number;
  formName: string;
  fields: Field[];
}

// Function to initialize the field with default values according to type
export const initializeField = (
  type: FieldType,
  fieldName: string,
  isRequired: boolean,
  minValue: number,
  maxValue: number,
  options: FieldOption[]
): Field => {
  const baseField: Field = {
    id: generateUniqueId(),
    fieldType: type,
    fieldName: fieldName,
    required: isRequired,
    value: "",
  };

  switch (type) {
    case "number":
    case "range":
      return {
        ...baseField,
        min: minValue,
        max: maxValue,
      };
    case "select":
    case "radio":
    case "checkbox":
      return {
        ...baseField,
        options: options,
      };
    default:
      return baseField;
  }
};

export const fieldList: { value: FieldType; text: string }[] = [
  { value: "text", text: "Texte" },
  { value: "checkbox", text: "Case à cocher" },
  { value: "select", text: "Liste déroulante" },
  { value: "radio", text: "Choix multiple" },
  { value: "email", text: "Email" },
  { value: "number", text: "Nombre" },
  { value: "date", text: "Date" },
  { value: "file", text: "Fichier" },
  { value: "range", text: "Plage d'entrée" },
];

export type ViewType = "preview" | "formList" | "answerList";
