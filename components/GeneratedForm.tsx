"use client";
import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import GeneratedField from "./GeneratedField";
import { FormData } from "@/lib/utils";
import { Input } from "./ui/input";
import { Form } from "./ui/form";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  editMode: boolean;
  answereMode: boolean;
};

export default function GeneratedForm(props: Props) {
  const { formData, setFormData, editMode, answereMode } = props;
  const [isEditingFormName, setIsEditingFormName] = useState(false);
  const form = useForm<FormData>();

  const handleChangeFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, formName: e.target.value });
  };

  return (
    <Form {...form}>
      <Card className="box-container h-min mb-4 md:h-[80vh] overflow-x-hidden">
        <CardHeader>
          <CardTitle>
            {isEditingFormName ? (
              <Input
                value={formData.formName}
                onChange={handleChangeFormName}
                onBlur={() => setIsEditingFormName(false)}
                autoFocus
                className="rounded-lg shadow-sm text-secondary-color"
                placeholder="Nom du formulaire"
              />
            ) : (
              <div>
                <span
                  onClick={() => setIsEditingFormName(true)}
                  className="cursor-pointer text-secondary-color"
                >
                  {formData.formName ? formData.formName : "Nom du formulaire"}
                </span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Droppable droppableId={`droppable-${formData.id}`}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                <GeneratedField
                  formData={formData}
                  setFormData={setFormData}
                  editMode={editMode}
                  answereMode={answereMode}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </CardContent>
      </Card>
    </Form>
  );
}
