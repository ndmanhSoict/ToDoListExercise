import type { Task } from '@type/TypeTask';
import { getTaskColor } from '@shared/utils/ColorTaskUtils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Modal from '@mui/material/Modal';
import ModalTaskDetailVer2 from './ModalTaskDetailVer2';

export default function TaskComponentVer2({ task }: { task: Task }) {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  function handleOpenModal() {
    setOpenModalDetail(true);
  }
  function handleCloseModal() {
    setOpenModalDetail(false);
  }
  return (
    <>
      <Card
        className={`border px-2 mb-4 rounded w-48 block mx-auto ${getTaskColor(task.priority, task.endDate)} hover:shadow-xl hover:scale-102 transition-all`}
        draggable={true}
        onDragStart={(e) => {
          console.log(task);
          e.dataTransfer.setData('task', JSON.stringify(task));
        }}
        onClick={handleOpenModal}
      >
        <CardContent>
          <Typography className="text-base font-bold break-words whitespace-normal text-[var(--color-text)]">
            {task.name}
          </Typography>
        </CardContent>
      </Card>

      <Modal open={openModalDetail} onClose={handleCloseModal}>
        <ModalTaskDetailVer2 task={task} propHandleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
}
