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

  async function callAPIGetTodos() {
    const todos = await getTodosApi();
    console.log('api được load lại');
    return todos;
  }

  const { data: todos, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: callAPIGetTodos,
    staleTime: 60000, // 1 phút
  });

  if (isSuccess && todos) {
    todos.forEach((task: Task) => {
      allTasks[task.status].push(task);
    });
  }

  // function callDropEvent(taskid: string, fromColumn: TaskStatus, toColumn: TaskStatus): void {
  //   if (fromColumn === toColumn) return;
  //   const task = allTasks[fromColumn].find((t) => t.id === taskid);
  //   if (task) {
  //     setAllTasks((prev) => ({
  //       ...prev,
  //       [fromColumn]: prev[fromColumn].filter((t) => t.id !== taskid),
  //       [toColumn]: [...prev[toColumn], { ...task, status: toColumn }],
  //     }));
  //   }
  // }

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
