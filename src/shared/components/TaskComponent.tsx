import { useState } from 'react';
import type { Task } from '@type/TypeTask';
import ModalTaskDetail from './ModalTaskDetail';
import { TaskContext } from '@shared/context/TaskContext';
import getDayLeft from '@shared/utils/getDayLeft';

export default function TaskComponent({ task }: { task: Task }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  function handleOpenCloseModal(): void {
    setOpenModalDetail(!openModalDetail);
  }

  function getTaskColor(priority: string, endDateString: string): string {
    const dayLeft = getDayLeft(endDateString);

    let bgColr: string = '';

    if (dayLeft < 0) {
      bgColr = 'bg-gray-200';
    } else if (dayLeft < 3) {
      bgColr = 'bg-red-200';
    } else if (dayLeft <= 5) {
      bgColr = 'bg-yellow-100';
    } else if (dayLeft <= 7) {
      bgColr = 'bg-blue-100';
    } else {
      bgColr = 'bg-white';
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
        onDragStart={(e) => {
          e.dataTransfer.setData('task', JSON.stringify(task));
        }}
        onClick={() => handleOpenCloseModal()}
      >
        <h2 className="text-base font-bold break-words whitespace-normal">{task.name}</h2>
        {/* <p className="text-sm text-gray-500">Created at: {task.createdAt.toDateString()}</p>
      <p className="text-sm text-gray-500">Updated at: {task.updatedAt.toDateString()}</p> */}
      </div>
      {openModalDetail && <ModalTaskDetail task={task}></ModalTaskDetail>}
    </TaskContext.Provider>
  );
}
