import { WorkspaceShell } from "../../components/workspace/WorkspaceShell";
import { RSVPModuleView } from "../../components/workspace/WorkspaceModuleViews";

export default function RSVPPage() {
  return (
    <WorkspaceShell defaultModule="rsvp">
      <RSVPModuleView />
    </WorkspaceShell>
  );
}
