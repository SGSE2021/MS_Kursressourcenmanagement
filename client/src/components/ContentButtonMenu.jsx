import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import checkUserData from '../checkUserData'

const useStyles = makeStyles(() => ({
    buttonMenu: {
        width: '15%',
    },
    buttons: {
        display: 'flex',
        marginTop: '1em',
        marginLeft: "auto",
        marginRight: "auto",
    },
}));

function ContentButtonMenu(props) {
    const classes = useStyles();
    var loggedUser = checkUserData()

    if(loggedUser === null || loggedUser === undefined){
        return (
            <div></div>
        )
    }

    var loggedUser = {userRole: 3};

    if(loggedUser.userRole === 3) {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/upload"}>Datei hochladen</Button>
            </div>
        )
    } else {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/leave"}>Austreten</Button>
            </div>
        )
    }
}

export default ContentButtonMenu;