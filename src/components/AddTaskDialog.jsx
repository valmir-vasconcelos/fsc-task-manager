import { createPortal } from "react-dom";
import Button from "./Button";
import Input from "./Input";

const AddTaskDialog = ({ isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-0 top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-xl">
      {/* DIALOG */}
      <div className="p-5 rounded-xl text-center bg-white shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">Nova Tarefa</h2>
        <p className="mt-1 text-sm text-[#9A9C9F]">
          Insira as informações abaixo
        </p>

        <div className="flex flex-col space-y-4">
          <Input />
          <Input />
          <Input />
          <div className="flex gap-3">
            <Button>Cancelar</Button>
            <Button>Salvar</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AddTaskDialog;
