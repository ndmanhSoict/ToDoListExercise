import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ColumnTaskVer2 from '@shared/components/ColumnTaskVer2';
import ModalAddTaskVer2 from '@shared/components/ModalAddNewTaskVer2';
import type { Task, TaskStatus } from '@shared/type/TypeTask';
import { type AppDispatch, type RootState } from '@store/store';
import { getAllTodos, setTodos } from '@store/todosSlice';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const createEmptyTaskMap = (): Record<TaskStatus, Task[]> => {
  return {
    TODO: [],
    IN_PROGRESS: [],
    IN_REVIEW: [],
    IN_DEPLOYMENT: [],
    IN_TESTING: [],
    DONE: [],
  };
};

function ToDoPageVer2() {
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: todos } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    dispatch(getAllTodos());
    return () => {
      dispatch(setTodos([]));
    };
  }, [dispatch]);

  const allTasks = useMemo(() => {
    const taskByStatus = createEmptyTaskMap();
    if (todos) {
      todos.forEach((task: Task) => {
        taskByStatus[task.status].push(task);
      });
    }
    return taskByStatus;
  }, [todos]);

  return (
    <>
      <Box>
        <Button variant="contained" onClick={() => setOpenModalAddNewTask(true)}>
          + Add new task
        </Button>
      </Box>
      <Box className="w-full flex-1 flex overflow-x-auto p-4 justify-center flex-wrap">
        {(Object.keys(allTasks) as TaskStatus[]).map((key) => {
          return (
            <ColumnTaskVer2
              key={key}
              header={key}
              count={allTasks[key].length}
              proptaskList={allTasks[key]}
            />
          );
        })}
      </Box>
      <Modal open={openModalAddNewTask}>
        <ModalAddTaskVer2 propCloseModal={() => setOpenModalAddNewTask(false)}></ModalAddTaskVer2>
      </Modal>
    </>
  );
}
export default ToDoPageVer2;
