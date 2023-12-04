const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="applayout__container animated-gradient">
      <div className="applayout__content">{children}</div>
    </div>
  );
};

export default AppLayout;
