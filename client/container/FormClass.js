import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetUSER } from "../store/actions/user";
import { SetRECORDSDATA } from "../store/actions/records";
import { SetDATAOFFIELD } from "../store/actions/field";

import React from 'react';
import { Redirect } from 'react-router';
import PostLogin from "../services/postLogin";
import PostRegister from "../services/postRegister";
import GetRecords from "../services/getRecords";

class FormClass extends React.Component {
    state = {
        text: "Sign Up", id: "nav1",
        username: "", password: "", user: { username: "", _id: "" }
    }

    componentDidMount() {
        this.onGetRecords();
    }

    onGetRecords = async () => {
        try {
            const res = await GetRecords();
            this.props.SetRECORDSDATA(res);
        } catch (error) {
            console.log(error);
        }
    }


    handleName(event) { this.setState({ username: event.target.value, user: { username: "", _id: "" } }); }
    handlePassword(event) { this.setState({ password: event.target.value, user: { username: "", _id: "" } }); }

    register = async (obj) => {
        try {
            const user = await PostRegister(obj);
            console.log(user);
            if (user._id !== this.props.User._id) {
                this.props.StateSaver.cells = [];
                this.props.StateSaver.EncryptCells = [];
                this.props.SetDATAOFFIELD({ Mine: 0, Move: 0, Timer: "STOP", Count: "10", Second: 0 });
                this.props.SetUSER(user);
            }
            this.setState({ user });
        }
        catch (error) {
            console.log(error);
        }
    }

    auth = async (obj) => {
        try {
            const user = await PostLogin(obj);
            if (user._id !== this.props.User._id) {
                this.props.StateSaver.cells = [];
                this.props.StateSaver.EncryptCells = [];
                this.props.SetDATAOFFIELD({ Mine: 0, Move: 0, Timer: "STOP", Count: "10", Second: 0 });
                this.props.SetUSER(user);
            }
            this.setState({ user });
        }
        catch (error) {
            console.log(error);
        }
    }

    handleClick(event) {
        event.preventDefault();
        const { username, password } = this.state;
        if (this.state.id === "nav1") { this.auth({ username, password }); }
        else { this.register({ username, password }); }
    }

    handleHeader(event) {
        event.preventDefault();
        const obj = { username: "", _id: "" };
        if (this.state.id === "nav1") {
            this.setState({ text: "Log In", id: "nav2", color: "2", user: obj });
        }
        else { this.setState({ text: "Sign Up", id: "nav1", color: "1", user: obj }); }
    }

    render() {

        if (this.state.user.username !== "") {
            return (<Redirect to="/game" />);
        } else {
            const { text, id, username, password, user } = this.state;
            const opacity = ((username.length > 0 && password.length > 0) ? "2" : "1");
            const color = (text === "Sign Up" ? "1" : "2");
            const submitView = `submit opacity${opacity} color${color}`;
            const formtext = (this.state.text === "Sign Up" ? "log in" : "sign up");
            const formtext2 = (this.state.text === "Sign Up" ? "log in for game" : "register for game");
            let resultSubmit;
            let password2 = password;
            let username2 = username;
            if (user._id === "X" && id === "nav1") {
                resultSubmit = <div className="alert" style={{ color: "red" }}><p>Invalid</p><p>username or</p><p>password</p></div>;
                password2 = ""; username2 = "";
            }
            else if (user._id === "X" && id === "nav2") {
                resultSubmit = <div className="alert" style={{ color: "red" }}><p>Such username</p><p>already exists</p></div>;
                password2 = ""; username2 = "";
            }
            else {
                resultSubmit = <div className="alert"><p>Wellcome,</p><p>please</p> <p>{formtext2}</p></div>;
            }


            return (<div id="PageView">
                <header>
                    <div id="headerPage">
                        <div className="headerContainer" >
                            <div className="navig">
                                <nav id={id} onClick={this.handleHeader.bind(this)}>{text}</nav>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div id="formContainer">
                        <section id="sec1">{resultSubmit}</section>
                        <section id="sec2">
                            <form className="ui-form">
                                <div className="form-row">
                                    <input type="text" id="username" onChange={this.handleName.bind(this)} value={username2} required />
                                    <label htmlFor="username">USERNAME</label>
                                </div>
                                <div className="form-row">
                                    <input type="password" id="password" onChange={this.handlePassword.bind(this)} value={password2} required />
                                    <label htmlFor="password">PASSWORD</label>
                                </div>
                            </form>
                            <input type="submit" className={submitView} value={formtext} onClick={this.handleClick.bind(this)} />
                        </section>
                    </div>
                </main>
            </div>
            )
        }
    }
}


export default connect(state => ({ User: state.User, Records: state.Records, Reducer: state.Reducer, StateSaver: state.StateSaver }),
    dispatch => bindActionCreators({ SetUSER, SetRECORDSDATA, SetDATAOFFIELD }, dispatch))(FormClass);

