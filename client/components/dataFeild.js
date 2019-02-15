import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";



class DataField extends React.Component {
    state = { count: 10, time: 0, name: "" }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }


    tick() {
        if (this.props.Reducer.Timer === "START") {
            this.setState({
                time: this.state.time + 1
            });
        } else if (this.props.Reducer.Timer === "STOP") {
            this.setState({ time: 0 });
        }
    }

    handleChange(event) {
        const val = event.target.value;
        this.setState({ count: val })
        this.props.SetDATAOFFIELD({ Mine: 0, Move: 0, Timer: "STOP", Count: val });
    }

    render() {

        const arr = ["10", "15", "20", "25", "30", "35", "40"];

        return (

            <div id="dataOfField">
                <label htmlFor="dropdown">Count of bombs </label>
                <select id="dropdown" name="dropdown" value={this.state.count} onChange={this.handleChange.bind(this)} required>
                    {arr.map((d, i) => <option value={d} key={i}>{d}</option>)}
                </select>
                <p>Mine : {this.props.Reducer.Mine}</p>
                <p>Move : {this.props.Reducer.Move}</p>
                <p>Time : {this.props.Reducer.Timer === "STOP" ? "0" : this.state.time}</p>
            </div>


        )
    }
};



export default connect(state => ({ Reducer: state.Reducer }),
    dispatch => bindActionCreators({ SetDATAOFFIELD }, dispatch))(DataField);