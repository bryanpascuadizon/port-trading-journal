import { Separator } from "../ui/separator";
import { Sidebar } from "../ui/sidebar";
import SidePanelBody from "./SidePanelBody";
import SidePanelHeader from "./SidePanelHeader";

const SidePanel = () => {
  return (
    <Sidebar className="p-5 side-panel border-r-gray-300">
      <SidePanelHeader />
      <Separator className="separator" />
      <SidePanelBody />
    </Sidebar>
  );
};

export default SidePanel;
