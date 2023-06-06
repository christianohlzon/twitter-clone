export default async function Layout({
  params,
  children,
}: {
  params: { user: string };
  children: React.ReactNode;
}) {

  return (
    <div className="flex flex-row justify-center h-full">
      <p>Hi</p>
      {children}
    </div>
  );
}
