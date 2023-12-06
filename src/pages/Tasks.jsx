import { useParams } from "react-router-dom";
import TaskTable from "../features/invoices/TaskTable";
import MarkAsPaid from "../features/tasks/MarkAsPaid";
import Button from "../ui/Button";

export default function Tasks() {
  const { id } = useParams();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button to={`/invoices/${id}`}>Back to details</Button>
      </div>
      <TaskTable />
      <div className="self-end">
        <MarkAsPaid />
      </div>
    </div>
  );
}
