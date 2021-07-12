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
            selectedMajor: {},
            filteredCourses: [],
        }
    }

    componentDidMount = async () => {
        // TODO
        var courseArray = []
        var majorsArray = []

        try {
            var courseRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/")
            courseRes.data.forEach((e) => {
                courseArray.push(e)
            })
        }catch {
        }
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
            selectedMajor: {},
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
                if(obj.subject === this.state.selectedMajor.id){
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
                value={selectedMajor.name}
                onChange={handleMajorChange}>
                    {majors.map(obj => 
                        <MenuItem key={obj.id} value={{name: obj.degree + " " + obj.name, id: obj.id}}>{obj.degree + " " + obj.name}</MenuItem>
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