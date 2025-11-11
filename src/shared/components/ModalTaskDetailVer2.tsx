import type { Task } from '@type/TypeTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { TASK_PRIORITY, TASK_STATUS } from '@shared/type/TypeTask';
import { formatDate, formatTime, convertDate } from '@shared/utils/TimeUtils';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@store/store';
import { deleteTodo, getAllTodos, updateTodo } from '@store/todosSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { LIST_USERS } from '@features/todo/api/todoAPI';

export default function ModalTaskDetailVer2({
  task,
  propHandleCloseModal,
}: {
  task: Task;
  propHandleCloseModal: () => void;
}) {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [assignee, setAssignee] = useState(task.assignee);
  const [startDate, setStartDate] = useState(formatDate(task.startDate));
  const [startTime, setStartTime] = useState(formatTime(task.startDate));
  const [endDate, setEndDate] = useState(formatDate(task.endDate));
  const [endTime, setEndTime] = useState(formatTime(task.endDate));
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogDelete, setOpenDialogDelete] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  //Declare funtion in this component
  function checkEditting(): boolean {
    const getStartDateConverted = convertDate(startDate, startTime);
    const getEndDateConverted = convertDate(endDate, endTime);
    return !(
      task.name === title &&
      task.description === description &&
      task.status === status &&
      task.priority === priority &&
      task.assignee === assignee &&
      task.startDate === getStartDateConverted &&
      task.endDate === getEndDateConverted
    );
  }

  function handleSave() {
    if (title === '') {
      toast.error('Task name is required');
      return;
    }
    if (convertDate(startDate, startTime) >= convertDate(endDate, endTime)) {
      toast.error('Time is invalid');
      return;
    }
    const {
      createdById: _createdById,
      createdAt: _createdAt,
      updatedAt: _updatedAt,
      ...rest
    } = task;
    const updatePayload = {
      ...rest,
      name: title,
      description: description,
      status: status,
      priority: priority,
      assignee: assignee,
      startDate: convertDate(startDate, startTime),
      endDate: convertDate(endDate, endTime),
    };
    dispatch(updateTodo(updatePayload))
      .unwrap()
      .then(() => {
        toast.success('Update success');
        dispatch(getAllTodos());
        propHandleCloseModal();
      })
      .catch((error) => {
        toast.error('Update failed:', error);
      });
  }

  function handleDelete() {
    console.log('delete here');
    dispatch(deleteTodo(task.id))
      .unwrap()
      .then(() => {
        toast.success('Delete success');
        dispatch(getAllTodos());
        propHandleCloseModal();
      })
      .catch((error) => {
        toast.error('Delete failed:', error);
      });
  }

  function handleReset() {
    setEdit(false);
    setDescription(task.description);
    setTitle(task.name);
    setStatus(task.status);
    setPriority(task.priority);
    setAssignee(task.assignee);
    setStartDate(formatDate(task.startDate));
    setStartTime(formatTime(task.startDate));
    setEndDate(formatDate(task.endDate));
    setEndTime(formatTime(task.endDate));
  }

  function handleCloseModal() {
    if (checkEditting()) {
      // console.log("đang edit")
      setOpenDialog(true);
    } else propHandleCloseModal();
  }

  return (
    <>
      <Box className="absolute w-3/4 md:w-3/5 h-fit max-h-3/4 px-6 py-4 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-[var(--color-surface)] text-[var(--color-text)] rounded-xl flex flex-col overflow-y-auto">
        <Box className="flex justify-between mb-2 items-center">
          <Typography className="tex-xl">{task.status}</Typography>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl hover:cursor-pointer hover:text-red-500 hover:scale-110 hover:shadow-2xl transition-all"
            onClick={handleCloseModal}
          />
        </Box>
        {/* <Divider></Divider> */}
        <Box className="flex-1 flex gap-2 flex-col md:flex-row">
          <Box className="flex-3 md:border-r-2 border-gray-300 md:pr-4 flex flex-col">
            <Box className="relative text-2xl">
              <TextField
                className="w-full text-inherit pr-8 !leading-none border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md"
                value={title}
                label="Task Name"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="absolute top-1/2 right-0.5 transform -translate-y-1/2 leading-none"
              />
            </Box>
            <Stack spacing={2} direction="row">
              {checkEditting() ? (
                <Button variant="outlined" className="bg-gray-400/50 !cursor-not-allowed">
                  Editting...
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => {
                    if (!checkEditting()) setEdit(!edit);
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                variant="outlined"
                className="hover:!bg-red-600 hover:!text-white"
                onClick={() => setOpenDialogDelete(true)}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                disabled={!checkEditting()}
                className={
                  !checkEditting()
                    ? 'bg-gray-400/50 !cursor-not-allowed disabled:hover:bg-gray-400/50'
                    : ''
                }
                onClick={() => handleSave()}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                disabled={!checkEditting()}
                className={
                  !checkEditting()
                    ? 'bg-gray-400/50 !cursor-not-allowed disabled:hover:bg-gray-400/50'
                    : ''
                }
                onClick={() => handleReset()}
              >
                Reset
              </Button>
            </Stack>
            <Typography>Description</Typography>
            {edit || checkEditting() ? (
              <TextField
                className="block w-full !min-h-[100px] flex-1 border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md !leading-none p-2"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></TextField>
            ) : (
              <Typography className="block w-full !min-h-[100px] flex-1 p-2 !font-[inherit]">
                {description}
              </Typography>
            )}
          </Box>
          <Box
            className={`flex-2 flex flex-col gap-2 px-2 pt-1 items-start ${edit || checkEditting() ? 'justify-between' : 'justify-evenly gap-8'}`}
          >
            {edit || checkEditting() ? (
              <>
                <TextField
                  select
                  label="Status"
                  defaultValue={status}
                  className="border border-gray-300 rounded-md w-full"
                  onChange={(e) => setStatus(e.target.value as Task['status'])}
                >
                  {TASK_STATUS.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              <Typography>Status: {task.status}</Typography>
            )}
            {edit || checkEditting() ? (
              <>
                <TextField
                  select
                  label="Priority"
                  defaultValue={priority}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  onChange={(e) => setStatus(e.target.value as Task['priority'])}
                >
                  {TASK_PRIORITY.map((priority) => (
                    <MenuItem key={priority} value={priority}>
                      {priority}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              <Typography>Priority: {task.priority}</Typography>
            )}
            {edit || checkEditting() ? (
              <>
                <TextField
                  select
                  label="Assignee"
                  defaultValue={assignee}
                  className="border border-gray-300 rounded-md p-2 w-full"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {LIST_USERS.map((user) => (
                    <MenuItem key={user} value={user}>
                      {user}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              <Typography>Assignee: {task.assignee}</Typography>
            )}
            {edit || checkEditting() ? (
              <Stack direction="row" className="w-full justify-between">
                <DatePicker
                  label="Start Date"
                  defaultValue={dayjs(task.startDate)}
                  className="w-40"
                  onChange={(newValue) => {
                    setStartDate(newValue ? newValue.format('YYYY-MM-DD') : '');
                  }}
                />
                <TimePicker
                  label="Start Time"
                  className="w-40"
                  defaultValue={dayjs(task.startDate)}
                  onChange={(newValue) => {
                    setStartTime(newValue ? newValue.format('HH:mm') : '');
                  }}
                />
              </Stack>
            ) : (
              <Typography>
                Start date: {startTime.slice(0, 5)} {startDate}
              </Typography>
            )}
            {edit || checkEditting() ? (
              <Stack direction="row" className="w-full justify-between">
                <DatePicker
                  label="End Date"
                  defaultValue={dayjs(task.endDate)}
                  className="w-40"
                  onChange={(newValue) => {
                    console.log('giá trị mới: ', newValue);
                    setEndDate(newValue ? newValue.format('YYYY-MM-DD') : '');
                    console.log('enđate: ', endDate);
                  }}
                />
                <TimePicker
                  label="End Time"
                  className="w-40"
                  defaultValue={dayjs(task.endDate)}
                  onChange={(newValue) => {
                    setEndTime(newValue ? newValue.format('HH:mm') : '');
                    console.log(endTime);
                  }}
                />
              </Stack>
            ) : (
              <Typography>
                End date: {endTime.slice(0, 5)} {endDate}
              </Typography>
            )}
            <Typography className="pt-0 mt-0">Task created by: Nguyen Duc Manh</Typography>
            <Typography>
              Created at: {formatTime(task.createdAt).slice(0, 5)} {formatDate(task.createdAt)}
            </Typography>
            <Typography>
              Updated at:Created at: {formatTime(task.updatedAt).slice(0, 5)}{' '}
              {formatDate(task.updatedAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Do you want to close this task modal'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you close this task modal, changes will not saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>NO</Button>
          <Button onClick={propHandleCloseModal} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialogDelete}
        onClose={() => setOpenDialogDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Do you want to delete this task modal'}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialogDelete(false)}>NO</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
