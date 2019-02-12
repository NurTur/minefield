import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import BaseReducer from "./store/BaseReducer";
/*import AppMine from "./container/appMine";
import DataField from "./components/dataFeild";
import EnterCountMines from "./components/enterCountMines";
import ViewFooter from "./components/viewFooter";

import "./scss/index.scss";
import "./scss/appMine.scss";
import "./scss/flag.scss";
import "./scss/dataField.scss";
import "./scss/enterCountMines.scss";
import "./scss/viewFooter.scss";*/
import PostRegister from "./services/postRegister";
import PostLogin from "./services/postLogin";

/*
const store = createStore(
  BaseReducer,
  applyMiddleware(thunk)
);

store.subscribe(() => console.log(store.getState()));*/


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Products extends React.Component {
  render() {
    return <h2>Товары</h2>;
  }
}

class Home extends React.Component {
  state = { username: "", password: "" }

  handleName(event) { this.setState({ username: event.target.value }); }
  handlePassword(event) { this.setState({ password: event.target.value }); }

  register = async (obj) => {
    try {
      const result = await PostRegister(obj);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  login = async (obj) => {
    try {
      const result = await PostLogin(obj);
      console.log(result);
    }
    catch (error) {
      console.log(error);
    }
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.login({ username, password });
  }

  handleRegister(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.register({ username, password });
  }

  render() {
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
        <button onClick={this.handleLogin.bind(this)}>Log in</button>
      </form>
      <hr />
      <p>Registration Form</p>
      <form >
        <div>
          <label>Username :</label>
          <input type='text' name='username' onChange={this.handleName.bind(this)} />
          <label>Password :</label>
          <input type='password' name='password' onChange={this.handlePassword.bind(this)} />
        </div>
        <button onClick={this.handleRegister.bind(this)}>Register</button>
      </form></div>)
  }
}

class Main extends React.Component {

  render() {
    return (<Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/profile" component={Products} />
        </Switch>
      </div>
    </Router>)
  }
}


/*class Main extends React.Component {
  state = { HomePage: null }

  componentDidMount() {
    this.onData();
  }

  onData = async () => {
    try {
      const HomePage = await HomePageHTML();
      this.setState({ HomePage });
    } catch (error) {
      console.log(error);
    }
  };


  render() {
    const { HomePage } = this.state;
    console.log(HomePage)

    return (
      <div className="container">
        <div className="header"><div><DataField /></div></div>
        <div className="advert"><div><EnterCountMines /></div></div>
        <div className="content"><div><AppMine /></div></div>
        <div className="footer"><div><ViewFooter /></div></div>
        <div className="empty"></div>
      </div>
    )
  }
}*/


/*ReactDOM.render(<Provider store={store}><Main /></Provider>,
  document.getElementById("app")
)*/

ReactDOM.render(<Main />,
  document.getElementById("app")
)
