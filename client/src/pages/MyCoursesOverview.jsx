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

        this.setState({
            courses: courseArray
        })
    }

    handleExit (event, data) {
        console.log("Austreten aus Kurs: " + data.id)
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
        const menuItemStyle = {
            padding: "5px",
            margin: 0,
            width: "6em"
        }

        const linkStyle = {
            color: "black",
            textDecoration: "none",
            padding: 0,
            margin: 0
        }

        return (
            <Container>
                <List component="nav" aria-label="courses">
                    {courses.map(obj => 
                        <ListItem button 
                        key={obj.id}>
                            <div style={styleFullWidth}>
                                <ContextMenuTrigger id={obj.id}>
                                    <ContextContainer>
                                        <ListItemText primary={obj.name + " - " + obj.dozent + " - " + obj.semester}/>
                                        <div ><MoreVertIcon></MoreVertIcon></div>
                                    </ContextContainer>
                                </ContextMenuTrigger>
                                <ContextMenu className="contextMenu" id={obj.id} style={menuStyle}>
                                    <MenuItem
                                    onClick={this.handleExit}
                                    data={{item: "austreten", id: obj.id}}
                                    className="menuItem">
                                        <p style={menuItemStyle}>
                                            Austreten
                                        </p>
                                    </MenuItem>
                                    <Divider></Divider>
                                    <MenuItem
                                    data={{item: "oeffnen", id: obj.id}}
                                    className="menuItem">
                                        <a style={linkStyle} href={"/courses/course/" + obj.id}>
                                            <p style={menuItemStyle}>
                                                Öffnen
                                            </p>
                                        </a>
                                    </MenuItem>
                                </ContextMenu>
                            </div>
                        </ListItem>
                    )}
                 </List>
            </Container>
        )
    }
}

export default MyCoursesOverview