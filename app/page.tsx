"use client";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { FormData, generateUniqueId, ViewType } from "@/lib/utils";
import FieldChoice from "@/components/FieldChoice";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import PrewievBox from "@/components/PrewievBox";
import FormList from "@/components/FormList";
import AnswereList from "@/components/AnswereList";

export default function Home() {
  const [view, setView] = useState<ViewType>("preview");
  const [allForms, setAllForms] = useState<FormData[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [answerList, setAnswerList] = useState<FormData[]>([]);
  const [answereMode, setAnswereMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    id: generateUniqueId(),
    formName: "Nom du formulaire",
    fields: [],
  });

  useEffect(() => {
    const allFormsData = localStorage.getItem("allForms");
    if (allFormsData) {
      setAllForms(JSON.parse(allFormsData));
    }
    const answerListData = localStorage.getItem("allAnswers");
    if (answerListData) {
      setAnswerList(JSON.parse(answerListData));
    }

    console.log(editMode);
    console.log(answereMode);
  }, []);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedFields = Array.from(formData.fields);
    const [movedField] = updatedFields.splice(result.source.index, 1);
    updatedFields.splice(result.destination.index, 0, movedField);

    setFormData({ ...formData, fields: updatedFields });
  };

  const resetForm = () => {
    setFormData({
      id: generateUniqueId(),
      formName: "Nom du formulaire",
      fields: [],
    });
    setAnswereMode(false);
    setView("preview");
  };

  const handleOpenFormList = () => {
    setView("formList");
  };

  const handleOpenAnswerList = () => {
    setView("answerList");
  };

  const handleBack = () => {
    setView("preview");
  };

  return (
    <main className="min-h-screen w-screen">
      <Header />
      <div className="flex flex-col md:flex-row px-4 gap-6 mt-6">
        <div className="w-[35%] flex flex-col space-y-4">
          <Button
            onClick={resetForm}
            className="btn-common"
            disabled={!formData.fields.length}
          >
            <span className="hidden md:block">Nouveau formulaire</span>
          </Button>
          <FieldChoice formData={formData} setFormData={setFormData} />
        </div>
        <div className="w-full flex flex-col space-y-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-4">
              {view === "preview" && (
                <Button
                  className="btn-common w-min"
                  onClick={handleOpenFormList}
                >
                  Liste des formulaires
                </Button>
              )}
              {view === "formList" && (
                <>
                  <Button className="btn-common w-min" onClick={handleBack}>
                    Mode édition
                  </Button>
                  <Button
                    className="btn-common !bg-gray-400/60 w-min"
                    onClick={handleOpenAnswerList}
                  >
                    Réponses
                  </Button>
                </>
              )}
              {view === "answerList" && (
                <>
                  <Button className="btn-common w-min" onClick={handleBack}>
                    Mode édition
                  </Button>
                  <Button
                    className="btn-common w-min"
                    onClick={handleOpenFormList}
                  >
                    Liste des formulaires
                  </Button>
                </>
              )}
            </div>
            {view === "preview" && (
              <PrewievBox
                formData={formData}
                setFormData={setFormData}
                resetForm={resetForm}
                setAllForms={setAllForms}
                editMode={editMode}
                setEditMode={setEditMode}
                setAnswerList={setAnswerList}
                answereMode={answereMode}
                setAnswereMode={setAnswereMode}
                setView={setView}
              />
            )}
            {view === "formList" && (
              <FormList
                allForms={allForms}
                setAllForms={setAllForms}
                setFormData={setFormData}
                setView={setView}
                setEditMode={setEditMode}
                setAnswereMode={setAnswereMode}
              />
            )}
            {view === "answerList" && (
              <AnswereList
                answerList={answerList}
                setAnswerList={setAnswerList}
              />
            )}
          </DragDropContext>
        </div>
      </div>
    </main>
  );
}
