import type { Task } from '@type/TypeTask';
import TaskComponentVer2 from '@shared/components/TaskComponentVer2';
import type { TaskStatus } from '@type/TypeTask';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@store/store';
import { getAllTodos, updateTodo } from '@store/todosSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    const data = JSON.parse(e.dataTransfer.getData('task'));
    // console.log('Đã thả phần tử:', data, 'vào cột', header);
    const {
      createdById: _createdById,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...payloadAPI
    } = data;
    const newPayloadAPI = { ...payloadAPI, status: header };
    dispatch(updateTodo(newPayloadAPI))
      .unwrap()
      .then(() => {
        dispatch(getAllTodos());
      })
      .catch((error) => {
        toast.error('Update failed:', error);
      });
  }
  // const { data: todos, loading, error } = useSelector((state: RootState) => state.todos);
  // console.log(todos)

  return (
    <>
      <Box
        className="flex flex-col flex-shrink-0 w-52 bg-[var(--color-bg)] shadow m-4 rounded p-1 h-fit hover:bg-[var(--color-surface-hover)]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleOnDrop(e)}
      >
        <Box className="flex justify-between items-center px-2 mb-4 text-[var(--color-text)]">
          <Typography className="font-bold text-base">{header}</Typography>
          <Typography className="text-sm">
            {count < 2 ? (count < 1 ? null : `${count} task`) : `${count} tasks`}
          </Typography>
        </Box>
        {count > 0 ? (
          proptaskList.map((task) => <TaskComponentVer2 key={task.id} task={task} />)
        ) : (
          <Typography className="text-[var(--color-text)] italic text-center mb-4">
            No task in this status
          </Typography>
        )}
      </Box>
    </>
  );
}
