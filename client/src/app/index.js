import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Menu } from '../components'

const useStyles = makeStyles((theme) => ({
    appRoot: {
        
    },
    layoutContainer: {
        height: '100vh',
        background: 'red',
    }  
}));

function App() {
    const classes = useStyles();
    return (
    <div className={classes.appRoot}>
        <Menu></Menu>
    </div>
    );
} 

export default App;