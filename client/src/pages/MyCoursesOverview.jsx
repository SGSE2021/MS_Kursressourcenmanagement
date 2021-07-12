import React, { Component } from 'react';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import checkUserData from '../checkUserData';
import axios from 'axios';

const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`

const ContextContainer = styled.div.attrs({
    className: "ContextContainer",
})`
    display: flex;
    width: 100%;

    div: {
        align-items: right;
    }
`

class MyCoursesOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            courses: []
        }
    }

    componentDidMount = async () => {
        var courseArray = []
        var majorsArray = []
        var docentsArray = []
        var loggedUser = checkUserData()
        
        try {
            var courseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/")
            var myCourses = []
            courseRes.data.forEach((e) => {
                if(e.docents.includes(loggedUser.uid) || e.persons.includes(loggedUser.uid)){
                    myCourses.push(e)
                }
            })

			var studyCoureseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
            studyCoureseRes.data.forEach((e) => {
                majorsArray.push(e)
            })
            var docentsRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers")
            docentsRes.data.forEach((e) => {
                docentsArray.push(e)
            })

            myCourses.forEach((course) => {
                var courseDocents = course.docents.split(",")
                var foundCourseDocents = []
                courseDocents.forEach((doc) => {
                    foundCourseDocents.push(docentsArray.find(element => element.id === doc))
                })

                var docentString = ""
                foundCourseDocents.forEach((e) =>{
                    
                    docentString += e.firstname + " " + e.lastname + ", "
                })
                docentString = docentString.substring(0, docentString.length - 2)

                courseArray.push({c: course, docents: docentString})
            })
		} catch {
		}

        this.setState({
            courses: courseArray
        })
    }

    handleExit (event, data) {
        event.preventDefault()
        var loggedUser = checkUserData()

        try {
            var members = data.course.c.persons.split(",")
            var foundUserIndex = members.findIndex(el => el === loggedUser.uid.toString())
            if ( foundUserIndex !== undefined ){
                members.splice(foundUserIndex, 1)
                var memberString = members.toString()
                data.course.c.persons = memberString

                axios.put("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/", data.course.c)
                window.location.reload()
            }else{
                window.location.reload()
            }
        } catch {
        }
    }

    render() {
        const {courses} = this.state
        
        const styleFullWidth = {
            width: "100%",
        }
        const menuStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid",
        }
        const linkStyle = {
            color: "black",
            textDecoration: "none",
            padding: 0,
            margin: 0,
            width: "100%",
        }

        return (
            <Container>
                <List component="nav" aria-label="courses">
                    {courses.map(obj => 
                        <ListItem button 
                        key={obj.c.id.toString()}>
                            <a style={linkStyle} href={"/resources/#/course/" + obj.c.id.toString()}><div style={styleFullWidth}>
                                <ContextMenuTrigger id={obj.c.id.toString()}>
                                    <ContextContainer>
                                        <ListItemText primary={obj.c.name + " - " + obj.docents}/>
                                        <div ><MoreVertIcon></MoreVertIcon></div>
                                    </ContextContainer>
                                </ContextMenuTrigger>
                                <ContextMenu className="contextMenu" id={obj.c.id.toString()} style={menuStyle}>
                                <MenuItem
                                    onClick={(e) => {this.handleExit(e, {item: "austreten", course: obj})}}
                                    className="menuItem">
                                        Austreten
                                    </MenuItem>
                                </ContextMenu>
                            </div></a>
                        </ListItem>
                    )}
                 </List>
            </Container>
        )
    }
}

export default MyCoursesOverview