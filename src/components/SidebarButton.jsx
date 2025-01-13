import { tv } from "tailwind-variants";

const SidebarButton = ({ children, color, href }) => {
  const sidebar = tv({
    base: "flex items-center gap-2 px-6 py-3 rounded-lg",
    variants: {
      color: {
        selected: "bg-brand-primary bg-opacity-15 text-brand-primary",
        unselected: "text-brand-dark-blue",
      },
    },
  });

  return (
    <a href={href} className={sidebar({ color })}>
      {children}
    </a>
  );
};

export default SidebarButton;
