import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import ButtonBasic from './ButtonBasic';

function ModalAddTask({ status, propCloseModal }: { status: string; propCloseModal: () => void }) {
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
        <div className="flex gap-4">
          <div className="basis-2/3 grow">
            <label className="mt-4 mb-2 block">Title:</label>
            <input type="text" className="border border-gray-300 rounded-md p-2 w-full" />
            <label className="mt-4 mb-2 block">Description:</label>
            <textarea className="border border-gray-300 rounded-md p-2 w-full h-32"></textarea>
            <label className="mt-4 mb-2 block">Assignee:</label>
            <select className="border border-gray-300 rounded-md p-2 w-full">
              <option value={1}>Nguyen Duc Manh</option>
              <option value={2}>Le Anh Tuan</option>
              <option value={3}>Pham Huy Hoang</option>
              <option value={4}>Nguyen Van Nam</option>
              <option value={5}>Tran Thi Tra Dang</option>
            </select>
          </div>
          <div className="basis-1/3 grow">
            <label className="mt-4 mb-2 block">Status:</label>
            <select className="border border-gray-300 rounded-md p-2 w-full" value={status}>
              <option value={'TODO'}>TODO</option>
              <option value={'IN_PROGRESS'}>IN_PROGRESS</option>
              <option value={'IN_REVIEW'}>IN_REVIEW</option>
              <option value={'IN_DEPLOYMENT'}>IN_DEPLOYMENT</option>
              <option value={'IN_TESTING'}>IN_TESTING</option>
              <option value={'DONE'}>DONE</option>
              <option value={'CREATED'}>CREATED</option>
            </select>
            <label className="mt-4 mb-2 block">Priority:</label>
            <select className="border border-gray-300 rounded-md p-2 w-full">
              <option value={'Low'}>Low</option>
              <option value={'Medium'}>Medium</option>
              <option value={'High'}>High</option>
              <option value={'URGENT'}>URGENT</option>
            </select>
            <label className="mt-4 mb-2 block">Start date :</label>
            <div className="flex gap-4">
              <input type="date" className="border border-gray-300 rounded-md p-2 w-full" />
              <input type="time" className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
            <label className="mt-4 mb-2 block">End date :</label>
            <div className="flex gap-4">
              <input type="date" className="border border-gray-300 rounded-md p-2 w-full" />
              <input type="time" className="border border-gray-300 rounded-md p-2 w-full" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <ButtonBasic
            title="Add New Task"
            className="px-4 py-4 bg-blue-500 text-white hover:bg-blue-700 shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default ModalAddTask;
