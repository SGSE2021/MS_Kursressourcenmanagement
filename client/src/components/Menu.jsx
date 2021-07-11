import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { AppointmentOverview, ContentOverview, MembersOverview, FileUpload, CourseOverview } from '../pages';
import {CreateAppointment, UpdateAppointment} from '../components'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuTitle: {
    flexGrow: 1,
  },
  profileButton: {
      fontSize: '40px',
  },
  profileDiv: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',

      '& p': {
          marginTop: 0,
          marginBottom: 0,
          alignItems: 'center',
          fontSize: '14px',
    }
  }
}));

function Menu(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const linkStyle = {
      color: "white",
      textDecoration: "none",
    }

    if (props.loggedUser === null || props.loggedUser === undefined) {
      return (
        <Router>
          <Redirect to="/users/" />
        </Router>
      )
    }

    const drawerButtonArray = [
      {text: 'Startseite', link: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/"},
      {text: 'Mail', link: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/messages/"},
      {text: 'Kurse', link: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/resources/"},
      {text: 'Stundenplan', link: "/"},
      {text: 'Prüfungen', link: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/exams/"},
      {text: 'Raumbuchung', link: "/"},
      {text: 'Ausloggen', link: "https://sgse2021-ilias.westeurope.cloudapp.azure.com/resources/"}
    ]

    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.menuTitle}>
            <a href="/resources/" style={linkStyle}>Kurse</a>
          </Typography>
          <div className={classes.profileDiv}>
              <IconButton href="/users/settings"><AccountCircleIcon className={classes.profileButton}></AccountCircleIcon></IconButton>
              <p>{props.loggedUser.firstname + " " + props.loggedUser.lastname}</p>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
        {drawerButtonArray.map((obj) => (
          <ListItem button key={obj.text} href={obj.link}>
            <ListItemText primary={obj.text} />
          </ListItem>
        ))}
        </List>
      </Drawer>
      <main className={clsx(classes.content, {
          [classes.contentShift]: open,})}>
        <div className={classes.drawerHeader} />

        <Router basename="/resources">
          <Switch>
            <Route path="/" exact component={CourseOverview}/>
            <Route path={`/course/:id/appointments`} exact component={AppointmentOverview} />
            <Route path={`/course/:id/appointments/create`} exact component={CreateAppointment} />
            <Route path={`/course/:id/appointments/update/:apId`} exact component={UpdateAppointment} />
            <Route path={`/course/:id/members`} exact component={MembersOverview} />
            <Route path={`/course/:id/`} exact component={ContentOverview} />
            <Route path={`/course/:id/upload`} exact component={FileUpload} />
          </Switch>
        </Router>
      </main>
      </div>
    )
}

export default Menu;