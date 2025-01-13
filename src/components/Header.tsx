import { useState } from "react";
import {
    AddIcon,
    TrashIcon,
} from "../assets/icons";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";

const Header = ({ title, subtitle }) => {

    const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false);

    return <div className="flex w-full justify-between">
        <div>
            <span className="text-xs font-semibold text-brand-primary">
                {subtitle}
            </span>
            <h2 className="text-xl font-semibold">{title}</h2>
        </div>

        <div className="flex items-center gap-3">
            <Button color="ghost">
                Limpar tarefas <TrashIcon />
            </Button>
            <Button onClick={() => setAddTaskDialogIsOpen(true)} color="primary">
                Nova tarefa <AddIcon />
            </Button>
            <AddTaskDialog
                isOpen={addTaskDialogIsOpen}
                handleClose={() => setAddTaskDialogIsOpen(false)}
            />
        </div>
    </div>

}

export default Header;