import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";
import { SetRECORDSDATA } from "../store/actions/records";

import PostRecords from "../services/postRecords";
import GetRecords from "../services/getRecords";

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


    onRecords = async (data) => {
        try {
            await PostRecords(data);
            const result = await GetRecords();
            this.props.SetRECORDSDATA(result);
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.Reducer.Timer === "BOOM") {
            this.onRecords(Object.assign({}, this.props.Reducer, { _id: this.props.User._id }));
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
    state => ({ Reducer: state.Reducer, User: state.User, Records: state.Records }),
    dispatch => bindActionCreators({ SetDATAOFFIELD, SetRECORDSDATA }, dispatch))(ViewFooter);