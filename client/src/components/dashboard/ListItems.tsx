import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import TaskIcon from '@mui/icons-material/Task'
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom'

interface CustomLinkProps {
  to: string,
  icon: React.ComponentType,
  primary: string
}

const CustomLink: React.FC<CustomLinkProps> = ({ to, icon: IconComponent, primary}) => (
  <Link to={to} style={{ textDecoration: 'none'}}>
    <ListItemButton>
      <ListItemIcon sx={{ color: "white"}}>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={primary} sx={{ color: "white"}} />
    </ListItemButton>
  </Link>
);

export const mainListItems = (
  <React.Fragment>
    <CustomLink to="/dashboard" icon={DashboardIcon} primary="Dashboard" />
    <CustomLink to="/study" icon={AutoStoriesIcon} primary="Study" />
    <CustomLink to="/tasks" icon={TaskIcon} primary="Tasks" />
    <CustomLink to="/projects" icon={WorkIcon} primary="Projects" />
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <CustomLink to="/profile" icon={AccountBoxIcon} primary="Profile" />
  </React.Fragment>
);