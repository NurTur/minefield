import { connect } from "react-redux";
import React from 'react';
import { NavLink } from 'react-router-dom';
import DataField from "./dataFeild";
import AppMine from "../container/appMine";
import ViewFooter from "./viewFooter";

class GameClass extends React.Component {
    render() {
        return (<div id="PageView" >
            <header>
                <div id="headerPage">
                    <div className="headerContainer" >
                        <div className="greeting1"><div className="text">Wellcome,</div></div>
                        <div className="greeting2"><div className="text">{this.props.User.username} !!!</div></div>
                        <div className="navig">
                            <NavLink to="/records" id="nav1">Records</NavLink>
                            <NavLink to="/" id="nav1">Logout</NavLink>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                <div id="gamePage">
                    <div className="advert"><DataField /></div>
                    <div className="content"><div><AppMine /></div></div>
                    <div className="footer"><ViewFooter /></div>
                    <div className="empty"></div>
                </div>
            </main>
        </div >);

    }
}

export default connect(state => ({ User: state.User }))(GameClass);


