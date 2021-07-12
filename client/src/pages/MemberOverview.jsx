import React, { Component } from 'react'
import styled from 'styled-components'
import { MembersButtonMenu } from '../components'
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import checkUserData from '../checkUserData'
import { HashRouter as Router, Redirect } from 'react-router-dom';

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
        // const members = await api.getMembers(id)
        // Needs to be replaces, when connection to other Microservices is able
        // TODO
        
        const tmpmembersList = [
            {id: 1, firstname: "Dominik", lastname: "Löwen"},
            {id: 2, firstname: "Max", lastname: "Mustermann"},
            {id: 3, firstname: "Alfred", lastname: "Alfredson"},
            {id: 4, firstname: "Dennis", lastname: "Eller"},
            {id: 5, firstname: "Ole", lastname: "Gramit"},
            {id: 6, firstname: "Lukas", lastname: "Weidich"},
            {id: 7, firstname: "Jonas", lastname: "Posselt"},
            {id: 8, firstname: "Joyce Marvin", lastname: "Rafflenbeul"},
            {id: 9, firstname: "Benjamin", lastname: "Franke"},
            {id: 10, firstname: "Kevin", lastname: "Schima"},
            {id: 11, firstname: "Bruce", lastname: "Wayne"},
            {id: 12, firstname: "Peter", lastname: "Parker"},
            {id: 13, firstname: "Tony", lastname: "Stark"},
            {id: 14, firstname: "Manfred", lastname: "Mustermann"}]


        // const membersArray = []
        // members.data.data.forEach((e) => {
        //     membersArray.push({id: e._id, name: e.name})
        // })

        this.setState({
            members: tmpmembersList
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