import React from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
//import { SetGAME } from "../store/actions/field";


class ViewFooter extends React.Component {


    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.Reducer.Timer === "BOOM" || nextProps.Reducer.Timer === "WIN") {
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        /*if (this.props.Reducer.Timer === "BOOM") {
            setTimeout(() => {
                /*(window.confirm("YOU LOSE. Do you Want to play again?") && this.props.SetGAME("STARTGAME"));
            }, 500);
}*/
    }

    render() {
        const { Timer } = this.props.Reducer;
        return (<div className="Center">
            {Timer === "BOOM" && <div>YOU LOSS </div>}
            {Timer === "WIN" && <div>FINE YOU WON</div>}
        </div>)
    }
};



//export default connect(state => ({ Reducer: state.Reducer }))(ViewFooter);

export default connect(
    state => ({ Reducer: state.Reducer }),
    dispatch => bindActionCreators({}, dispatch))(ViewFooter);