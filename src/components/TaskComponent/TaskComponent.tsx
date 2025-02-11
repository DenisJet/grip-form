import { useEffect, useState } from "react";
import { API_TASK_URL } from "../../../consts";
import { Alert } from "antd";

type FieldType = {
  ok: string;
  task: {
    title: string;
    description: string;
    tags: string[];
    budget_from: number;
    budget_to: number;
    deadline_days: number;
    number_of_reminders: number;
    private_content?: null;
    is_hard: boolean;
    all_auto_responses: boolean;
  };
  rules: {
    budget_from: number;
    budget_to: number;
    deadline_days: number;
    qty_freelancers: number;
    task_id: number;
  };
};

function TaskComponent() {
  const [task, setTask] = useState<FieldType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_TASK_URL);

        if (!response.ok) {
          setError("Ошибка при получении данных");
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setTask(data);
        console.log(data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        setError(`Ошибка при получении данных: ${error}`);
      }
    };

    getData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      {task && (
        <div>
          <Alert message={task.ok} type="success" />
        </div>
      )}
    </div>
  );
}

export default TaskComponent;
