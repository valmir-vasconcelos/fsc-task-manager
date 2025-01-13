import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  ChevronRightIcon,
  ArrowLeftIcon,
  TrashIcon,
  LoaderIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import TimeSelect from "../components/TimeSelect";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useUpdateTask } from "../hooks/data/use-update-task";
import { useDeleteTask } from "../hooks/data/use-delete-task";
import { useGetTask } from "../hooks/data/use-get-task";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: mutateUpdateTask, isPending: updateTaskIsLoading } =
    useUpdateTask(taskId);

  const { mutate: mutateDeleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTask(taskId);

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  const handleSaveClick = async (data) => {
    mutateUpdateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa atualizada com sucesso");
      },
      onError: () => toast.error("Ocorreu um erro ao salvar a tarefa"),
    });
  };

  const handleDeleteClick = async () => {
    mutateDeleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso");
        navigate(-1);
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa"),
    });
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex justify-between w-full">
          <div>
            <button
              onClick={() => navigate(-1)}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <Link to="/" className="text-brand-text-gray cursor-pointer">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon /> Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rouded-xl bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                {...register("title", {
                  required: "O título é obrigatório",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título não pode ser vazio";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register("time", {
                  required: "O horário é obrigatório",
                })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id="description"
                label="Descrição"
                {...register("description", {
                  required: "A descrição é obrigatória",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode ser vazia";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="flex justify-end w-full gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className="animate-spin" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
