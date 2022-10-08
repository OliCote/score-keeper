import '../theme/css/global.css';
import {
  Box, styled,
} from '@mui/material';
import { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MenuItem from '../models/MenuItem';
import Utils from '../utils/Utils';

import translator from '../theme/translator.json';
import AlertsContainer from './AlertsContainer';

const LayoutRoot = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: '1 1 auto',
  maxWidth: '100%',
  paddingTop: 64,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 280,
  },
}));

type Props = {
  children?: React.ReactNode
  title: string
};

const Layout: React.FC<Props> = ({ children, title }) => {
  const sidebarMenuItems = [
    {
      href: '/',
      icon: (<DashboardIcon fontSize="small" />),
      title: Utils.getTranslation(translator.menu.dashboard),
    },
    {
      href: '/games',
      icon: (<VideogameAssetIcon fontSize="small" />),
      title: Utils.getTranslation(translator.menu.games),
    },
  ] as MenuItem[];

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <LayoutRoot>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {children}
        </Box>
        <AlertsContainer/>
      </LayoutRoot>
      <Navbar title={title} onSidebarOpen={() => setSidebarOpen(true)} />
      <Sidebar
        menuItems={sidebarMenuItems}
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};

export default Layout;
