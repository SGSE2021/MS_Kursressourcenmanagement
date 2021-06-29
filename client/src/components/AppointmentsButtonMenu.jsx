import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    buttonMenu: {
        display: 'flex',
    },
    buttons: {
        display: 'flex',
        marginTop: '1em',
    },

}));

function ButtonMenu(props) {
    const classes = useStyles();
    const [userRole] = React.useState("student");

    if(userRole == "student") {
        return (
            <div className="buttonMenu">
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/">Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/SGSE/appointments">Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/SGSE/members">Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/SGSE#leave">Austreten</Button>
            </div>
        )
    }
    else {
        return (
            <div className="buttonMenu">
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/">Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/SGSE/appointments">Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="/courses/SGSE/members">Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="#create">Termin erstellen</Button>
            </div>
        )
    }
    
}

export default ButtonMenu;