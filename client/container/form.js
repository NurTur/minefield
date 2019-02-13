import React from 'react';
import PostLogin from "../services/postLogin";
import { Redirect } from 'react-router';

class FormClass extends React.Component {
    state = { username: "", password: "", user: { username: "", _id: "" } }


    handleName(event) { this.setState({ username: event.target.value }); }
    handlePassword(event) { this.setState({ password: event.target.value }); }

    /*register = async (obj) => {
        try {
            const result = await PostRegister(obj);
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }*/

    auth = async (obj) => {
        try {
            const user = await PostLogin(obj);
            console.log(user);
            this.setState({ user });

        }
        catch (error) {
            console.log(error);
        }
    }

    handleClick(event) {
        event.preventDefault();
        const { username, password } = this.state;
        this.auth({ username, password });
    }

    /*handleRegister(event) {
        event.preventDefault();
        const { username, password } = this.state;
        this.register({ username, password });
    }*/

    render() {

        if (this.state.user.username !== "") {
            return (<Redirect to="/game" />);
        } else {

            return (<div>
                <hr />
                <p>Login Form</p>
                <form >
                    <div>
                        <label>Username :</label>
                        <input type='text' name='username' onChange={this.handleName.bind(this)} />
                        <label>Password :</label>
                        <input type='password' name='password' onChange={this.handlePassword.bind(this)} />
                    </div>
                    <button onClick={this.handleClick.bind(this)}>Log in</button>
                </form>
                <hr />
                {/*<p>Registration Form</p>
            <form >
                <div>
                    <label>Username :</label>
                    <input type='text' name='username' onChange={this.handleName.bind(this)} />
                    <label>Password :</label>
                    <input type='password' name='password' onChange={this.handlePassword.bind(this)} />
                </div>
                <button onClick={this.handleRegister.bind(this)}>Register</button>
            </form>*/}</div>)
        }
    }
}

export default FormClass;
