import { connect } from "react-redux";

import React from 'react';
import { Redirect } from 'react-router';


class HeaderGame extends React.Component {

    render() {
        return (
            <div id="headerContainer">
                <div className="wellcome"><div className="text">Wellcome,</div></div>
                <div className="username"><div className="text">{this.props.User.username} !!!</div></div>
                <div className="save"><div className="navItem">Save</div></div>
                <div className="install"><div className="navItem">Install</div></div>
                <div className="records"><div className="navItem">Records</div></div>
                <div className="logout"><a href="/" className="navItem">Logout</a></div>

                {/*<div className="wellcomeBox">
                    <div className="text"><p>Wellcome</p><p>{this.props.User.username} !!!</p></div>
                </div>
                <div className="navBox">
                    <nav className="nav">
                        <div id="nav1">Save</div>
                        <div id="nav1">Install</div>
                        <div id="nav1">Records</div>
                        <div id="nav1">Logout</div>
                    </nav>
        </div>*/}



            </div>)
    }
}


export default connect(state => ({ User: state.User }))(HeaderGame);
