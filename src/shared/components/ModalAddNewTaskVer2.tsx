import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TodoSchema, todoSchema } from '@features/todo/schemas/todoSchema';
import { TASK_PRIORITY, TASK_STATUS } from '@shared/type/TypeTask';
import { LIST_USERS } from '@features/todo/api/todoAPI';
// import { convertDate } from '@shared/utils/TimeUtils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '@store/store';
import { addTodo, getAllTodos } from '@store/todosSlice';
import { toast } from 'react-toastify';
import { convertDate } from '@shared/utils/TimeUtils';

function ModalAddTaskVer2({ propCloseModal }: { propCloseModal: () => void }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      startDate: '',
      startTime: '00:00',
      endDate: '',
      endTime: '23:59',
    },
  });

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (data: TodoSchema) => {
    const taskToCreate = {
      ...data,
      startDate: convertDate(data.startDate, data.startTime),
      endDate: convertDate(data.endDate, data.endTime),
    };
    // console.log('Creating task:', taskToCreate);
    const { startTime: _startTime, endTime: _endTime, ...apiBody } = taskToCreate;
    dispatch(addTodo(apiBody))
      .unwrap()
      .then(() => {
        toast.success('Update success');
        dispatch(getAllTodos());
        propCloseModal();
      })
      .catch((error) => {
        toast.error('Add new task failed:', error);
      });
  };

  return (
    <Box
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-9/10 sm:w-3/5 h-fit max-h-3/4 bg-[var(--color-surface)] text-[var(--color-text)]  rounded-2xl py-3 px-4 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <Typography className="relative text-xl p-2 block text-center mb-4 font-bold">
        New Task
        <FontAwesomeIcon
          icon={faTimes}
          className="text-2xl absolute top-1/2 right-4 transform -translate-y-1/2 hover:cursor-pointer hover:text-red-500 hover:scale-110 hover:shadow-2xl transition-all"
          onClick={() => propCloseModal()}
        />
      </Typography>
      {/* //Form input data */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="flex flex-col gap-4 md:flex-row">
          <Box className="md:basis-2/3 md:grow">
            <TextField
              label="Title"
              type="text"
              {...register('name')}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
            <Typography className="text-red-500 text-sm">
              {errors.name ? errors.name.message : ' '}
            </Typography>
            <TextField
              label="Description"
              {...register('description')}
              defaultValue=""
              className="border border-gray-300 rounded-md p-2 w-full h-32"
              sx={{ mt: 2 }}
            />
            <Typography className="text-red-500 text-sm">
              {errors.description ? errors.description.message : ' '}
            </Typography>
            <TextField
              label="Assignee"
              select
              {...register('assignee')}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              {LIST_USERS.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </TextField>
            <Typography className="text-red-500 text-sm">
              {errors.assignee ? errors.assignee.message : ' '}
            </Typography>
          </Box>
          <Box className="md:basis-1/3 md:grow">
            <TextField
              select
              label="Status"
              {...register('status')}
              className="border border-gray-300 rounded-md p-2 w-full"
            >
              {TASK_STATUS.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
            <Typography className="text-red-500 text-sm">
              {errors.status ? errors.status.message : ' '}
            </Typography>
            <TextField
              select
              label="Priority"
              {...register('priority')}
              className="border border-gray-300 rounded-md p-2 w-full mt-4"
              sx={{ mt: 2 }}
            >
              {TASK_PRIORITY.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
            <Typography className="text-red-500 text-sm">
              {errors.priority ? errors.priority.message : ' '}
            </Typography>

            <Box className="flex gap-3 mt-4">
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    label="Start Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                    className="w-40"
                  />
                )}
              />

              <Controller
                control={control}
                name="startTime"
                render={({ field }) => (
                  <TimePicker
                    label="Start Time"
                    value={field.value ? dayjs(field.value, 'HH:mm') : null}
                    onChange={(time) => field.onChange(time ? time.format('HH:mm') : '')}
                    className="w-40"
                  />
                )}
              />
            </Box>
            {errors.startDate && (
              <Typography className="text-red-500 text-sm">{errors.startDate.message}</Typography>
            )}

            {/* End Date + Time */}
            <Box className="flex gap-3 mt-4">
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    label="End Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => field.onChange(date ? date.format('YYYY-MM-DD') : '')}
                    className="w-40"
                  />
                )}
              />

              <Controller
                control={control}
                name="endTime"
                render={({ field }) => (
                  <TimePicker
                    label="End Time"
                    value={field.value ? dayjs(field.value, 'HH:mm') : null}
                    onChange={(time) => field.onChange(time ? time.format('HH:mm') : '')}
                    className="w-40"
                  />
                )}
              />
            </Box>
            {errors.endDate && (
              <Typography className="text-red-500 text-sm">{errors.endDate.message}</Typography>
            )}
          </Box>
        </Box>
        <Box className="mt-4 flex justify-center">
          <Button
            // title={mutationAddNewTask.isPending ? 'Adding...' : 'Add Task'}
            className="px-6 py-4 bg-[var(--color-info)] text-white hover:bg-blue-700 shadow"
            type="submit"
          >
            Add New Task
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default ModalAddTaskVer2;
