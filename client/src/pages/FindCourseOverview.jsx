import React, { Component } from 'react';
import styled from 'styled-components'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {ContextMenu, ContextMenuTrigger} from "react-contextmenu";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import checkUserData from '../checkUserData';

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

class FindCourseOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            courses: [],
            majors: [],
            selectedMajor: {},
            filteredCourses: [],
        }
    }

    componentDidMount = async () => {
        var courseArray = []
        var majorsArray = []
        var docentsArray = []

        try {
            var courseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/")
			var studyCoureseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
            studyCoureseRes.data.forEach((e) => {
                majorsArray.push(e)
            })
            var docentsRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers")
            docentsRes.data.forEach((e) => {
                docentsArray.push(e)
            })

            courseRes.data.forEach((course) => {
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
            courses: courseArray,
            majors: majorsArray,
            selectedMajor: {},
            filteredCourses: []
        })
    }

    handleEntry(e, data) {
        e.preventDefault()
        var loggedUser = checkUserData()

        try {
            var members = data.course.persons.split(",")
            console.log(members)
            console.log(loggedUser.uid.toString())
            var foundUser = members.find(el => el === loggedUser.uid.toString())
            console.log(foundUser)
            if ( foundUser !== null || foundUser !== undefined ){
                // Redirect
            }else{
                var memberString = data.course.persons + "," + loggedUser.uid.toString()

                console.log(memberString)

                // var res = await axios.put("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/" + data.course.id)
            }
        } catch {

        }

    }

    render() {
        const {majors, selectedMajor, filteredCourses} = this.state
        
        const styleFullWidth = {
            width: "100%",
        }
        const menuStyle = {
            background: "#ededef",
            zIndex: 1,
            border: "1px solid",
        }
        const selectStyle = {
            width: "20%",
        }
        

        const handleMajorChange = (event) => {
            this.state.selectedMajor = event.target.value
            const courseArray = this.state.courses
            const filteredCourses = []
            
            courseArray.forEach((obj) => {
                if(obj.c.subject === this.state.selectedMajor.id){
                    filteredCourses.push({c: obj.c, docents: obj.docents})
                }
            })

            this.setState({filteredCourses: filteredCourses})
        };

        return (
            <Container>
                <InputLabel id="majorSelect" style={selectStyle}>Studiengang</InputLabel>
                <Select style={selectStyle}
                labelId="majorSelect"
                value={selectedMajor.name}
                onChange={handleMajorChange}>
                    {majors.map(obj => 
                        <MenuItem key={obj.id} value={{name: obj.degree + " " + obj.name, id: obj.id}}>{obj.degree + " " + obj.name}</MenuItem>
                    )}
                </Select>

                <List component="nav" aria-label="courses">
                    {filteredCourses.map(obj => 
                        <ListItem button 
                        key={obj.c.id.toString()}>
                            <div style={styleFullWidth}>
                                <ContextMenuTrigger id={obj.c.id.toString()}>
                                    <ContextContainer>
                                        <ListItemText primary={obj.c.name + " - " + obj.docents}/>
                                        <div ><MoreVertIcon></MoreVertIcon></div>
                                    </ContextContainer>
                                </ContextMenuTrigger>
                                <ContextMenu className="contextMenu" id={obj.c.id.toString()} style={menuStyle}>
                                <MenuItem
                                    onClick={(e) => {this.handleEntry(e, {item: "beitreten", course: obj.c})}}
                                    className="menuItem">
                                        Beitreten
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

export default FindCourseOverview