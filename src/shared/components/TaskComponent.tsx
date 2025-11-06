import { useState } from 'react';
import type { Task } from '@type/TypeTask';
import ModalTaskDetail from './ModalTaskDetail';
import { TaskContext } from '@shared/context/TaskContext';
import { getDayLeft } from '@shared/utils/TimeUtils';
import { queryClient } from '@main';

export default function TaskComponent({ task }: { task: Task }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  function handleOpenCloseModal(): void {
    setOpenModalDetail(!openModalDetail);
  }

  function getTaskColor(priority: string, endDateString: string): string {
    const dayLeft = getDayLeft(endDateString);

    let bgColr: string = '';

    if (dayLeft < 0) {
      bgColr = 'bg-[var(--task-overdue-bg)] opacity-70';
    } else if (dayLeft < 3) {
      //Còn lại 0 1 2
      bgColr = 'bg-[var(--task-soon-bg)]';
    } else if (dayLeft <= 5) {
      //Còn lại 3 4 5
      bgColr = 'bg-[var(--task-medium-bg)]';
    } else if (dayLeft <= 10) {
      //Còn lại 6 -> 10
      bgColr = 'bg-[var(--task-safe-bg)]';
    } else {
      bgColr = 'bg-[var(--task-long-bg)]'; //Hơn 10
    }

    const borderLine: Record<string, string> = {
      LOW: 'border-r-[var(--task-border-low)]',
      MEDIUM: 'border-r-[var(--task-border-medium)]',
      HIGH: 'border-r-[var(--task-border-high)]',
      HIGHEST: 'border-r-[var(--task-border-highest)]',
      URGENT: 'border-r-[var(--task-border-urgent)]',
    };

    return `${bgColr} border-r-8 ${borderLine[priority]}`;
  }
  return (
    <TaskContext.Provider value={{ handleOpenCloseModal }}>
      <div
        className={`border p-2 mb-4 rounded w-48 block mx-auto ${getTaskColor(task.priority, task.endDate)} hover:shadow-xl hover:scale-102 transition-all`}
        // className={`border p-2 mb-4 rounded  shadow w-48 block mx-auto`}
        draggable={true}
        onDragStart={() => {
          console.log(task);
          queryClient.setQueryData(['taskDragging'], JSON.stringify(task));
        }}
        onDrag={() => queryClient.setQueryData(['onDrag'], true)}
        onDragEnd={() => queryClient.setQueryData(['onDrag'], false)}
        onClick={() => handleOpenCloseModal()}
      >
        <h2 className="text-base font-bold break-words whitespace-normal text-[var(--color-text)]">
          {task.name}
        </h2>
      </div>
      {openModalDetail && <ModalTaskDetail task={task}></ModalTaskDetail>}
    </TaskContext.Provider>
  );
}
