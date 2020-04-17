import React from 'react';
import './App.css';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import MyLocationIcon from '@material-ui/icons/MyLocation';

/*
 * simple react component showing iframe embedding
 */
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pinboards: true,
            search: false,
            answers: false,
            tsUrl: process.env.REACT_APP_THOUGHTSPOT_URL
        };

        this.changeIframeState = this.changeIframeState.bind(this)
    }

    changeIframeState(item) {
        let s = {
            pinboards: false,
            search: false,
            answers: false
        };

        switch(item){
            case 'pinboards':
                s.pinboards = true;
                break;
            case 'search':
                s.search = true;
                break;
            case 'answers':
                s.answers = true;
                break;
            default:
                s.pinboards = true;
        }

        /*
         * simple state change don't need anything fancy for this example
         * simply return the new state which is used to decide which iframe
         * to show
         */
        this.setState(() => s);
    }

    /*
     * a simple react application
     */
    render() {
        return(
            <div className="App">
                <nav className="navbar">
                    <Link href="#" onClick={(evt)=> evt.preventDefault()}>
                        <Avatar variant="square" alt="basic logo" src="/logo.png"/>
                    </Link>
                </nav>
                <div className="wrapper">
                    <div className="sidebar">
                        <List component="nav">
                            <ListSubheader>ThoughtSpot</ListSubheader>
                            <ListItem button onClick={() => this.changeIframeState('pinboards')}>
                                <ListItemIcon><DashboardIcon/></ListItemIcon>
                                <ListItemText>Pinboards</ListItemText>
                            </ListItem>
                            <ListItem button onClick={() => this.changeIframeState('search')}>
                                <ListItemIcon><SearchIcon/></ListItemIcon>
                                <ListItemText>Search</ListItemText>
                            </ListItem>
                            <ListItem button onClick={() => this.changeIframeState('answers')}>
                                <ListItemIcon><MyLocationIcon/></ListItemIcon>
                                <ListItemText>Answers</ListItemText>
                            </ListItem>
                        </List>
                    </div>
                    <div className="main-window">
                        <TsFrame
                            title="pinboard"
                            showItem={this.state.pinboards}
                            src={`${this.state.tsUrl}/?embedApp=True#/pinboards`}
                        />
                        <TsFrame
                            title="search"
                            showItem={this.state.search}
                            src={`${this.state.tsUrl}/?embedApp=True#/`}
                        />
                        <TsFrame
                            title="answers"
                            showItem={this.state.answers}
                            src={`${this.state.tsUrl}/?embedApp=True#/answers`}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

/*
 * The state in this example is simply used to show or hide the div which wraps the iframe.
 * This is an intentional step, the thoughtspot iframe has to load all the resources for the
 * embedded page (js, css, etc.), in a SPA application like react we can preload all the
 * iframes so when the user selects a menu item to open another iframe, it is already loaded.
 *
 * This reduces percieved wait time as it happens in the background while the application loads.
 */
const TsFrame = props =>
    <div className="item" style={{display: props.showItem ? '' : 'none'}}>
        <iframe
            className="ts-frame"
            title={props.title}
            frameBorder="0"
            src={props.src}
        />
    </div>;

export default App;
