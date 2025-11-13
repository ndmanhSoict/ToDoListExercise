import { useState } from 'react';
import type { Task } from '@type/TypeTask';
import ModalTaskDetail from '@shared/components/ModalTaskDetail';
import { TaskContext } from '@shared/context/TaskContext';
import { getDayLeft } from '@shared/utils/TimeUtils';
import { queryClient } from '@main';
import {
  useHover,
  useFloating,
  useInteractions,
  safePolygon,
  shift,
  flip,
  offset,
} from '@floating-ui/react';
import { getTaskColor } from '@shared/utils/ColorTaskUtils';

export default function TaskComponent({ task }: { task: Task }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [isOpenFloating, setIsOpenFloating] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    placement: 'right-end',
    middleware: [flip(), shift(), offset(10)],
    open: isOpenFloating,
    onOpenChange: setIsOpenFloating,
  });
  const dayLeft = getDayLeft(task.endDate);

  const hover = useHover(context, {
    delay: { open: 0, close: 0 },
    handleClose: safePolygon({
      requireIntent: false,
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  function handleOpenCloseModal(): void {
    setOpenModalDetail(!openModalDetail);
  }

  return (
    <TaskContext.Provider value={{ handleOpenCloseModal }}>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
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

      {isOpenFloating && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 bg-[var(--color-bg)] p-2 rounded shadow text-[var(--color-text)]"
        >
          {dayLeft === 0 ? (
            <>
              <strong>Today</strong> is the deadline for this task
            </>
          ) : dayLeft < 0 ? (
            <>This task is overdue.</>
          ) : (
            <>
              <strong>{dayLeft}</strong> {dayLeft === 1 ? 'day ' : 'days '}
              left until this task's deadline
            </>
          )}
        </div>
      )}

      {openModalDetail && <ModalTaskDetail task={task}></ModalTaskDetail>}
    </TaskContext.Provider>
  );
}
