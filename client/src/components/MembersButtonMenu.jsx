import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

function MembersButtonMenu(props) {
    const classes = useStyles();

    return (
        <div className={classes.buttonMenu}>
            <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid}>Inhalt</Button>
            <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/appointments"}>Termine</Button>
            <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/members"}>Mitglieder</Button>
            <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/course/" + props.courseid + "/leave"}>Austreten</Button>
        </div>
    )
}

export default MembersButtonMenu;