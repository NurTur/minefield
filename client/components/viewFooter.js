import React from 'react';
import { connect } from "react-redux";


class ViewFooter extends React.Component {

    render() {
        console.log(this.props.Reducer.Timer)

        return (<div className="Center">{this.props.Reducer.Timer === "BOOM" && <div>YOU LOSS </div>}
            {this.props.Reducer.Timer === "WIN" && <div>FINE YOU WON</div>}
        </div>)
    }
};



export default connect(state => ({ Reducer: state.Reducer }))(ViewFooter);