import type { Task } from '@type/TypeTask';
import TaskComponent from './TaskComponent';
import type { TaskStatus } from '@type/TypeTask';
import { useMutation } from '@tanstack/react-query';
import { updateTodoApi } from '@features/todo/api/todoAPI';
import { queryClient } from '@main';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';

export default function ColumnTask({
  header,
  count,
  proptaskList,
  // onDropEvent,
}: {
  header: TaskStatus;
  count: number;
  proptaskList: Task[];
  // onDropEvent: (taskId: string, fromColumn: TaskStatus, toColumn: TaskStatus) => void;
}) {
  const mutationDropTask = useMutation({
    mutationFn: async (newPayloadAPI: Omit<Task, 'createdById' | 'createdAt' | 'updatedAt'>) => {
      return await updateTodoApi(newPayloadAPI);
    },
    onSuccess: () => {
      console.log('Cập nhật trạng thái task thành công');
      queryClient.refetchQueries({ queryKey: ['todos'], exact: true });
    },
    onError: (error) => {
      const err = error as AxiosError<{ error?: string }>;
      if (err.request) {
        toast.error(err.response?.data?.error);
      }
    },
  });

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData('task'));
        // console.log('Đã thả phần tử:', data, 'vào cột', header);
        const {
          createdById: _createdById,
          createdAt: _createdAt,
          updatedAt: _updatedAt,
          ...payloadAPI
        } = data;
        const newPayloadAPI = { ...payloadAPI, status: header };
        mutationDropTask.mutate(newPayloadAPI);
      }}
      className="flex flex-col flex-shrink-0 w-52 bg-white shadow m-4 rounded p-1 h-fit hover:bg-gray-50"
    >
      <div className="flex justify-between items-center px-2 mb-4">
        <h2 className="font-bold text-base">{header}</h2>
        <p className="text-sm text-gray-500">
          {count < 2 ? (count < 1 ? null : `${count} task`) : `${count} tasks`}
        </p>
      </div>
      {count > 0 ? (
        proptaskList.map((task) => <TaskComponent key={task.id} task={task} />)
      ) : (
        <p className="text-gray-500 italic text-center mb-4">No task in this status</p>
      )}
    </div>
  );
}
