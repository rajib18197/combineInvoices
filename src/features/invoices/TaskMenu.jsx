import TaskItem from "./TaskItem";
import { useGetAllTaskMenuQuery } from "./taskListApi";

export default function TaskMenu({ projectId }) {
  const { data: taskMenu, isLoading } = useGetAllTaskMenuQuery(projectId);

  if (isLoading) return <h2>Loading</h2>;

  return (
    <ul className="flex flex-col gap-2">
      {taskMenu.map((task) => (
        <TaskItem task={task} key={task.id} projectId={projectId} />
      ))}
    </ul>
  );
}
