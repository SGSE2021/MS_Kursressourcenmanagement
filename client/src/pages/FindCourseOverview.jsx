import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api'
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

class FindCourseOverview extends Component {
    constructor(props) {
        super(props)
 
        this.state = {
        }
    }

    componentDidMount = async () => {

        this.setState({
        })
    }

    render() {
        return (
            <Container>
                <label>Find Courses</label>

            </Container>
        )
    }
}

export default FindCourseOverview