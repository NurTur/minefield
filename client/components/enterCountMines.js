import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetCOUNTMINE } from "../store/actions";


class EnterCountMines extends React.Component {
    state = { count: 10 }

    handleChange(event) {
        const val = event.target.value;
        this.props.SetCOUNTMINE(val)
        this.setState({ count: val });
    }

    render() {
        const arr = ["10", "15", "20", "25", "30", "35", "40"];
        return (<div>Count of bombs
            <select id="dropdown" name="dropdown" value={this.state.count} onChange={this.handleChange.bind(this)}>
                {arr.map((d, i) => <option value={d} key={i}>{d}</option>)}
            </select></div>)
    }
};


export default connect(state => ({ Reducer: state.Reducer }),
    dispatch => bindActionCreators({ SetCOUNTMINE }, dispatch))(EnterCountMines);