import TopNavigation from "@/components/navigation/TopNavigation";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="applayout__container animated-gradient">
      <TopNavigation />
      <div className="applayout__content">{children}</div>
    </div>
  );
};

export default AppLayout;
