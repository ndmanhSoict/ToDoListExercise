import ColumnTask from '@shared/components/ColumnTask';
import { useEffect, useState } from 'react';
import { fakeTaskList } from '@fakeTastList';
import type { Task } from '@shared/type/TypeTask';
import type { TaskStatus } from '@shared/type/TypeTask';

type TaskState = {
  CREATED: Task[];
  TODO: Task[];
  IN_PROGRESS: Task[];
  IN_REVIEW: Task[];
  DEPLOY: Task[];
  IN_TESTING: Task[];
  VERIFY: Task[];
  DONE: Task[];
};

export default function ToDoPage() {
  const [allTasks, setAllTasks] = useState<TaskState>({
    CREATED: [],
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    DEPLOY: [],
    IN_TESTING: [],
    VERIFY: [],
    DONE: [],
  });
  useEffect(() => {
    const grouped: TaskState = {
      CREATED: [],
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      DEPLOY: [],
      IN_TESTING: [],
      VERIFY: [],
      DONE: [],
    };

    fakeTaskList.forEach((task) => {
      grouped[task.status].push(task);
    });

    setAllTasks(grouped);
  }, []);

  function callDropEvent(taskid: string, fromColumn: TaskStatus, toColumn: TaskStatus): void {
    if (fromColumn === toColumn) return;
    const task = allTasks[fromColumn].find((t) => t.id === taskid);
    if (task) {
      setAllTasks((prev) => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter((t) => t.id !== taskid),
        [toColumn]: [...prev[toColumn], { ...task, status: toColumn }],
      }));
    }
  }

  // console.log(allTasks);
  return (
    <div className="w-full h-[calc(100vh-4.5rem)] flex overflow-x-auto p-4">
      {Object.keys(allTasks).map((key) => {
        const statusKey = key as keyof TaskState;
        return (
          <ColumnTask
            key={String(key)}
            header={statusKey}
            count={allTasks[statusKey].length}
            proptaskList={allTasks[statusKey]}
            onDropEvent={callDropEvent}
          />
        );
      })}
    </div>
  );
}
