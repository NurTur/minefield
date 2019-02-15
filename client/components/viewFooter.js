import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";


class ViewFooter extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.Reducer.Timer === "BOOM") {
            return true;
        }
        if (nextProps.Reducer.Timer === "WIN") {
            return true;
        }
        if (nextProps.Reducer.Timer === "STOP") {
            return true;
        }
        return false;
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.props.Reducer.Timer === "BOOM") {
            const obj = { Mine: 0, Move: 0, Timer: "STOP" };
            setTimeout(() => {
                (window.confirm("YOU LOSE. Do you Want to play again?") && this.props.SetDATAOFFIELD(obj));
            }, 500);
        }
        else if (this.props.Reducer.Timer === "WIN") {
            const obj = { Mine: 0, Move: 0, Timer: "STOP" };
            setTimeout(() => {
                (window.confirm("PERFECT, YOU WON !!!. Do you Want to play again?") && this.props.SetDATAOFFIELD(obj));
            }, 500);
        }
    }

    render() {
        const { Timer } = this.props.Reducer;
        return (<div className="Center">
            {Timer === "BOOM" && <div>YOU LOSS</div>}
            {Timer === "WIN" && <div>FINE YOU WON</div>}
        </div>)
    }
};





export default connect(
    state => ({ Reducer: state.Reducer }),
    dispatch => bindActionCreators({ SetDATAOFFIELD }, dispatch))(ViewFooter);