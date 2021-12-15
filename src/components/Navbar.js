import React from 'react'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

import Home from '../pages/Home';
import Trainings from '../pages/Trainings';
import Customers from '../pages/Customers';
import Calendar from './Calendar';

import {
	Routes,
	Route,
} from 'react-router-dom'

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

function Navbar() {

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex '}}>
        <AppBar position="fixed" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List sx={{ ...(!open && { display: 'none' })}}>
            <Link to='/' style={{ textDecoration: 'none' }}>
            <ListItem button>
                  <ListItemIcon>
                      <HomeIcon sx= {{
                              paddingRight: '16px',
                          }} />
                          <ListItemText primary="Home" />
                  </ListItemIcon>
              </ListItem>
              </Link>
              <Link to="/customers" style={{ textDecoration: 'none' }}>
              <ListItem button>
                  <ListItemIcon>
                      <PeopleIcon sx= {{
                              paddingRight: '16px',
                          }} />
                          <ListItemText primary="Customers" />
                  </ListItemIcon>
              </ListItem>
              </Link>
              <Link to="/trainings" style={{ textDecoration: 'none' }}>
              <ListItem button>
                  <ListItemIcon>
                      <FitnessCenterIcon sx= {{
                              paddingRight: '16px',
                          }} />
                      <ListItemText primary="Trainings" />
                  </ListItemIcon>
              </ListItem>
              </Link>
              <Link to="/calendar" style={{ textDecoration: 'none' }}>
              <ListItem button>
                  <ListItemIcon>
                      <CalendarTodayIcon sx= {{
                              paddingRight: '16px',
                          }} />
                      <ListItemText primary="Calendar" />
                  </ListItemIcon>
              </ListItem>
              </Link>
          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/trainings" element={<Trainings />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </Box>
    </Box>
    )
}

export default Navbar
