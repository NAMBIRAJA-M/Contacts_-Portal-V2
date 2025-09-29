import type { JSX } from "react";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

export interface SidebarItem {
  icon: JSX.Element;
  label: string;
}

export const sidebarItems: SidebarItem[] = [
  { icon: <SpaceDashboardIcon />, label: "Dashboard" },
  { icon: <PeopleOutlineOutlinedIcon />, label: "Contacts" },
  { icon: <MenuBookOutlinedIcon />, label: "Management" },
  { icon: <PeopleOutlineOutlinedIcon />, label: "Customer Management" },
  { icon: <AssessmentOutlinedIcon />, label: "Reports and Analytics" },
  { icon: <SettingsApplicationsOutlinedIcon />, label: "Settings" },
  { icon: <AdminPanelSettingsOutlinedIcon />, label: "Authentication and Security" },
];
