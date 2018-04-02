import React, { Component } from 'react'
import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import { lightBlue100 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


class App extends Component {


    handleTitleClick = (event) => {
        console.log(event.target)
    }

    muiTheme = getMuiTheme({
        palette: {
            primary1Color: '#0A163D',
        },
        appBar: {
            textColor: lightBlue100,
            height: 60
        },
    });



    render() {
        return (
            <div className="App">
                <MuiThemeProvider muiTheme={this.muiTheme}>
                    <MenuBar
                        handleTitleClick={this.handleTitleClick}
                    />
                </MuiThemeProvider>
            </div>
        )
    }
}

export default App
