import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import checkUserData from '../checkUserData'

const useStyles = makeStyles((theme) => ({
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

function ButtonMenu(props) {
    const classes = useStyles();
    var loggedUser = checkUserData()
    
    if(loggedUser === null || loggedUser === undefined){
        return (
            <div></div>
        )
    }
    
    if(loggedUser.role === 3) {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/appointments/create"}>Termin erstellen</Button>
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

export default ButtonMenu;