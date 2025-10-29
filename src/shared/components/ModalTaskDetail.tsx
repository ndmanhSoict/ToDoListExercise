import type { Task } from '@type/TypeTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { TaskContext } from '@shared/context/TaskContext';
import ButtonBasic from './ButtonBasic';
import { useMutation } from '@tanstack/react-query';
import { deleteTodoApi, updateTodoApi } from '@features/todo/api/todoAPI';
import { queryClient } from '@main';
import { toast } from 'react-toastify';

export default function ModalTaskDetail(
  { task }: { task: Task },
  // edit: boolean,
) {
  const [edit, setEdit] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [title, setTitle] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const getContext = useContext(TaskContext);
  function checkEditting(): boolean {
    return !(task.name === title && task.description === description);
  }
  function closeModalTaskDetail() {
    if (checkEditting()) {
      setOpenModalConfirm(true);
    } else {
      getContext?.handleOpenCloseModal();
    }
  }
  function handleOpenModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
  }

  const mutationSaveEdit = useMutation({
    mutationFn: async (task: Task) => {
      const {
        createdById: _createdById,
        createdAt: _createdAt,
        updatedAt: _updatedAt,
        ...rest
      } = task;
      const updatePayload = { ...rest, name: title, description: description };
      console.log('Updating task with payload:', updatePayload);
      return await updateTodoApi(updatePayload);
    },
    onSuccess: () => {
      toast.success('Task updated successfully');
      queryClient.refetchQueries({ queryKey: ['todos'], exact: true });
      getContext?.handleOpenCloseModal();
    },
  });

  const mutationDeleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      return await deleteTodoApi(taskId);
    },
    onSuccess: () => {
      toast.success('Task deleted successfully');
      queryClient.refetchQueries({ queryKey: ['todos'], exact: true });
      getContext?.handleOpenCloseModal();
    },
    onError: (error) => {
      toast.error('Error deleting task: ' + error.message + '. Please try again.');
    },
  });

  return (
    <div
      className="w-full h-screen absolute top-0 left-0 bg-gray-200/45"
      onClick={() => closeModalTaskDetail()}
    >
      <div
        className="absolute w-216 h-100 px-6 py-4 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-xl">{task.status}</h3>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl hover:cursor-pointer hover:text-red-500 hover:scale-110 hover:shadow-2xl transition-all"
            onClick={() => closeModalTaskDetail()}
          />
        </div>
        <hr className="mb-4"></hr>
        <div className="flex-1 flex gap-2 ">
          <div className="flex-2 border-r-2 border-gray-300 pr-4 flex flex-col">
            <div className="relative text-2xl">
              <input
                className="w-full text-inherit pr-8 !leading-none border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              ></input>
              <FontAwesomeIcon
                icon={faPencilAlt}
                className="absolute top-1/2 right-0.5 transform -translate-y-1/2 leading-none"
              />
            </div>
            <div className="flex justify-start gap-8 my-4 [&>*]:text-black [&>*]:border-1 [&>*]:border-black/40 [&>*]:rounded-sm [&>*]:p-2 [&>*]:hover:bg-gray-300/25">
              {checkEditting() ? (
                <ButtonBasic
                  title="Editting..."
                  className="bg-gray-400/50 !cursor-not-allowed"
                ></ButtonBasic>
              ) : (
                <ButtonBasic
                  title="Edit"
                  onClick={() => {
                    if (!checkEditting()) setEdit(!edit);
                  }}
                ></ButtonBasic>
              )}
              <ButtonBasic
                title="Delete"
                className="hover:!bg-red-600 hover:!text-white"
                onClick={() => setConfirmDelete(true)}
              ></ButtonBasic>
              <ButtonBasic
                title="Save"
                disabled={!checkEditting()}
                className={
                  !checkEditting()
                    ? 'bg-gray-400/50 !cursor-not-allowed disabled:hover:bg-gray-400/50'
                    : ''
                }
                onClick={() => mutationSaveEdit.mutate(task)}
              ></ButtonBasic>
              <ButtonBasic
                title="Reset"
                disabled={!checkEditting()}
                className={
                  !checkEditting()
                    ? 'bg-gray-400/50 !cursor-not-allowed disabled:hover:bg-gray-400/50'
                    : ''
                }
                onClick={() => {
                  setEdit(false);
                  setDescription(task.description);
                  setTitle(task.name);
                }}
              ></ButtonBasic>
            </div>
            <span className="text-sm">Description</span>

            {edit || checkEditting() ? (
              <textarea
                className="block w-full flex-1 border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md !leading-none p-2"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
            ) : (
              <pre className="block w-full flex-1 p-2 !font-[inherit]">{description}</pre>
            )}
          </div>

          <div className="flex-1 flex flex-col gap-2 px-2 pt-1 items-start justify-end">
            <h5 className="pt-0 mt-0">Task created by: Nguyen Duc Manh</h5>
            <p>
              Creat at:{' '}
              {new Date(task.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              {new Date(task.createdAt).toDateString()}
            </p>
            <p>
              Update at:{' '}
              {new Date(task.updatedAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}{' '}
              {new Date(task.updatedAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
      {openModalConfirm && (
        <ModalConfirmClose propOpenModalConfirm={handleOpenModalConfirm}></ModalConfirmClose>
      )}
      {confirmDelete && (
        <ModalConfirmDelete
          TaskID={task.id}
          propHandleDelete={mutationDeleteTask.mutate}
          propSetConfirmDelete={setConfirmDelete}
        ></ModalConfirmDelete>
      )}
    </div>
  );
}

function ModalConfirmClose({ propOpenModalConfirm }: { propOpenModalConfirm: () => void }) {
  const getContext = useContext(TaskContext);
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-gray-300/40"
      onClick={(e) => {
        propOpenModalConfirm();
        e.stopPropagation();
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-white  rounded-2xl py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xl p-2 block text-center mb-4">
          Do you want to close this, changes will be not saved ?
        </p>
        <div className="flex justify-evenly [&>*]:px-6 [&>*]:py-2 [&>*]:rounded-md">
          <ButtonBasic
            title="No"
            className="bg-green-400"
            onClick={() => propOpenModalConfirm()}
          ></ButtonBasic>
          <ButtonBasic
            title="Yes"
            className="bg-red-400"
            onClick={() => getContext?.handleOpenCloseModal()}
          ></ButtonBasic>
        </div>
      </div>
    </div>
  );
}

function ModalConfirmDelete({
  TaskID,
  propHandleDelete,
  propSetConfirmDelete,
}: {
  TaskID: string;
  propHandleDelete: (id: string) => void;
  propSetConfirmDelete: (value: boolean) => void;
}) {
  return (
    <div
      className="absolute top-0 left-0 w-screen h-screen bg-gray-300/40"
      onClick={(e) => {
        e.stopPropagation();
        propSetConfirmDelete(false);
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-white  rounded-2xl py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xl p-2 block text-center mb-4">Do you want to delete this task ?</p>
        <div className="flex justify-evenly [&>*]:px-6 [&>*]:py-2 [&>*]:rounded-md">
          <ButtonBasic
            title="No"
            className="bg-green-400"
            onClick={() => propSetConfirmDelete(false)}
          ></ButtonBasic>
          <ButtonBasic
            title="Yes"
            className="bg-red-400"
            onClick={() => propHandleDelete(TaskID)}
          ></ButtonBasic>
        </div>
      </div>
    </div>
  );
}
