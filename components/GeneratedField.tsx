import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { FormData, validateField } from "@/lib/utils";

type Props = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  editMode: boolean;
  answereMode: boolean;
};

export default function GeneratedField(props: Props) {
  const { formData, setFormData, editMode, answereMode } = props;
  const handleCheckboxChange = (
    index: number,
    optionIndex: number,
    checked: boolean
  ) => {
    const updatedFields = [...formData.fields];
    const field = updatedFields[index];

    if (!Array.isArray(field.value)) {
      field.value = [];
    }

    if (checked) {
      field.value = [
        ...(field.value as string[]),
        field.options?.[optionIndex]?.value as string,
      ];
    } else {
      field.value = (field.value as string[]).filter(
        (val) => val !== (field.options?.[optionIndex]?.value as string)
      );
    }
    setFormData({ ...formData, fields: updatedFields });
  };

  const updateFieldValue = (index: number, value: any) => {
    const updatedFields = [...formData.fields];
    updatedFields[index].value = value;
    updatedFields[index].errorMessage = validateField(updatedFields[index]);
    setFormData({ ...formData, fields: updatedFields });
  };

  const handleRemoveField = (index: number) => {
    setFormData({
      ...formData,
      fields: formData.fields.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      {formData.fields.length <= 0 && (
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-center text-gray-400">Aucun champ généré</p>
        </div>
      )}
      {formData.fields.map((field, index) => (
        <Draggable
          key={field.id + index}
          draggableId={field.id.toString()}
          index={index}
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="border border-[#ccc2b8] rounded-lg p-4"
            >
              <div className="flex justify-between items-center ">
                <Label
                  className={`flex-grow text-secondary-color font-bold ${
                    answereMode ? "pb-3" : ""
                  }`}
                >
                  {field.fieldName.toString().charAt(0).toUpperCase() +
                    field.fieldName.slice(1)}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                <Button
                  onClick={() => handleRemoveField(index)}
                  className={`btn-common rounded-lg shadow-sm w-8 h-8 mb-2 p-0 ${
                    answereMode ? "hidden" : ""
                  }`}
                >
                  <TrashIcon className="h-max w-max" color="white" />
                </Button>
              </div>
              <div className="space-y-2">
                {field.fieldType === "text" && (
                  <Input
                    id={`field-${index}`}
                    placeholder="Entrez votre réponse"
                    className="rounded-lg shadow-sm"
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    disabled={editMode}
                  />
                )}
                {field.fieldType === "select" && (
                  <Select
                    defaultValue={
                      field.options ? String(field.options[0].value) : undefined
                    }
                    onValueChange={(value) => updateFieldValue(index, value)}
                    disabled={editMode}
                  >
                    <SelectTrigger
                      id={`field-${index}`}
                      className="rounded-lg shadow-sm"
                    >
                      <SelectValue placeholder="Selectionner une option" />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option, optionIndex) => (
                        <SelectItem
                          key={optionIndex}
                          value={String(option.value)}
                          className="rounded-lg"
                        >
                          {String(option.value)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                {field.fieldType === "radio" && (
                  <RadioGroup
                    defaultValue={
                      field.options ? String(field.options[0].value) : undefined
                    }
                    onValueChange={(value) => updateFieldValue(index, value)}
                    disabled={editMode}
                  >
                    {field.options?.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={String(option.value)}
                          id={`field-${index}-${optionIndex}`}
                          disabled={editMode}
                        />
                        <Label htmlFor={`field-${index}-${optionIndex}`}>
                          {String(option.value)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                {field.fieldType === "checkbox" &&
                  field.options?.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={`field-${index}-${optionIndex}`}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckboxChange(index, optionIndex, checked)
                        }
                        disabled={editMode}
                      />
                      <Label htmlFor={`field-${index}-${optionIndex}`}>
                        {String(option.value)}
                      </Label>
                    </div>
                  ))}
                {field.fieldType === "number" && (
                  <Input
                    id={`field-${index}`}
                    placeholder="Entrez votre nombre"
                    type="number"
                    className="rounded-lg shadow-sm"
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    disabled={editMode}
                  />
                )}
                {field.fieldType === "range" && (
                  <div className="flex items-center justify-center space-x-6">
                    <Slider
                      id={`field-${index}`}
                      min={field.min}
                      max={field.max}
                      step={1}
                      value={[field.value as number]}
                      defaultValue={[
                        (field.value as number) || (field.min as number),
                      ]}
                      onValueChange={(value) => {
                        updateFieldValue(index, value[0]);
                      }}
                      disabled={editMode}
                    />
                    <div className="w-auto">{field.value || "0"}</div>
                  </div>
                )}
                {field.fieldType === "file" && (
                  <Input
                    id={`field-${index}`}
                    type="file"
                    className="rounded-lg shadow-sm cursor-pointer"
                    onChange={(e) =>
                      updateFieldValue(index, e.target.files?.[0])
                    }
                    disabled={editMode}
                  />
                )}
                {field.fieldType === "email" && (
                  <Input
                    id={`field-${index}`}
                    type="email"
                    placeholder="Entrez votre email"
                    className="rounded-lg shadow-sm"
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    disabled={editMode}
                  />
                )}
                {field.fieldType === "date" && (
                  <Input
                    id={`field-${index}`}
                    type="date"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    className="rounded-lg shadow-sm"
                    onChange={(e) => updateFieldValue(index, e.target.value)}
                    disabled={editMode}
                  />
                )}
                {field.errorMessage && (
                  <p className="text-red-500 text-sm">{field.errorMessage}</p>
                )}
              </div>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}
