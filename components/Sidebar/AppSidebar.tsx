import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "../ui/sidebar";

const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>Sidebar Header</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        Sidebar Group
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>Sidebar Footer</SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
