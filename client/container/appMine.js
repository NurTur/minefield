import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";
import { SetSTATES } from "../store/actions/stateSaver";

import React from 'react';
import Flag from "../components/flag";
import { OpenCells } from "./openCells";
import { OpenMines } from "./openMines";
import { CellsAdress } from "./cellsAdress";
import { WinTest } from "./winTest";

import ViewMines from "../components/viewMines";
import EncryptCode from "./encryptCells";

class AppMine extends React.Component {
    state = { mine: [], passiv: false }

    componentWillMount() {
        if (this.props.Reducer.Timer === "STOP" && this.props.StateSaver.cells.length === 0) {
            this.props.StateSaver.cells = CellsAdress();
        }
    }
    componentDidMount() {
        if (this.props.Reducer.Timer === "STOP" && this.props.StateSaver.EncryptCells.length === 0) {
            this.props.StateSaver.EncryptCells = EncryptCode(this.props.Reducer.Count);
            console.log(this.props.StateSaver.EncryptCells);
        }

    }

    componentWillUpdate(nextProps, nextState) {
        const test1 = nextProps.Reducer.Timer === "STOP" && this.props.Reducer.Timer !== "STOP";
        const test2 = nextProps.Reducer.Timer === "STOP" && this.props.Reducer.Count !== nextProps.Reducer.Count;
        if (test1 || test2) {
            this.props.StateSaver.cells = CellsAdress();
            this.setState({ mine: [], passiv: false });
        }
    }
    componentDidUpdate(prevProps, prevState) {

        const test1 = prevProps.Reducer.Timer !== "STOP" && this.props.Reducer.Timer === "STOP";
        const test2 = this.props.Reducer.Timer === "STOP" && this.props.Reducer.Count !== prevProps.Reducer.Count;;
        if (test1 || test2) {
            this.props.StateSaver.EncryptCells = EncryptCode(this.props.Reducer.Count);
            console.log(this.props.StateSaver.EncryptCells);
        }
    }


    viewButton(X, Y, event) {
        event.preventDefault();
        let { Mine, Move, Timer, Count } = this.props.Reducer;

        let oldFlag = this.props.StateSaver.cells[X][Y].flag;
        let cells = [...this.props.StateSaver.cells];

        if (event.type === 'click') {
            Timer = 'START';
            cells[X][Y] = { status: "disabledButton", flag: oldFlag };

            if (this.props.StateSaver.EncryptCells[X][Y] === "") {
                OpenCells(cells, this.props.StateSaver.EncryptCells);
            }
            else if (this.props.StateSaver.EncryptCells[X][Y] === "mine") {
                OpenMines(cells, this.props.StateSaver.EncryptCells);
                Timer = 'BOOM';
                this.setState({ mine: [X, Y], passiv: true });

            }
        }
        else if (event.type === 'contextmenu' && this.state.passiv === false) {
            cells[X][Y] = { status: "activeButton", flag: !oldFlag };
        }


        this.props.StateSaver.cells = cells;

        // Redux store
        if (Timer === "START" || Timer === "STOP") {
            if (oldFlag === false && cells[X][Y].flag) { Mine += 1; }
            else if (oldFlag && cells[X][Y].flag === false) { Mine -= 1; }
            Move += 1;

            if (WinTest(cells) === 100 - parseInt(Count)) {
                Timer = 'WIN';
                this.setState({ passiv: true });
            }
        }
        const obj = { Mine, Move, Timer, Count };
        this.props.SetDATAOFFIELD(obj);
    }


    handleClick(item, X, Y) {
        const key = `${X}_${Y}`;

        if (item.status === "activeButton" && item.flag === false) {
            return <button
                onClick={(event) => this.viewButton(X, Y, event)}
                onContextMenu={(event) => this.viewButton(X, Y, event)}
                className={item.status} key={key} disabled={this.state.passiv}></button >;
        }
        else if (item.status === "activeButton" && item.flag) {

            return <button
                onContextMenu={(event) => this.viewButton(X, Y, event)}
                className={item.status} key={key} disabled={this.state.passiv}><Flag /></button >;
        }
        else {
            const value = this.props.StateSaver.EncryptCells[X][Y];
            return <ViewMines value={value} mine={[...this.state.mine, X, Y]} item={item} key={key} />
        }
    }

    render() {
        return (<div id="fieldContainer">{this.props.StateSaver.cells.map((d, x) => d.map((d2, y) => this.handleClick(d[y], x, y)))}
        </div>)
    }
}


export default connect(state => ({ Reducer: state.Reducer, StateSaver: state.StateSaver }),
    dispatch => bindActionCreators({ SetDATAOFFIELD, SetSTATES }, dispatch))(AppMine);


