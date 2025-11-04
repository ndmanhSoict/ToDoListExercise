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

export default function ToDoPage() {
  const [sortBy, setSortBy] = useState('created-asc');
  const [showTask, setShowTask] = useState('all');
  const [isDragOver, setIsDragOver] = useState(false);
  const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);

  function CloseModal() {
    setOpenModalAddNewTask(false);
  }

  const { data: todos, isSuccess } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodosApi,
    staleTime: 60000, // 1 phút
  });

  const { data: onDrag } = useQuery({
    queryKey: ['onDrag'],
    queryFn: () => queryClient.getQueryData(['onDrag']),
  });

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

  const allTasks = useMemo(() => {
    const taskByStatus: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      IN_DEPLOYMENT: [],
      IN_TESTING: [],
      DONE: [],
    };
    if (isSuccess && todos) {
      todos.forEach((task: Task) => {
        taskByStatus[task.status].push(task);
      });
    }
    return taskByStatus;
  }, [todos, isSuccess]);

  const showTasks = useMemo(() => {
    const [sortField, sortType] = sortBy.split('-');
    const filterTask: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      IN_REVIEW: [],
      IN_DEPLOYMENT: [],
      IN_TESTING: [],
      DONE: [],
    };
    (Object.keys(allTasks) as TaskStatus[]).forEach((status) => {
      filterTask[status] = allTasks[status].filter((task) => {
        const start = new Date(task.startDate).getTime();
        const end = new Date(task.endDate).getTime();
        const now = Date.now();
        if (showTask === 'all') return true;
        if (showTask === 'ongoing') return start <= now && now <= end;
        if (showTask === 'upcoming') return start > now;
        if (showTask === 'history') return end < now;
      });
      filterTask[status].sort((a: Task, b: Task) => {
        const sortTime = (a: string, b: string) => {
          if (sortType === 'asc') return new Date(a).getTime() - new Date(b).getTime();
          return new Date(b).getTime() - new Date(a).getTime();
        };
        const sortStr = (a: string, b: string) => {
          if (sortType === 'asc') return a.localeCompare(b);
          return b.localeCompare(a);
        };
        const sortPriority = (a: string, b: string) => {
          const PRIORITY_RANK: Record<string, number> = {
            LOW: 1,
            MEDIUM: 2,
            HIGH: 3,
            HIGHEST: 4,
            URGENT: 5,
          };

          if (sortType === 'asc') return PRIORITY_RANK[a] - PRIORITY_RANK[b];
          return PRIORITY_RANK[b] - PRIORITY_RANK[a];
        };
        if (sortField === 'created') return sortTime(a.createdAt, b.createdAt);
        if (sortField === 'endDate') return sortTime(a.endDate, b.endDate);
        if (sortField === 'priority') return sortPriority(a.priority, b.priority);
        if (sortField === 'name') return sortStr(a.name, b.name);
        return 0;
      });
    });
    return filterTask;
  }, [sortBy, showTask, allTasks]);

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)]">
      <div className="h-fit w-fit mt-2 mx-auto flex gap-6 z-1000">
        <button
          className="rounded-2xl bg-gray-100 shadow-xl px-4 py-2 hover:scale-110 hover:bg-gray-200 hover:shadow-2xl duration-200 transition-all"
          onClick={() => setOpenModalAddNewTask(!openModalAddNewTask)}
        >
          + Add New Task
        </button>
        <div className="rounded-2xl bg-white px-4 py-2 hidden sm:block">
          <FontAwesomeIcon icon={faSortAmountDown} color="black" />
          <label>Sort by: </label>
          <select defaultValue={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="created-asc">Creation Date (Oldest to Newest)</option>
            <option value="created-desc">Creation Date (Newest to Oldest)</option>
            <option value="endDate-asc">End Date (Earliest to Latest)</option>
            <option value="endDate-desc">End Date (Latest to Earliest)</option>
            <option value="priority-asc">Priority (Low to High)</option>
            <option value="priority-desc">Priority (High to Low)</option>
            <option value="name-asc">Name (A to Z)</option>
            <option value="name-desc">Name (Z to A)</option>
          </select>
        </div>
        <div className="rounded-2xl bg-white px-4 py-2 hidden md:block">
          <label>Show: </label>
          <select defaultValue={showTask} onChange={(e) => setShowTask(e.target.value)}>
            <option value="all">All Tasks</option>
            <option value="ongoing">Ongoing Tasks</option>
            <option value="upcoming">Upcoming Tasks</option>
            <option value="history">History Tasks</option>
          </select>
        </div>
        <div className="relative bg-white rounded-full w-12 h-12 hover:cursor-pointer md:hidden hover:bg-gray-300/500 hover:scale-110 hover:shadow-2xl transition-all duration-500">
          <IconFilter
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10"
            onClick={() => setOpenFilter(true)}
          />
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
                  <option value="created-asc">Creation Date (Oldest to Newest)</option>
                  <option value="created-desc">Creation Date (Newest to Oldest)</option>
                  <option value="endDate-asc">End Date (Earliest to Latest)</option>
                  <option value="endDate-desc">End Date (Latest to Earliest)</option>
                  <option value="priority-asc">Priority (Low to High)</option>
                  <option value="priority-desc">Priority (High to Low)</option>
                  <option value="name-asc">Name (A to Z)</option>
                  <option value="name-desc">Name (Z to A)</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label>Show: </label>
                <select defaultValue={showTask} onChange={(e) => setShowTask(e.target.value)}>
                  <option value="all">All Tasks</option>
                  <option value="ongoing">Ongoing Tasks</option>
                  <option value="upcoming">Upcoming Tasks</option>
                  <option value="history">History Tasks</option>
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
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDragOver(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const data = JSON.parse(queryClient.getQueryData(['taskDragging']) ?? '');
          console.log('data được lấy ra:', data, 'id được ghi nhận là: ', data.id);
          setIsDragOver(false);
          mutationDeleteTask.mutate(data.id);
        }}
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
