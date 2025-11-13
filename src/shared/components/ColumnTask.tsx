import type { Task } from '@type/TypeTask';
import type { TaskStatus } from '@type/TypeTask';
import { queryClient } from '@main';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@store/store';
import { getAllTodos, updateTodo } from '@store/todosSlice';
import TaskComponent from '@shared/components/TaskComponent';

export default function ColumnTask({
  header,
  count,
  proptaskList,
}: {
  header: TaskStatus;
  count: number;
  proptaskList: Task[];
}) {
  const dispatch = useDispatch<AppDispatch>();

  function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const data = JSON.parse(queryClient.getQueryData(['taskDragging']) ?? '');
    // console.log('Đã thả phần tử:', data, 'vào cột', header);
    const {
      createdById: _createdById,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...payloadAPI
    } = data;
    const newPayloadAPI = { ...payloadAPI, status: header };
    // mutationDropTask.mutate(newPayloadAPI);
    dispatch(updateTodo(newPayloadAPI))
      .unwrap() // unwrap giúp lấy giá trị trả về của promise nếu thành công
      .then(() => {
        dispatch(getAllTodos()); // Gọi lại danh sách todos
      })
      .catch((error) => {
        toast.error('Cập nhật thất bại:', error);
      });
  }

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => handleOnDrop(e)}
      className="flex flex-col flex-shrink-0 w-52 bg-[var(--color-bg)] shadow m-4 rounded p-1 h-fit hover:bg-[var(--color-surface-hover)]"
    >
      <div className="flex justify-between items-center px-2 mb-4 text-[var(--color-text)]">
        <h2 className="font-bold text-base">{header}</h2>
        <p className="text-sm">
          {count < 2 ? (count < 1 ? null : `${count} task`) : `${count} tasks`}
        </p>
      </div>
      {count > 0 ? (
        proptaskList.map((task) => <TaskComponent key={task.id} task={task} />)
      ) : (
        <p className="text-[var(--color-text)] italic text-center mb-4">No task in this status</p>
      )}
    </div>
  );
}
