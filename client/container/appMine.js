import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { SetMINE, SetMOVE, SetTIMER } from "../store/actions";



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

    componentWillMount() {
        this.setState({ cells: CellsAdress("first_level") })
    }

    componentDidMount() { this.fieldEncrypt(); }

    fieldEncrypt = async () => {
        const EncryptCells = await EncryptCode("first_level");
        console.log(EncryptCells);
        this.setState({ EncryptCells });
    };

    viewButton(X, Y, event) {
        event.preventDefault();

        let oldFlag = this.state.cells[X][Y].flag;
        let cells = [...this.state.cells];

        if (event.type === 'click') {
            cells[X][Y] = { status: "disabledButton", flag: oldFlag };
            this.props.SetTIMER('START');
            if (this.state.EncryptCells[X][Y] === "") {
                OpenCells(cells, this.state.EncryptCells);
            }
            else if (this.state.EncryptCells[X][Y] === "mine") {
                OpenMines(cells, this.state.EncryptCells);
                this.props.SetTIMER('BOOM');
                this.setState({ mine: [X, Y], passiv: true })
            }
        }
        else if (event.type === 'contextmenu') {
            cells[X][Y] = { status: "activeButton", flag: !oldFlag };
        }

        this.setState({ cells });

        // Redux store

        if (oldFlag === false && cells[X][Y].flag) { this.props.SetMINE(this.props.Reducer.Mine + 1); }
        else if (oldFlag && cells[X][Y].flag === false) { this.props.SetMINE(this.props.Reducer.Mine - 1); }
        this.props.SetMOVE(this.props.Reducer.Move + 1);


        if (WinTest(cells) === 71) {
            this.props.SetTIMER('WIN');
            this.setState({ passiv: true });
        }
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
        return (<div id="first_container">{this.state.cells.map((d, x) => d.map((d2, y) => this.handleClick(d[y], x, y)))}
        </div>)
    }
}



export default connect(
    state => ({
        Reducer: state.Reducer
    }),
    dispatch =>
        bindActionCreators(
            {
                SetMINE, SetMOVE, SetTIMER
            },
            dispatch
        )
)(AppMine);
