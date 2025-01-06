import SidebarButton from "./SidebarButton";

const Sidebar = () => {
  return (
    <div className="h-screen bg-white w-64">
      <div className="px-8 py-6 space-y-4">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>.
        </p>
      </div>
      <div className="flex flex-col p-2 gap-2">
        <SidebarButton variant="unselected">Início</SidebarButton>
        <SidebarButton variant="selected">Minhas Tarefas</SidebarButton>
      </div>
    </div>
  );
};

export default Sidebar;
