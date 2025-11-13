import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ButtonBasic from './ButtonBasic';
import { useMutation } from '@tanstack/react-query';
import { createNewTodoApi } from '@features/todo/api/todoAPI';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TodoSchema, todoSchema } from '@features/todo/schemas/todoSchema';
import { queryClient } from '@main';
import { toast } from 'react-toastify';
import type { AxiosError } from 'axios';
import { createPortal } from 'react-dom';
import { TASK_PRIORITY, TASK_STATUS } from '@shared/type/TypeTask';
import { LIST_USERS } from '@features/todo/api/todoAPI';
import { convertDate } from '@shared/utils/TimeUtils';

const modalRoot = document.getElementById('modal-root') as HTMLElement;

function ModalAddTask({ propCloseModal }: { propCloseModal: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
  });

  const mutationAddNewTask = useMutation({
    mutationFn: async (newTask: TodoSchema) => {
      const taskToCreate = {
        ...newTask,
        startDate: convertDate(newTask.startDate, newTask.startTime),
        endDate: convertDate(newTask.endDate, newTask.endTime),
      };
      // console.log('Creating task:', taskToCreate);
      const { startTime: _startTime, endTime: _endTime, ...apiBody } = taskToCreate;
      return await createNewTodoApi(apiBody);
    },
    onSuccess: () => {
      toast.success('New task created successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      propCloseModal();
    },
    onError: (error) => {
      const err = error as AxiosError<{ error?: string }>;
      if (err.request) {
        toast.error(err.response?.data?.error);
      }
    },
  });

  const onSubmit = (data: TodoSchema) => {
    mutationAddNewTask.mutate(data);
  };

  const modalContent = (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-gray-300/40"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {/* //Main content */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/10 sm:w-3/5 h-fit max-h-3/4 bg-[var(--color-surface)] text-[var(--color-text)]  rounded-2xl py-3 px-4 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="relative text-xl p-2 block text-center mb-4 font-bold">
          New Task
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl absolute top-1/2 right-4 transform -translate-y-1/2 hover:cursor-pointer hover:text-red-500 hover:scale-110 hover:shadow-2xl transition-all"
            onClick={() => propCloseModal()}
          />
        </p>
        <hr className="my-4 mb-2" />
        {/* //Form input data */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="md:basis-2/3 md:grow">
              <label className="block">Title:</label>
              <input
                type="text"
                {...register('name')}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <pre className="text-red-500 text-sm">{errors.name ? errors.name.message : ' '}</pre>
              <label className="block">Description:</label>
              <textarea
                {...register('description')}
                defaultValue=""
                className="border border-gray-300 rounded-md p-2 w-full h-32"
              ></textarea>
              <pre className="text-red-500 text-sm">
                {errors.description ? errors.description.message : ' '}
              </pre>
              <label className="block">Assignee:</label>
              <select
                {...register('assignee')}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="" disabled selected hidden>
                  -- Select Assignee --
                </option>
                {LIST_USERS.map((user) => (
                  <option value={user}>{user}</option>
                ))}
              </select>
              <pre className="text-red-500 text-sm">
                {errors.assignee ? errors.assignee.message : ' '}
              </pre>
            </div>
            <div className="md:basis-1/3 md:grow">
              <label className="block">Status:</label>
              <select
                {...register('status')}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="" disabled selected hidden>
                  -- Select Status --
                </option>
                {TASK_STATUS.map((status) => (
                  <option value={status}>{status}</option>
                ))}
              </select>
              <pre className="text-red-500 text-sm">
                {errors.status ? errors.status.message : ' '}
              </pre>
              <label className="block">Priority:</label>
              <select
                {...register('priority')}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="" disabled selected hidden>
                  -- Select Priority --
                </option>
                {TASK_PRIORITY.map((priority) => (
                  <option value={priority}>{priority}</option>
                ))}
              </select>
              <pre className="text-red-500 text-sm">
                {errors.priority ? errors.priority.message : ' '}
              </pre>
              <label className="block">Start date :</label>
              <div className="flex gap-4 flex-col md:flex-row sm:flex-row">
                <input
                  {...register('startDate')}
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  {...register('startTime')}
                  type="time"
                  defaultValue={'00:00'}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <pre className="text-red-500 text-sm">
                {errors.startDate ? errors.startDate.message : ' '}
              </pre>
              <label className="mt-1 block">End date :</label>
              <div className="flex gap-4 flex-col md:flex-row sm:flex-row">
                <input
                  {...register('endDate')}
                  type="date"
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                <input
                  {...register('endTime')}
                  type="time"
                  defaultValue={'23:59'}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <pre className="text-red-500 text-sm">
                {errors.endDate ? errors.endDate.message : ' '}
              </pre>
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <ButtonBasic
              title={mutationAddNewTask.isPending ? 'Adding...' : 'Add Task'}
              className="px-6 py-4 bg-[var(--color-info)] text-white hover:bg-blue-700 shadow"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
  return createPortal(modalContent, modalRoot);
}

export default ModalAddTask;
