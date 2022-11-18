import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertTriangle,
  Clipboard,
  Settings as SettingsIcon,
  List as ListIcon,
  Smile
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Centro de Salud',
  name: 'Mama Antula'
};

const items = [
  /*   {
    href: '/app/triage',
    icon: ActivityIcon,
    title: 'Triage'
  }, */
  /* {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Historia Clinica'
  }, */
  /* a */
  /*  {
      href: '/app/nursing',
      icon: UserIcon,
      title: 'Enfermeria'
    },

  {
    href: '/app/epicrisis',
    icon: SettingsIcon,
    title: 'Epicrisis'
  }, */ {
    href: '/app/mental_health',
    icon: SettingsIcon,
    title: 'Salud Mental'
  },
  /*   {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Interconsulta'
  },
  {
    href: '/app/nutrition',
    icon: SettingsIcon,
    title: 'Nutrición'
  }, */
  {
    href: '/app/laboratory',
    icon: Clipboard,
    title: 'Laboratorio'
  },
  /* {
    href: '/app/hemotherapy',
    icon: SettingsIcon,
    title: 'Hemoterapia'
  },*/
  {
    href: '/app/xray',
    icon: AlertTriangle,
    title: 'Rayos'
  },
  {
    href: '/app/tomography',
    icon: SettingsIcon,
    title: 'Tomografia'
  },
   {
    href: '/app/odontology',
    icon: Smile,
    title: 'Odontología'
  },
  /*{
    href: '/app/statitics',
    icon: UsersIcon,
    title: 'Estadisticas'
  } */
  /*   {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  }, */
  {
    href: '/app/my_turns',
    icon: ListIcon,
    title: 'Mis turnos'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h2">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default NavBar;
