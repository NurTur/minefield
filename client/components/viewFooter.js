import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";
import PostRecords2 from "../services/postRecords2";


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

    onRecordsDB = async () => {
        try {
            const result = await PostRecords2({ records: this.props.Records });
            console.log("result", result);
        } catch (error) {
            console.log(error);
        }
    }

    onRecordsStore = async (data) => {
        const { Count, Move, Second } = data;
        const arr = ["10", "15", "20", "25", "30", "35", "40"];
        let test = false;
        arr.forEach((e, i) => {
            const test1 = (this.props.Records[i * 2].answer === 0 && this.props.Records[i * 2].answer < Move && Count === e);
            const test2 = (Move > 0 && this.props.Records[i * 2].answer > Move && Count === e);
            const test3 = (this.props.Records[i * 2 + 1].answer === 0 && this.props.Records[i * 2 + 1].answer < Second && Count === e);
            const test4 = (Second > 0 && this.props.Records[i * 2 + 1].answer > Second && Count === e);
            if (test1 || test2) {
                this.props.Records[i * 2].answer = Move;
                this.props.Records[i * 2].name = this.props.User.username;
                test = true;
            }
            if (test3 || test4) {
                this.props.Records[i * 2 + 1].answer = Second;
                this.props.Records[i * 2 + 1].name = this.props.User.username;
                test = true;
            }
        });
        if (test) {
            this.onRecordsDB();
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.Reducer.Timer === "BOOM") {
            this.onRecordsStore(this.props.Reducer);
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
    dispatch => bindActionCreators({ SetDATAOFFIELD }, dispatch))(ViewFooter);