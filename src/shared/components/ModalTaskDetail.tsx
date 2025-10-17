import type { Task } from '../type/TypeTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import ButtonBasic from './ButtonBasic';

export default function ModalTaskDetail(
  { task, propOpenClose }: { task: Task; propOpenClose: () => void },
  // edit: boolean,
) {
  const [edit, setEdit] = useState(true);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const getContext = useContext(TaskContext);
  function checkEditting(): boolean {
    return !(task.title === title && task.description === description);
  }
  function handleOpenModalConfirm() {
    setOpenModalConfirm(!openModalConfirm);
  }
  return (
    <div
      className="w-full h-screen absolute top-0 left-0 bg-gray-200/45"
      onClick={() => propOpenClose()}
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
            onClick={() => {
              if (checkEditting()) {
                setOpenModalConfirm(true);
              } else {
                getContext?.handleOpenCloseModal();
              }
            }}
          />
        </div>
        <hr className="mb-4"></hr>
        <div className="flex">
          <div className="flex-3 ">
            <div className="relative text-2xl">
              <input
                className="boder-none w-full text-inherit !leading-none"
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
                  <input
                    className="w-full"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  ></input>
                ) : (
                  <p>{description}</p>
                )}
              </div>
              <div className="flex-1 flex flex-col items-end pr-3 gap-3 [&>*]:text-black [&>*]:border-1 [&>*]:border-black/40 [&>*]:rounded-sm [&>*]:p-2 [&>*]:hover:bg-gray-300/25">
                <ButtonBasic title="Edit" onClick={() => setEdit(!edit)}></ButtonBasic>
                <ButtonBasic
                  title="Delete"
                  className="hover:!bg-red-600 hover:!text-white"
                ></ButtonBasic>
                <ButtonBasic title="Save"></ButtonBasic>
                <ButtonBasic title="Reset"></ButtonBasic>
              </div>
            </div>
          </div>
          <div className="flex-2 bg-blue-300">
            <h5>Task created by: Nguyen Duc Manh</h5>
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-36 bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Do you want to close this, changes will be not saved</p>
        <button className="bg-green-400/40" onClick={() => propOpenModalConfirm()}>
          No
        </button>
        <button className="bg-red-400/40" onClick={() => getContext?.handleOpenCloseModal()}>
          Yes
        </button>
      </div>
    </div>
  );
}
