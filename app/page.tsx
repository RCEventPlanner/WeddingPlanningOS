import { WorkspaceShell } from "../components/workspace/WorkspaceShell";
import { DashboardModuleView } from "../components/workspace/WorkspaceModuleViews";

export default function Home() {
  return (
    <WorkspaceShell defaultModule="dashboard">
      <DashboardModuleView />
    </WorkspaceShell>
  );
}