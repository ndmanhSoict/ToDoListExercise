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

function ModalAddTask({ propCloseModal }: { propCloseModal: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
  });

  function convertDate(date: string, time: string): string {
    return new Date(`${date}T${time}:00`).toISOString();
  }
  const mutationAddNewTask = useMutation({
    mutationFn: async (newTask: TodoSchema) => {
      const taskToCreate = {
        ...newTask,
        startDate: convertDate(newTask.startDate, newTask.startTime),
        endDate: convertDate(newTask.endDate, newTask.endTime),
      };
      console.log('Creating task:', taskToCreate);
      const { startTime: _startTime, endTime: _endTime, ...apiBody } = taskToCreate;
      return await createNewTodoApi(apiBody);
    },
    onSuccess: () => {
      console.log('New task created successfully');
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      propCloseModal();
    },
    onError: (error) => {
      toast.error('Error creating new task: ' + error.message + '. Please try again.');
    },
  });
  const onSubmit = (data: TodoSchema) => {
    mutationAddNewTask.mutate(data);
  };
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-gray-300/40"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-200 h-fit bg-white  rounded-2xl py-3 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="relative text-xl p-2 block text-center mb-4 font-bold">
          New Task
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl absolute top-1/2 right-4 transform -translate-y-1/2 hover:cursor-pointer"
            onClick={() => propCloseModal()}
          />
        </p>
        <hr className="my-4 mb-2" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-4">
            <div className="basis-2/3 grow">
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
                <option value={'Nguyen Duc Manh'}>Nguyen Duc Manh</option>
                <option value={'Le Anh Tuan'}>Le Anh Tuan</option>
                <option value={'Pham Huy Hoang'}>Pham Huy Hoang</option>
                <option value={'Nguyen Van Nam'}>Nguyen Van Nam</option>
                <option value={'Tran Thi Tra Dang'}>Tran Thi Tra Dang</option>
              </select>
              <pre className="text-red-500 text-sm">
                {errors.assignee ? errors.assignee.message : ' '}
              </pre>
            </div>
            <div className="basis-1/3 grow">
              <label className="block">Status:</label>
              <select
                {...register('status')}
                className="border border-gray-300 rounded-md p-2 w-full"
              >
                <option value="" disabled selected hidden>
                  -- Select Status --
                </option>
                <option value={'TODO'}>TODO</option>
                <option value={'IN_PROGRESS'}>IN_PROGRESS</option>
                <option value={'IN_REVIEW'}>IN_REVIEW</option>
                <option value={'IN_DEPLOYMENT'}>IN_DEPLOYMENT</option>
                <option value={'IN_TESTING'}>IN_TESTING</option>
                <option value={'DONE'}>DONE</option>
                <option value={'CREATED'}>CREATED</option>
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
                <option value={'LOW'}>LOW</option>
                <option value={'MEDIUM'}>MEDIUM</option>
                <option value={'HIGH'}>HIGH</option>
                <option value={'HIGHEST'}>HIGHEST</option>
                <option value={'URGENT'}>URGENT</option>
              </select>
              <pre className="text-red-500 text-sm">
                {errors.priority ? errors.priority.message : ' '}
              </pre>
              <label className="block">Start date :</label>
              <div className="flex gap-4">
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
              <div className="flex gap-4">
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
              className="px-6 py-4 bg-blue-500 text-white hover:bg-blue-700 shadow"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAddTask;
