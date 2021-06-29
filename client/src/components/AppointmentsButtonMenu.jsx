import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    const [userRole] = React.useState("porf");

    if(userRole == "student") {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/leave"}>Austreten</Button>
            </div>
        )
    }
    else {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/courses/" + props.courseid + "/appointments/create"}>Termin erstellen</Button>
            </div>
        )
    }
    
}

export default ButtonMenu;