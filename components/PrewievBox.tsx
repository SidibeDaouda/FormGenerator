"use client";
import GeneratedForm from "./GeneratedForm";
import { FormData, ViewType, fieldList } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  resetForm: () => void;
  setAllForms: (allForms: FormData[]) => void;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setAnswerList: (answerList: FormData[]) => void;
  answereMode: boolean;
  setAnswereMode: (answereMode: boolean) => void;
  setView: (view: ViewType) => void;
};

export default function PrewievBox(props: Props) {
  const {
    formData,
    setFormData,
    resetForm,
    setAllForms,
    editMode,
    setEditMode,
    setAnswerList,
    answereMode,
    setAnswereMode,
    setView,
  } = props;

  const onSubmit = () => {
    formData.fields.forEach((field) => {
      field.fieldName = field.fieldName.trim();

      if (typeof field.value === "string") {
        field.value = field.value.toLowerCase().trim();
        field.options?.forEach((option) => {
          if (typeof option.value === "string") {
            option.value = option.value.toLowerCase().trim();
          }
        });
      }
    });

    setAllForms((prevForms: FormData[]) => {
      let updatedForms = [];

      if (editMode) {
        updatedForms = prevForms.map((form) =>
          form.id === formData.id ? formData : form
        );
      } else {
        updatedForms = [...prevForms, formData];
      }

      localStorage.setItem("allForms", JSON.stringify(updatedForms));
      setAnswereMode(false);
      setEditMode(false);
      return updatedForms;
    });

    resetForm();
  };

  const submitAnswers = () => {
    if (answereMode) {
      setAnswerList((prevAnswers: FormData[]) => {
        const updatedAnswers = [...prevAnswers, formData];
        localStorage.setItem("allAnswers", JSON.stringify(updatedAnswers));
        return updatedAnswers;
      });
      setView("answerList");
    }
  };

  return (
    <>
      <GeneratedForm
        formData={formData}
        setFormData={setFormData}
        editMode={editMode}
        answereMode={answereMode}
      />

      {answereMode ? (
        <Button className="btn-common w-min" onClick={submitAnswers}>
          Soumettre les réponses
        </Button>
      ) : (
        <Button
          className="btn-common w-min"
          onClick={onSubmit}
          disabled={!formData.fields.length}
        >
          Enregistrer
        </Button>
      )}
    </>
  );
}
