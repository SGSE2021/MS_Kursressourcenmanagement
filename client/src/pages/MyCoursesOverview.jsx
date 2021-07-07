import React, { Component } from 'react';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';

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
        // courses von MS_Kurse abfragen
        // api...

        const courseArray = [
            {id: "SGSE", dozent: "Prof. Brunsmann", semester: "Sommersemester 2021", name: "Spezielle Gebiete zum Softwareengineering"},
            {id: "DM", dozent: "Prof. Behrens", semester: "Sommersemester 2021", name: "Data Mining"},
            {id: "MDBS", dozent: "Budke", semester: "Sommersemester 2021", name: "Moderne Datenbankensysteme"},
            {id: "BE", dozent: "Danzebrink", semester: "Sommersemester 2021", name: "Business Engineering und IT-Projektmanagement"},
        ]

        const sortedCourses = this.sortAndGroupCourses(courseArray)
        this.setState({
            courses: sortedCourses
        })
    }

    handleExit (event, data) {
        event.preventDefault()
        console.log("Austreten aus Kurs: " + data.id)
    }

    sortAndGroupCourses(courseArray) {
        const courses = courseArray
        var result = [], i = 0, val, index, values = []
        
        for(; i < courses.length; i++){
            val = courses[i].semester
            index = values.indexOf(val)

            if (index > -1) {
                result[index].data.push(courses[i]);
            } else {
                values.push(val);
                result.push({semester: val, data: [courses[i]]});
            }
        }

        return result
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
                        <div key={obj.semester}>
                            <h3>{obj.semester}</h3>
                            {obj.data.map(c => 
                                <ListItem button 
                                key={c.id}>
                                    <a style={linkStyle} href={"/courses/course/" + c.id}><div style={styleFullWidth}>
                                        <ContextMenuTrigger id={c.id}>
                                            <ContextContainer>
                                                <ListItemText primary={c.name + " - " + c.dozent + " - " + c.semester}/>
                                                <div ><MoreVertIcon></MoreVertIcon></div>
                                            </ContextContainer>
                                        </ContextMenuTrigger>
                                        <ContextMenu className="contextMenu" id={c.id} style={menuStyle}>
                                        <MenuItem
                                            onClick={this.handleExit}
                                            data={{item: "austreten", id: c.id}}
                                            className="menuItem">
                                                Austreten
                                            </MenuItem>
                                        </ContextMenu>
                                    </div></a>
                                </ListItem>
                            )}
                        </div>
                        
                    )}
                 </List>
            </Container>
        )
    }
}

export default MyCoursesOverview