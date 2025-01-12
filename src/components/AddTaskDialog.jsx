import PropTypes from "prop-types";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";
import "./AddTaskDialog.css";
import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";
import { toast } from "sonner";
import { LoaderIcon } from "../assets/icons";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddTaskDialog = ({ isOpen, handleClose }) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: "addTask",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    },
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: { title: "", time: "morning", description: "" },
  });

  const nodeRef = useRef();

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      description: data.description.trim(),
      time: data.time.trim(),
      status: "not_started",
    };

    mutate(task, {
      onSuccess: () => {
        queryClient.setQueryData("tasks", (currentTasks) => {
          return [...currentTasks, task];
        });
        toast.success("Tarefa adicionada com sucesso");
        handleClose();
        reset({ title: "", time: "morning", description: "" });
      },
      onError: () => toast.error("Erro ao adicionar tarefa"),
    });
  };

  const handleCancelClick = () => {
    reset({ title: "", time: "morning", description: "" });
    handleClose();
  };

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 top-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-xl"
          >
            {/* DIALOG */}
            <div className="p-5 rounded-xl text-center bg-white shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mt-1 mb-4 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register("title", {
                    required: "O título é obrigatório",
                    validate: (value) => {
                      if (value.trim()) return true;
                      else return "O título não pode ser vazio";
                    },
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register("time", {
                    required: "O horário é obrigatório",
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register("description", {
                    required: "A descrição é obrigatória",
                    validate: (value) => {
                      if (value.trim()) return true;
                      else return "O descrição não pode ser vazia";
                    },
                  })}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <LoaderIcon className="animate-spin" />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
};

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default AddTaskDialog;
