import ColumnTask from '../../../shared/components/ColumnTask';
import { useEffect, useState } from 'react';
import { fakeTaskList } from '../../../fakeTastList';
import type { Task } from '../../../shared/type/TypeTask';

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

  console.log(allTasks);
  return (
    <div className="w-full h-screen flex overflow-x-auto p-4">
      {Object.keys(allTasks).map((key) => {
        const statusKey = key as keyof TaskState;
        return (
          <ColumnTask
            key={String(key)}
            header={key}
            count={allTasks[statusKey].length}
            proptaskList={allTasks[statusKey]}
          />
        );
      })}
    </div>
  );
}
