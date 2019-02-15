import { connect } from "react-redux";
import React from 'react';

function HeaderGame(props) {
    return (
        <div id="headerContainer">
            <div className="wellcome"><div className="text">Wellcome,</div></div>
            <div className="username"><div className="text">{props.User.username} !!!</div></div>
            <div className="save"><div className="navItem">Save</div></div>
            <div className="install"><div className="navItem">Install</div></div>
            <div className="records"><a href="/records" className="navItem">Records</a></div>
            <div className="logout"><a href="/" className="navItem">Logout</a></div>
        </div>)
}

export default connect(state => ({ User: state.User }))(HeaderGame);
