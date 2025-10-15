import type { Task } from '../type/TypeTask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function ModalTaskDetail(
  { task, propOpenClose }: { task: Task; propOpenClose: () => void },
  // edit: boolean,
) {
  // const [edit, setEdit] = useState(false);
  return (
    <div className="absolute w-200 h-100 px-6 py-4 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-xl">
      <div className="flex justify-between mb-2">
        <h3>{task.status}</h3>
        <FontAwesomeIcon icon={faTimes} className="text-2xl" onClick={() => propOpenClose()} />
      </div>
      <hr></hr>
      <div className="flex">
        <div className="flex-3 bg-amber-100">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
        <div className="flex-2 bg-blue-300">
          <h5>Task created by: Nguyen Duc Manh</h5>
          <p>Creat at: {task.createdAt.toDateString()}</p>
          <p>Update at: {task.updatedAt.toDateString()}</p>
        </div>
      </div>
    </div>
  );
}
