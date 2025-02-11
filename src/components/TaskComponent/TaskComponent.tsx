import { Alert, Card, Space } from "antd";
import { useTaskData } from "../../hooks/useTaskData";

function TaskComponent() {
  const { data, isLoading, error } = useTaskData();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert message={error} type="error" />;
  }

  return (
    <div>
      {data && (
        <div>
          <Alert message={data.ok} type="success" />
          <Space direction="vertical" size={16}>
            <Card title="New Task" style={{ width: "100%" }}>
              <p>
                <span className="font-semibold">Title:</span> {data.task.title}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {data.task.description}
              </p>
              <p>
                <span className="font-semibold">Tags:</span>{" "}
                {data.task.tags.map((tag, index, arr) => (
                  <span key={tag}>
                    {tag}
                    {index === arr.length - 1 ? "." : ", "}
                  </span>
                ))}
              </p>
              <p>
                <span className="font-semibold">Budget from:</span>{" "}
                {data.task.budget_from}
              </p>
              <p>
                <span className="font-semibold">Budget to:</span>{" "}
                {data.task.budget_to}
              </p>
              <p>
                <span className="font-semibold">Deadline days:</span>{" "}
                {data.task.deadline_days}
              </p>
              <p>
                <span className="font-semibold">Number of reminders:</span>{" "}
                {data.task.number_of_reminders}
              </p>
              <p>
                <span className="font-semibold">Private content:</span>{" "}
                {`${data.task.private_content}`}
              </p>
              <p>
                <span className="font-semibold">Is hard:</span>{" "}
                {`${data.task.is_hard}`}
              </p>
              <p>
                <span className="font-semibold">All auto responses:</span>{" "}
                {`${data.task.all_auto_responses}`}
              </p>
              <Card size="small" title="Rules:" style={{ width: 300 }}>
                <p>
                  <span className="font-semibold">Budget from:</span>{" "}
                  {data.task.rules.budget_from}
                </p>
                <p>
                  <span className="font-semibold">Budget to: </span>
                  {data.task.rules.budget_to}
                </p>
                <p>
                  <span className="font-semibold">Deadline days: </span>
                  {data.task.rules.deadline_days}
                </p>
                <p>
                  <span className="font-semibold">Qty freelancers: </span>
                  {data.task.rules.qty_freelancers}
                </p>
                <p>
                  <span className="font-semibold">Task id: </span>
                  {data.task.rules.task_id}
                </p>
              </Card>
            </Card>
          </Space>
        </div>
      )}
    </div>
  );
}

export default TaskComponent;
