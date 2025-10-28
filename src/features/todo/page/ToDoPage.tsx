import ColumnTask from '@shared/components/ColumnTask';
import type { Task } from '@shared/type/TypeTask';
import type { TaskStatus } from '@shared/type/TypeTask';
import { getTodosApi } from '../api/todoAPI';
import { useQuery } from '@tanstack/react-query';

export default function ToDoPage() {
  const allTasks: Record<TaskStatus, Task[]> = {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    IN_DEPLOYMENT: [],
    IN_TESTING: [],
    DONE: [],
  };

  const { data: todos, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodosApi,
    staleTime: 60000, // 1 phút
  });

  if (isSuccess && todos) {
    todos.forEach((task: Task) => {
      allTasks[task.status].push(task);
    });
  }

  return (
    <div className="w-full h-[calc(100vh-4.5rem)] flex overflow-x-auto p-4">
      {(Object.keys(allTasks) as TaskStatus[]).map((key) => {
        const statusKey = key; // statusKey: TaskStatus
        return (
          <ColumnTask
            key={statusKey}
            header={statusKey}
            count={allTasks[statusKey].length}
            proptaskList={allTasks[statusKey]}
          />
        );
      })}
    </div>
  );
}
