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
            selectedMajor: "",
            filteredCourses: [],
        }
    }

    componentDidMount = async () => {
        // TODO
        
        try {
            var courseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/")
            console.log(courseRes)
        }catch {
            
        }

        const courseArray = [
            {id: "SGSE", dozent: "Prof. Brunsmann", semester: "Sommersemester 2021", name: "Spezielle Gebiete zum Softwareengineering", major: "MIF"},
            {id: "DM", dozent: "Prof. Behrens", semester: "Sommersemester 2021", name: "Data Mining", major: "MIF"},
            {id: "MDBS", dozent: "Budke", semester: "Sommersemester 2021", name: "Moderne Datenbankensysteme", major: "MIF"},
            {id: "BE", dozent: "Danzebrink", semester: "Sommersemester 2021", name: "Business Engineering und IT-Projektmanagement", major: "MIF"},
            {id: "CB", dozent: "Gips", semester: "Wintersemester 2020/21", name: "Compilerbau", major: "MIF"},
            {id: "ADS", dozent: "George", semester: "Sommersemester 2020/21", name: "Algorithmen und Datenstrukturen", major: "INF"},
            {id: "PM", dozent: "Gips", semester: "Sommersemester 2020/21", name: "Programmiermethoden", major: "INF"},
        ]

        var majorsArray = []

        try {
			var res = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/studycourses");
            res.data.forEach((e) => {
                majorsArray.push(e)
            })

		} catch {
		}

        this.setState({
            courses: courseArray,
            majors: majorsArray,
            selectedMajor: "",
            filteredCourses: []
        })
    }
    handleEntry(e, data) {
        e.preventDefault()
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
                if(obj.major === this.state.selectedMajor){
                    filteredCourses.push(obj)
                }
            })

            const filteredSortedCourses = sortAndGroupCourses(filteredCourses)
            this.setState({filteredCourses: filteredSortedCourses})
        };

        const sortAndGroupCourses = (filteredCourses) => {
            const courses = filteredCourses
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

        return (
            <Container>
                <InputLabel id="majorSelect" style={selectStyle}>Studiengang</InputLabel>
                <Select style={selectStyle}
                labelId="majorSelect"
                value={selectedMajor}
                onChange={handleMajorChange}>
                    {majors.map(obj => 
                        <MenuItem key={obj.id} value={obj.degree + " " + obj.name}>{obj.degree + " " + obj.name}</MenuItem>
                    )}
                </Select>

                <List component="nav" aria-label="courses">
                    {filteredCourses.map(obj => 
                        <div key={obj.semester}>
                            <h3>{obj.semester}</h3>
                            {obj.data.map(c => 
                                <ListItem button 
                                key={c.id}>
                                    <div style={styleFullWidth}>
                                        <ContextMenuTrigger id={c.id}>
                                            <ContextContainer>
                                                <ListItemText primary={c.name + " - " + c.dozent + " - " + c.semester}/>
                                                <div ><MoreVertIcon></MoreVertIcon></div>
                                            </ContextContainer>
                                        </ContextMenuTrigger>
                                        <ContextMenu className="contextMenu" id={c.id} style={menuStyle}>
                                        <MenuItem
                                            onClick={this.handleEntry}
                                            data={{item: "austreten", id: c.id}}
                                            className="menuItem">
                                                Beitreten
                                            </MenuItem>
                                        </ContextMenu>
                                    </div>
                                </ListItem>
                            )}
                        </div>
                    )}
                 </List>
            </Container>
        )
    }
}

export default FindCourseOverview