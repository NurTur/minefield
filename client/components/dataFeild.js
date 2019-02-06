import React from 'react';
import { connect } from "react-redux";

class DataField extends React.Component {
    state = {
        time: 0
    };

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }


    tick() {
        if (this.props.Reducer.Timer === "START") {
            this.setState({
                time: this.state.time + 1
            });
        }
    }


    render() {

        return (<div className="header">
            <header className="container">
                <p>Mine : {this.props.Reducer.Mine}</p>
                <p>Move : {this.props.Reducer.Move}</p>
                <p>Time : {this.state.time}</p>
            </header>

        </div>)
    }
}


export default connect(state => ({ Reducer: state.Reducer }))(DataField);

