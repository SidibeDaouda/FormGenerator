import { FormData } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

type Props = {
  answerList: FormData[];
  setAnswerList: (answerList: FormData[]) => void;
};

export default function AnswereList(props: Props) {
  const { answerList, setAnswerList } = props;

  const handleRemoveField = (index: number) => {
    setAnswerList((prevAnswers: FormData[]) => {
      const updatedAnswers = prevAnswers.filter((_, i: number) => i !== index);
      localStorage.setItem("allAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  return (
    <Card className="box-container h-min mb-4 md:h-[80vh] overflow-x-hidden">
      <CardHeader>
        <CardTitle className="text-secondary-color">
          Liste des réponses
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {answerList.length > 0 ? (
          answerList.map((form, index) => (
            <div
              key={index}
              className="border border-[#ccc2b8] rounded-lg p-4 flex flex-col items-center"
            >
              <div className="flex justify-between w-full">
                <h2 className="text-md font-medium text-secondary-color">
                  {form.formName}
                </h2>
                <div className="flex gap-4 justify-end">
                  <Button
                    className="btn-common"
                    onClick={() => handleRemoveField(index)}
                  >
                    <TrashIcon className="h-max w-max" color="white" />
                  </Button>
                </div>
              </div>

              <div className="w-full">
                {form.fields.map((field, index) => (
                  <div key={index} className="flex space-x-2">
                    <p className="text-md font-medium">{field.fieldName}:</p>
                    <p className="text-md">{String(field.value)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div>Aucune réponse trouvée</div>
        )}
      </CardContent>
    </Card>
  );
}
