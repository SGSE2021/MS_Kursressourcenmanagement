import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import checkUserData from '../checkUserData'
import axios from 'axios';

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

    const handleExit = async (event, data) => {
        event.preventDefault()
        var loggedUser =  checkUserData()
        
        try {
            var res = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/" + data.courseid)
            var course = res.data[0]
            var members = course.persons.split(",")
            var foundUserIndex = members.findIndex(el => el === loggedUser.uid.toString())
            
            if ( foundUserIndex !== -1 ){
                members.splice(foundUserIndex, 1)
                var memberString = members.toString()
                course.persons = memberString
                console.log(course)
                axios.put("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/", course)
                window.location.reload()
                document.location.href = "https://sgse2021-ilias.westeurope.cloudapp.azure.com/resources/#/";
            }else{
                window.location.reload()
                document.location.href = "https://sgse2021-ilias.westeurope.cloudapp.azure.com/resources/#/";
            }
        } catch {
        }
    }
    
    if(loggedUser.role === 3) {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid + "/appointments/create"}>Termin erstellen</Button>
            </div>
        )
    } else {
        return (
            <div className={classes.buttonMenu}>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid}>Inhalt</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid + "/appointments"}>Termine</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href={"/resources/#/course/" + props.courseid + "/members"}>Mitglieder</Button>
                <Button className={classes.buttons} variant="contained" color="primary" href="" onClick={(e) => handleExit(e, {courseid: props.courseid})}>Austreten</Button>
            </div>
        )
    }
    
}

export default ButtonMenu;