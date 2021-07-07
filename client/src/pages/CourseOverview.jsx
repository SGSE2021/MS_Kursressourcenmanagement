import React, { Component } from 'react'
import styled from 'styled-components'
import { Button } from '@material-ui/core';
import { MyCoursesOverview, FindCourseOverview } from '../pages'

const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    margin-left: 1em;
`

const Overview = styled.div.attrs({
    className: 'Overview',
})`
    width: 100%;
    margin-top: 1.5em;
`

class CourseOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.match.params.id,
            showComponent: 1,
            courses: [],
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        
        // TODO: get courselist of user 
    }

    handleClick(e, data) {
        if(data.btn === "findCourse"){
            this.setState({showComponent: 2})
        } else {
            this.setState({showComponent: 1})
        }
    }

    render() {
        const buttonstyle = {
            marginRight: "0.5em",
        }

        return (
            <Container>
                <h2>Übersicht</h2>
                <div>
                    <Button style={buttonstyle} variant="contained" color="primary" onClick={(e) => this.handleClick(e, {btn: "myCourses"})} >Meine Kurse</Button>
                    <Button style={buttonstyle} variant="contained" color="primary" onClick={(e) => this.handleClick(e, {btn: "findCourse"})} >Kurse finden</Button>
                </div>
                <Overview>
                    {(this.state.showComponent == 1) ? <MyCoursesOverview></MyCoursesOverview> : <FindCourseOverview></FindCourseOverview>}
                </Overview>
            </Container>
        )
    }
}

export default CourseOverview