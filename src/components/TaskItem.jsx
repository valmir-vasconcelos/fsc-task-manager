import { useState } from "react";
import { toast } from "sonner";
import CheckIcon from "../assets/icons/check.svg?react";
import DetailsIcon from "../assets/icons/details.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Button from "./Button";

const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error("Erro ao deletar a tarefa");
    }
    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  };

  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary text-brand-primary";
    } else if (task.status === "in_progress") {
      return "bg-brand-process text-brand-process";
    } else if (task.status === "not_started") {
      return "bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue";
    }
  };

  return (
    <div
      className={`flex justify-between items-center gap-2 bg-opacity-10 rounded-lg px-4 py-3 transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleCheckboxClick(task.id)}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-process" />
          ) : (
            <TrashIcon className="text-brand-text-gray" />
          )}
        </Button>
        <a href="#" className="transition hover:opacity-75">
          <DetailsIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;
