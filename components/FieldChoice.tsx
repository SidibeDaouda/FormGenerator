"use client";
import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  FieldType,
  FieldOption,
  initializeField,
  FormData,
  generateUniqueId,
  fieldList,
} from "@/lib/utils";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Props = {
  formData: FormData;
  setFormData: (fields: FormData) => void;
};

export default function FieldChoice({ formData, setFormData }: Props) {
  const [fieldName, setFieldName] = useState<string>("");
  const [fieldType, setFieldType] = useState<FieldType>("text");
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(100);
  const [isRequired, setIsRequired] = useState<boolean>(false);
  const [disableInsertBtn, setDisableInsertBtn] = useState<boolean>(false);
  const [options, setOptions] = useState<FieldOption[]>([]);

  const handleAddOption = () => {
    setOptions([...options, { id: generateUniqueId(), value: "" }]);
  };

  const handleRemoveOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleUpdateOption = (index: number, value: string) => {
    setOptions(
      options.map((option, i) => (i === index ? { ...option, value } : option))
    );
  };

  useEffect(() => {
    const disable =
      fieldName.trim() === "" ||
      options.some((option) => option.value === "") ||
      (fieldType === "checkbox" && options.length === 0) ||
      ((fieldType === "radio" || fieldType === "select") &&
        options.length < 2) ||
      (fieldType === "range" && (minValue < 0 || maxValue < 0)) ||
      (fieldType === "number" && (minValue < 0 || maxValue < 0)) ||
      minValue >= maxValue;

    setDisableInsertBtn(disable);
  }, [fieldType, fieldName, options, minValue, maxValue]);

  const choiceReset = () => {
    setFieldName("");
    setOptions([]);
    setIsRequired(
      fieldType === "date" || fieldType === "radio" || fieldType === "range"
    );
    setMinValue(0);
    setMaxValue(100);
  };

  useEffect(() => {
    choiceReset();
  }, [fieldType]);

  const handleAddField = () => {
    const newField = initializeField(
      fieldType,
      fieldName,
      isRequired,
      minValue,
      maxValue,
      options
    );

    setFormData({
      ...formData,
      fields: [...formData.fields, newField],
    });

    choiceReset();
  };

  return (
    <Card className="h-min max-h-[80vh] box-container overflow-x-hidden">
      <CardContent className="space-y-4 md:space-y-6">
        {/* Field type */}
        <div className="space-y-2 pt-4">
          <Label htmlFor="field-type">Type</Label>
          <Select
            onValueChange={(value) => setFieldType(value as FieldType)}
            defaultValue="text"
          >
            <SelectTrigger>
              <SelectValue placeholder="Liste déroulante" />
            </SelectTrigger>
            <SelectContent>
              {fieldList.map((field) => (
                <SelectItem key={field.value} value={field.value}>
                  {field.text}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Field name */}
        <div className="space-y-2">
          <Label htmlFor="field-name">
            Nom du champ
            <span className="text-red-500">*</span>
          </Label>
          <Input
            id="field-name"
            placeholder="Entrez votre réponse"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            required={fieldType !== "checkbox"}
            className="rounded-lg shadow-sm"
          />
        </div>

        {/* Options */}
        {(fieldType === "select" ||
          fieldType === "radio" ||
          fieldType === "checkbox") && (
          <div className="space-y-2">
            <Label
              htmlFor="options"
              className="flex items-center justify-between"
            >
              <p>
                {`Option ${fieldType === "checkbox" ? "(min. 1)" : "(min. 2)"}`}
                <span className="text-red-500">*</span>
              </p>
              <span
                onClick={handleAddOption}
                className="cursor-pointer bg-primary-color hover:bg-secondary-color rounded-lg p-1"
              >
                <PlusIcon className="h-5 w-5 font-bold" color="white" />
              </span>
            </Label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  id="options"
                  value={option.value as string}
                  onChange={(e) => handleUpdateOption(index, e.target.value)}
                  placeholder={`Ex: Option ${index + 1}`}
                  className="rounded-lg shadow-sm"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveOption(index)}
                  className="p-1 rounded-lg bg-red-400 hover:bg-red-500 h-8 w-8"
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Range */}
        {(fieldType === "range" || fieldType === "number") && (
          <div>
            <div className="flex space-x-2">
              <div className="space-y-2">
                <Label htmlFor="min-value">Min</Label>
                <Input
                  id="min-value"
                  placeholder="Min"
                  type="number"
                  value={minValue}
                  onChange={(e) => setMinValue(parseInt(e.target.value))}
                  className="rounded-lg shadow-sm"
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-value">Max</Label>
                <Input
                  id="max-value"
                  placeholder="Max"
                  type="number"
                  value={maxValue}
                  onChange={(e) => setMaxValue(parseInt(e.target.value))}
                  className="rounded-lg shadow-sm"
                  min={0}
                />
              </div>
            </div>
            <div className="mt-3">
              {minValue >= maxValue && (
                <p className="text-sm text-red-500">
                  Min doit être inférieur à Max
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="w-full flex flex-col items-start space-y-4">
        {/* Mandatory Field */}
        <div className="flex items-center space-x-2">
          <Switch
            id="required"
            checked={isRequired}
            onCheckedChange={setIsRequired}
          />
          <Label htmlFor="required">Obligatoire</Label>
        </div>

        {/* Add to form */}
        <Button
          onClick={handleAddField}
          disabled={disableInsertBtn}
          className={`${
            disableInsertBtn
              ? "bg-gray-400"
              : "bg-secondary-color hover:bg-fourth-color text-white"
          } rounded-lg shadow-sm transition-all duration-300`}
        >
          Ajouter au formulaire
        </Button>
      </CardFooter>
    </Card>
  );
}
