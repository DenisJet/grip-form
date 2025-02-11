import { useEffect, useState } from "react";
import { API_TASK_URL } from "../../consts";

type TaskDataType = {
  ok: string;
  task: {
    title: string;
    description: string;
    tags: string[];
    budget_from: number;
    budget_to: number;
    deadline_days: number;
    number_of_reminders: number;
    private_content: null;
    is_hard: boolean;
    all_auto_responses: boolean;
    rules: {
      budget_from: number;
      budget_to: number;
      deadline_days: number;
      qty_freelancers: number;
      task_id: number;
    };
  };
};

type UseTaskResult = {
  data: TaskDataType | null;
  isLoading: boolean;
  error: string;
};

export const useTaskData = (): UseTaskResult => {
  const [data, setData] = useState<TaskDataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_TASK_URL);

        if (!response.ok) {
          setError("Ошибка при получении данных");
          throw new Error(`status - ${response.status}`);
        }

        const data = await response.json();
        setData(data);

        const token = new URL(API_TASK_URL).searchParams.get("token");
        if (token) localStorage.setItem("token", token);
        document.cookie = `token=${token}`;
      } catch (error) {
        setError(`Ошибка при получении данных: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return { data, isLoading, error };
};
