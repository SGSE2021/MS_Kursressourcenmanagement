import React, { Component } from 'react'
import styled from 'styled-components'
import { MembersButtonMenu } from '../components'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import checkUserData from '../checkUserData'
import axios from 'axios';

const Container = styled.div.attrs({
    className: 'container',
})`
    display: flex;
    flex-wrap: wrap;
`

const Overview = styled.div.attrs({
    className: 'Overview',
})`
    width: 85%;
`

const MemberContainer = styled.div.attrs({
    className: 'MembersContainer',
})`
    display: flex;
    width: 14%;
    float: left;
    border: 1px solid;
    margin-right: 20px;
    margin-top: 20px;
    height: 13em;
    flexDirection: 'row';
    flex-wrap: wrap;
    align-items: center;
`

const NameTagInMember = styled.p`
    width: 100%;
    text-align: center
`

const ProfileIcon = styled.div.attrs({
    className: 'profileIcon',
})`
    font-size: 6em;
    margin-left: auto;
    margin-right: auto;
`

class MembersOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
            id: this.props.match.params.id,
            members: [],
        }
    }

    componentDidMount = async () => {
        const { id } = this.state
        var membersList = []

        var coursesRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/courses-api/courses/" + id)
        var docentsRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/lecturers")
        var studentsRes = await axios.get("https://sgse2021-ilias.westeurope.cloudapp.azure.com/users-api/students")
        console.log(coursesRes)
        var course = coursesRes.data
        console.log(docentsRes)
        var docentsArray = docentsRes.data
        console.log(studentsRes)
        var studentsArray = studentsRes.data
        
        var docents = course.docents.split(",")
        var persons = course.persons.split(",")

        docents.forEach((e) => {
            membersList.push(docentsArray.find(element => element.id === e))
        })
        persons.forEach((e) => {
            membersList.push(studentsArray.find(element => element.id === e))
        })
        
        this.setState({
            members: membersList
        })
    }

    render() {
        const { id, members } = this.state
        var loggedUser = checkUserData()

        if(loggedUser === null || loggedUser === undefined){
            document.location.href = "https://sgse2021-ilias.westeurope.cloudapp.azure.com/users/";
        }

        if(loggedUser !== null && loggedUser !== undefined){
            return (
                <Container>
                    <Overview>
                        {members.map(obj => 
                            <MemberContainer key={obj.id}>
                                <ProfileIcon><AccountBoxIcon fontSize="inherit"></AccountBoxIcon></ProfileIcon>
                                <NameTagInMember>{obj.firstname} {obj.lastname}</NameTagInMember>
                            </MemberContainer>
                        )}
                    </Overview>
                    <MembersButtonMenu courseid={id}> 
                    </MembersButtonMenu>
                </Container>
            )
        }

        return (
            <div></div>
        )
    }
}

export default MembersOverview