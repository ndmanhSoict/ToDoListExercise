import type { Task } from '../type/TypeTask';
import type { TaskStatus } from '../type/TypeTask';
export default function TaskComponent({
  task,
  fromColumn,
}: {
  task: Task;
  fromColumn: TaskStatus;
}) {
  return (
    <div
      className="border p-4 mb-4 rounded bg-white shadow w-56 block mx-auto"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData('id', task.id);
        e.dataTransfer.setData('fromColumn', fromColumn);
      }}
    >
      <h2 className="text-xl font-bold">{task.title}</h2>
      {/* <p className="text-sm text-gray-500">Created at: {task.createdAt.toDateString()}</p>
      <p className="text-sm text-gray-500">Updated at: {task.updatedAt.toDateString()}</p> */}
    </div>
  );
}
