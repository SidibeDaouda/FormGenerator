import { FormData, ViewType } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileTextIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";

type Props = {
  allForms: FormData[];
  setAllForms: (allForms: FormData[]) => void;
  setFormData: (formData: FormData) => void;
  setView: (view: ViewType) => void;
  setEditMode: (editMode: boolean) => void;
  setAnswereMode: (answereMode: boolean) => void;
};

export default function FormList(props: Props) {
  const {
    allForms,
    setAllForms,
    setFormData,
    setView,
    setEditMode,
    setAnswereMode,
  } = props;

  const handleRemoveField = (formId: number) => {
    setAllForms((prevForms: FormData[]) => {
      const updatedForms = prevForms.filter(
        (form: FormData) => form.id !== formId
      );
      localStorage.setItem("allForms", JSON.stringify(updatedForms));
      return updatedForms;
    });
  };

  const handleEditField = (id: number) => {
    const form = allForms.find((form) => form.id === id);
    if (form) {
      setEditMode(true);
      setAnswereMode(false);
      setFormData(form);
      setView("preview");
    }
  };

  const handleAnswerForm = (id: number) => {
    const form = allForms.find((form) => form.id === id);
    if (form) {
      setEditMode(false);
      setAnswereMode(true);
      setFormData(form);
      setView("preview");
    }
  };

  return (
    <Card className="box-container h-min mb-4 md:h-[80vh] overflow-x-hidden">
      <CardHeader>
        <CardTitle className="text-secondary-color">
          Liste des formulaires
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {allForms.length > 0 ? (
          allForms.map((form, i) => (
            <div
              key={i}
              className="border border-[#ccc2b8] rounded-lg p-4 flex justify-between items-center"
            >
              <h2 className="text-md font-medium text-secondary-color">
                {form.formName}
              </h2>
              <div className="flex gap-4 justify-end">
                <Button
                  className="btn-common !bg-gray-400/70 space-x-2"
                  onClick={() => handleEditField(form.id)}
                >
                  <Pencil2Icon className="h-max w-max" color="white" />
                  <span>Modifier</span>
                </Button>

                <Button
                  className="btn-common space-x-2"
                  onClick={() => handleAnswerForm(form.id)}
                >
                  <FileTextIcon className="h-max w-max" color="white" />
                  <span>Nouvelle réponse</span>
                </Button>

                <Button
                  className="btn-common"
                  onClick={() => handleRemoveField(form.id)}
                >
                  <TrashIcon className="h-max w-max" color="white" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div>Aucun formulaire trouvé</div>
        )}
      </CardContent>
    </Card>
  );
}
