import type { Task } from '@type/TypeTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { TaskContext } from '@shared/context/TaskContext';
import ButtonBasic from './ButtonBasic';

export default function ModalTaskDetail(
  { task }: { task: Task },
  // edit: boolean,
) {
  const [edit, setEdit] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  // const [openModalAddNewTask, setOpenModalAddNewTask] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const getContext = useContext(TaskContext);
  function checkEditting(): boolean {
    return !(task.title === title && task.description === description);
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
  return (
    <div
      className="w-full h-screen absolute top-0 left-0 bg-gray-200/45"
      onClick={() => closeModalTaskDetail()}
    >
      <div
        className="absolute w-200 h-100 px-6 py-4 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between mb-2 items-center">
          <h3 className="text-xl">{task.status}</h3>
          <FontAwesomeIcon
            icon={faTimes}
            className="text-2xl"
            onClick={() => closeModalTaskDetail()}
          />
        </div>
        <hr className="mb-4"></hr>
        <div className="flex gap-2">
          <div className="flex-2 border-r-2 border-gray-300 pr-4">
            <div className="relative text-2xl">
              <input
                className="w-full text-inherit !leading-none border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md"
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
            <div className="flex justify-start gap-3 my-4 [&>*]:text-black [&>*]:border-1 [&>*]:border-black/40 [&>*]:rounded-sm [&>*]:p-2 [&>*]:hover:bg-gray-300/25">
              <ButtonBasic title="Add"></ButtonBasic>
              <ButtonBasic title="Date"></ButtonBasic>
              <ButtonBasic title="Work"></ButtonBasic>
              <ButtonBasic title="Member"></ButtonBasic>
            </div>
            <span className="text-sm">Description</span>
            <div className="flex mt-2">
              <div className="flex-3 w-full">
                {edit ? (
                  <textarea
                    className="block w-full h-full border-2 border-gray-500/5 hover:border-gray-500/50 rounded-md !leading-none p-2"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></textarea>
                ) : (
                  <p className="block w-full h-full p-2">{description}</p>
                )}
              </div>
              <div className="flex-1 flex flex-col items-end pr-3 gap-3 [&>*]:text-black [&>*]:border-1 [&>*]:border-black/40 [&>*]:rounded-sm [&>*]:p-2 [&>*]:hover:bg-gray-300/25">
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
                ></ButtonBasic>
                <ButtonBasic title="Save"></ButtonBasic>
                <ButtonBasic
                  title="Reset"
                  onClick={() => {
                    setEdit(false);
                    setDescription(task.description);
                    setTitle(task.title);
                  }}
                ></ButtonBasic>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 px-2 pt-1 items-start justify-end">
            <h5 className="pt-0 mt-0">Task created by: Nguyen Duc Manh</h5>
            <p>Creat at: {task.createdAt.toDateString()}</p>
            <p>Update at: {task.updatedAt.toDateString()}</p>
          </div>
        </div>
      </div>
      {openModalConfirm && (
        <ModalConfirmClose propOpenModalConfirm={handleOpenModalConfirm}></ModalConfirmClose>
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
