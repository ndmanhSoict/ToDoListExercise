import ColumnTask from '@shared/components/ColumnTask';
import type { Task } from '@shared/type/TypeTask';
import type { TaskStatus } from '@shared/type/TypeTask';
import { deleteTodoApi, getAllTodosApi } from '../api/todoAPI';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAmountDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMemo, useState } from 'react';
import IconTrashCan from '@assets/icons/trash-can.svg?react';
import IconOpenTrashCan from '@assets/icons/open-trash-can.svg?react';
import ModalAddTask from '@shared/components/ModalAddNewTask';
import { queryClient } from '@main';
import { toast } from 'react-toastify';
import IconFilter from '@assets/icons/filter.svg?react';

//Declare const variable
const SORTBY_OPTIONS = [
  { value: 'created-asc', label: 'Creation Date (Oldest to Newest)' },
  { value: 'created-desc', label: 'Creation Date (Newest to Oldest)' },
  { value: 'endDate-asc', label: 'End Date (Earliest to Latest)' },
  { value: 'endDate-desc', label: 'End Date (Latest to Earliest)' },
  { value: 'priority-asc', label: 'Priority (Low to High)' },
  { value: 'priority-desc', label: 'Priority (High to Low)' },
  { value: 'name-asc', label: 'Name (A to Z)' },
  { value: 'name-desc', label: 'Name (Z to A)' },
];
const SHOW_TASK_OPTIONS = [
  { value: 'all', label: 'All Tasks' },
  { value: 'ongoing', label: 'Ongoing Tasks' },
  { value: 'upcoming', label: 'Upcoming Tasks' },
  { value: 'history', label: 'History Tasks' },
];
const PRIORITY_RANK: Record<string, number> = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  HIGHEST: 4,
  URGENT: 5,
};

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

export default function ToDoPage() {
  //Devlare State
  const [sortBy, setSortBy] = useState(SORTBY_OPTIONS[0].value);
  const [showTask, setShowTask] = useState(SHOW_TASK_OPTIONS[0].value);
  const [isDragOver, setIsDragOver] = useState(false);
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  //Declare variable use data from queryClient
  const { data: todos, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodosApi,
    staleTime: 60000, // 1 phút
  });
  const { data: onDrag } = useQuery({
    queryKey: ['onDrag'],
    queryFn: () => queryClient.getQueryData(['onDrag']),
  });

  //Declare mutation
  const mutationDeleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      return await deleteTodoApi(taskId);
    },
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.refetchQueries({ queryKey: ['todos'], exact: true });
    },
    onError: (error) => {
      toast.error('Error deleting task: ' + error.message + '. Please try again.');
    },
  });

  //Declare function
  //get data todos from cache
  const allTasks = useMemo(() => {
    const taskByStatus = createEmptyTaskMap();
    if (isSuccess && todos) {
      todos.forEach((task: Task) => {
        taskByStatus[task.status].push(task);
      });
    }
    return taskByStatus;
  }, [todos, isSuccess]);
  //sort, show todos based on the selected value
  const showTasks = useMemo(() => {
    const [sortField, sortType] = sortBy.split('-');
    const filterTask = createEmptyTaskMap();
    (Object.keys(allTasks) as TaskStatus[]).forEach((status) => {
      filterTask[status] = allTasks[status].filter((task) => {
        const start = new Date(task.startDate).getTime();
        const end = new Date(task.endDate).getTime();
        const now = Date.now();
        switch (showTask) {
          case SHOW_TASK_OPTIONS[0].value:
            return true;
          case SHOW_TASK_OPTIONS[1].value:
            return start <= now && now <= end;
          case SHOW_TASK_OPTIONS[2].value:
            return start > now;
          case SHOW_TASK_OPTIONS[3].value:
            return end < now;
          default:
            return;
        }
      });
      filterTask[status].sort((a: Task, b: Task) => {
        //Declare some type functions
        const sortTime = (a: string, b: string) => {
          if (sortType === 'asc') return new Date(a).getTime() - new Date(b).getTime();
          return new Date(b).getTime() - new Date(a).getTime();
        };
        const sortStr = (a: string, b: string) => {
          if (sortType === 'asc') return a.localeCompare(b);
          return b.localeCompare(a);
        };
        const sortPriority = (a: string, b: string) => {
          if (sortType === 'asc') return PRIORITY_RANK[a] - PRIORITY_RANK[b];
          return PRIORITY_RANK[b] - PRIORITY_RANK[a];
        };
        switch (sortField) {
          case 'created':
            return sortTime(a.createdAt, b.createdAt);
          case 'endDate':
            return sortTime(a.endDate, b.endDate);
          case 'priority':
            return sortPriority(a.priority, b.priority);
          case 'name':
            return sortStr(a.name, b.name);
          default:
            return 0;
        }
      });
    });
    return filterTask;
  }, [sortBy, showTask, allTasks]);

  //Declare funtion used in this component
  function CloseModal() {
    setOpenModalAddNewTask(false);
  }
  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }
  function handleDragLeave(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  }
  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    event.stopPropagation();
    const cached = queryClient.getQueryData(['taskDragging']);
    if (!cached || typeof cached !== 'string') {
      toast.error('Your request is not valid. Please try again!');
      return;
    }
    const data = JSON.parse(cached);
    // console.log('data được lấy ra:', data, 'id được ghi nhận là: ', data.id);
    setIsDragOver(false);
    mutationDeleteTask.mutate(data.id);
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)]">
      {/* Button Add new Task, Select sort, select show mode, icon filter */}
      <div className="h-fit w-fit mt-2 mx-auto flex gap-6 z-10">
        {/* Button Add new Task */}
        <button
          className="rounded-2xl bg-gray-100 shadow-xl px-4 py-2 hover:scale-110 hover:bg-gray-200 hover:shadow-2xl duration-200 transition-all"
          onClick={() => setOpenModalAddNewTask(!openModalAddNewTask)}
        >
          + Add New Task
        </button>
        {/* Select sort */}
        <div className="rounded-2xl bg-white px-4 py-2 hidden sm:block">
          <FontAwesomeIcon icon={faSortAmountDown} color="black" />
          <label>Sort by: </label>
          <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            {SORTBY_OPTIONS.map((obj) => (
              <option value={obj.value}>{obj.label}</option>
            ))}
          </select>
        </div>
        {/* Select show mode */}
        <div className="rounded-2xl bg-white px-4 py-2 hidden md:block">
          <label>Show: </label>
          <select defaultValue={showTask} onChange={(e) => setShowTask(e.target.value)}>
            {SHOW_TASK_OPTIONS.map((obj) => (
              <option value={obj.value}>{obj.label}</option>
            ))}
          </select>
        </div>
        {/* Icon filter */}
        <div className="relative bg-white rounded-full w-12 h-12 hover:cursor-pointer md:hidden hover:bg-gray-300/500 hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <IconFilter
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            onClick={() => setOpenFilter(true)}
          />
          {/* Open Filter Modal */}
          <div
            className={`fixed top-0 right-0 w-screen h-screen bg-gray-300/40 ${openFilter ? 'block' : 'hidden'}`}
            onClick={() => setOpenFilter(false)}
          >
            <div
              className="absolute h-fit w-fit min-w-2/5 max-w-3/4 right-0 bg-white top-1/4 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 p-4 rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="self-end text-2xl text-end hover:cursor-pointer hover:text-red-500 hover:scale-110 hover:shadow-2xl transition-all"
                onClick={() => setOpenFilter(false)}
              />
              <div className="flex justify-between sm:hidden items-center">
                <label>Sort by: </label>
                <select
                  className="max-w-[75%] truncate"
                  defaultValue={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {SORTBY_OPTIONS.map((obj) => (
                    <option value={obj.value}>{obj.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label>Show: </label>
                <select defaultValue={showTask} onChange={(e) => setShowTask(e.target.value)}>
                  {SHOW_TASK_OPTIONS.map((obj) => (
                    <option value={obj.value}>{obj.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render Task Columns here */}
      <div className="w-full flex-1 flex overflow-x-auto p-4 justify-center flex-wrap">
        {(Object.keys(showTasks) as TaskStatus[]).map((key) => {
          return (
            <ColumnTask
              key={key}
              header={key}
              count={showTasks[key].length}
              proptaskList={showTasks[key]}
            />
          );
        })}
      </div>

      {/* //Display trash can */}
      <div
        className={`w-28 h-28 rounded-full absolute right-4 bottom-4 ${isDragOver ? 'bg-red-200/80' : ''}`}
        onDragOver={(e) => handleDragOver(e)}
        onDragLeave={(e) => handleDragLeave(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 ${isDragOver ? '' : 'bg-white/75'} rounded-full pointer-events-none`}
        >
          {isDragOver ? (
            <IconOpenTrashCan className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-15 h-15 text-red-600 pointer-events-none" />
          ) : (
            <IconTrashCan
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-gray-600 hover:scale-120 transition-all duration-200 ${onDrag ? 'scale-120' : ''} pointer-events-none`}
            />
          )}
        </div>
      </div>
      {openModalAddNewTask && <ModalAddTask propCloseModal={CloseModal} />}
    </div>
  );
}
