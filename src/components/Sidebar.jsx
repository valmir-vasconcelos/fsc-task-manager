import HomeIcon from "../assets/icons/home.svg?react";
import TaskIcon from "../assets/icons/tasks.svg?react";
import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white w-72">
      <div className="px-8 py-6 space-y-4">
        <h1 className="text-xl font-semibold text-brand-primary">
          Task Manager
        </h1>
        <p>
          Um simples{" "}
          <span className="text-brand-primary">organizador de tarefas</span>.
        </p>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <SidebarButton color="unselected">
          <HomeIcon />
          Início
        </SidebarButton>
        <SidebarButton color="selected">
          <TaskIcon />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
