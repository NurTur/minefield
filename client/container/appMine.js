import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetDATAOFFIELD } from "../store/actions/field";

import React from 'react';
import Flag from "../components/flag";
import { OpenCells } from "./openCells";
import { OpenMines } from "./openMines";
import { CellsAdress } from "./cellsAdress";
import { WinTest } from "./winTest";

import ViewMines from "../components/viewMines";
import EncryptCode from "../services/encryptCells";



class AppMine extends React.Component {
    state = { cells: [], EncryptCells: [], mine: [], passiv: false }

    componentWillMount() { this.setState({ cells: CellsAdress() }) }
    componentDidMount() { this.fieldEncrypt(this.props.Reducer.Count); }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.Reducer.Timer === "STOP" && this.props.Reducer.Timer !== "STOP") {
            this.setState({ cells: CellsAdress(), mine: [], passiv: false });
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Reducer.Timer !== "STOP" && this.props.Reducer.Timer === "STOP") {
            this.fieldEncrypt(this.props.Reducer.Count);
        }
    }


    fieldEncrypt = async (mine_count) => {
        const EncryptCells = await EncryptCode(mine_count);
        console.log(EncryptCells);
        this.setState({ EncryptCells });
    };


    viewButton(X, Y, event) {
        event.preventDefault();
        let { Mine, Move, Timer, Count } = this.props.Reducer;

        let oldFlag = this.state.cells[X][Y].flag;
        let cells = [...this.state.cells];

        if (event.type === 'click') {
            Timer = 'START';
            cells[X][Y] = { status: "disabledButton", flag: oldFlag };

            if (this.state.EncryptCells[X][Y] === "") {
                OpenCells(cells, this.state.EncryptCells);
            }
            else if (this.state.EncryptCells[X][Y] === "mine") {
                OpenMines(cells, this.state.EncryptCells);
                Timer = 'BOOM';
                this.setState({ mine: [X, Y], passiv: true });

            }
        }
        else if (event.type === 'contextmenu' && this.state.passiv === false) {
            cells[X][Y] = { status: "activeButton", flag: !oldFlag };
        }


        this.setState({ cells });

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
            const value = this.state.EncryptCells[X][Y];
            return <ViewMines value={value} mine={[...this.state.mine, X, Y]} item={item} key={key} />
        }
    }

    render() {
        return (<div id="fieldContainer">{this.state.cells.map((d, x) => d.map((d2, y) => this.handleClick(d[y], x, y)))}
        </div>)
    }
}


export default connect(state => ({ Reducer: state.Reducer }),
    dispatch => bindActionCreators({ SetDATAOFFIELD }, dispatch))(AppMine);


