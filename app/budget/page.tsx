import { WorkspaceShell } from "../../components/workspace/WorkspaceShell";
import { BudgetModuleView } from "../../components/workspace/WorkspaceModuleViews";

export default function BudgetPage() {
  return (
    <WorkspaceShell defaultModule="budget">
      <BudgetModuleView />
    </WorkspaceShell>
  );
}
