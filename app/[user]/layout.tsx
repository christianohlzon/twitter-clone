import { Topbar } from "twitter/components/topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Topbar title="Home" showGoBackButton={true} />
      {children}
    </div>
  );
}
