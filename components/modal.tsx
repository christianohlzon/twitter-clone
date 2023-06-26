export const Modal = ({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: React.ReactNode;
}) => {
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    if (target.id === "overlay") {
      closeModal();
    }
  };
  return (
    <div
      className="fixed left-0 top-0 w-full h-full bg-zinc-100/10 z-40 flex flex-row items-center justify-center"
      onClick={handleOutsideClick}
      id="overlay"
    >
      <div className="w-[500px] h-9 bg-zinc-950 rounded">{children}</div>
    </div>
  );
};
