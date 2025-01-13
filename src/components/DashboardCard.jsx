const DashboardCard = ({ icon, mainText, secondaryText }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[150px] gap-1 rounded-[10px] bg-brand-white">
      <div className="flex items-center gap-2">
        <div className="text-brand-primary">{icon}</div>
        <p className="text-2xl font-semibold text-brand-dark-blue">
          {mainText}
        </p>
      </div>
      {secondaryText}
    </div>
  );
};

export default DashboardCard;
