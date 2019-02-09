import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetCOUNTMINE } from "../store/actions/field";
import { SetUSER } from "../store/actions/user";

class EnterCountMines extends React.Component {
    state = { count: 10, name: "" }

    handleChange(event) {
        if (this.props.User.name !== "") {
            const val = event.target.value;
            this.props.SetCOUNTMINE(val).then(() => this.setState({ count: val }));
        }
    }


    handleChangeID(event) { this.setState({ name: event.target.value }); }

    handleClick(event) {
        event.preventDefault();

        if (this.state.name !== "") {

            const obj = { name: this.state.name, id: "5" };

            this.props.SetUSER(obj);
        }

    }
    render() {

        const arr = ["10", "15", "20", "25", "30", "35", "40"];
        return (<form id="form">
            <fieldset >
                <legend>Fill the form</legend>
                <div className="miniForm">
                    <label htmlFor="ID">Enter name or ID  </label>
                    <input id="ID" type="text" value={this.state.name} onChange={this.handleChangeID.bind(this)} />
                    <br />
                    <label htmlFor="dropdown">Count of bombs</label>
                    <select id="dropdown" name="dropdown" value={this.state.count} onChange={this.handleChange.bind(this)} required>
                        {arr.map((d, i) => <option value={d} key={i}>{d}</option>)}
                    </select>
                    <br />

                    <button onClick={this.handleClick.bind(this)}>Submit</button>
                </div>
            </fieldset>
        </form>)
    }
};



export default connect(state => ({ Reducer: state.Reducer, User: state.User }),
    dispatch => bindActionCreators({ SetCOUNTMINE, SetUSER }, dispatch))(EnterCountMines);