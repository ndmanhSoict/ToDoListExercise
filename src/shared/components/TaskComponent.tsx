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
      bgColr = 'bg-gray-200 opacity-70';
    } else if (dayLeft < 3) {
      //Còn lại 0 1 2
      bgColr = 'bg-red-200';
    } else if (dayLeft <= 5) {
      //Còn lại 3 4 5
      bgColr = 'bg-yellow-100';
    } else if (dayLeft <= 10) {
      //Còn lại 6 -> 10
      bgColr = 'bg-green-100';
    } else {
      bgColr = 'bg-blue-100'; //Hơn 10
    }

    const borderLine: Record<string, string> = {
      LOW: 'border-r-gray-400',
      MEDIUM: 'border-r-green-500',
      HIGH: 'border-r-yellow-500',
      HIGHEST: 'border-r-orange-500',
      URGENT: 'border-r-red-600',
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
        <h2 className="text-base font-bold break-words whitespace-normal">{task.name}</h2>
      </div>
      {openModalDetail && <ModalTaskDetail task={task}></ModalTaskDetail>}
    </TaskContext.Provider>
  );
}
