import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';

export const navbarItems = (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                    <Link to="/">
                        <ListItemText primary="Home" />
                    </Link>
                </ListItemIcon>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon />
                    <Link to="/customers">
                        <ListItemText primary="Customers" />
                    </Link>
                </ListItemIcon>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <CalendarViewDayIcon />
                    <Link to="/trainings">
                    <ListItemText primary="Trainings" />
                    </Link>
                </ListItemIcon>
            </ListItem>
        </div>
);
