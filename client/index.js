import React from 'react';
import ReactDOM from 'react-dom';

import Flag from "./components/flag";
import { OpenCells } from "./container/openCells";
import { OpenMines } from "./container/openMines";
import { CellsAdress } from "./container/cellsAdress";
import ViewMines from "./container/viewMines";

import EncryptCode from "./services/encryptCells";


import "./scss/myStyles.scss";
import "./scss/flag.scss";




class App extends React.Component {
  state = { cells: [], EncryptCells: [], mine: [] }

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
      if (this.state.EncryptCells[X][Y] === "") {
        OpenCells(cells, this.state.EncryptCells);
      }
      else if (this.state.EncryptCells[X][Y] === "mine") {
        OpenMines(cells, this.state.EncryptCells);
        this.setState({ mine: [X, Y] })
      }
    }
    else if (event.type === 'contextmenu') {
      cells[X][Y] = { status: "activeButton", flag: !oldFlag };
    }
    this.setState({ cells });
  }


  handleClick(item, X, Y) {
    const key = `${X}_${Y}`;

    if (item.status === "activeButton" && item.flag === false) {
      return <button
        onClick={(event) => this.viewButton(X, Y, event)}
        onContextMenu={(event) => this.viewButton(X, Y, event)}
        className={item.status} key={key} ></button >;
    }
    else if (item.status === "activeButton" && item.flag) {

      return <button
        onContextMenu={(event) => this.viewButton(X, Y, event)}
        className={item.status} key={key} ><Flag /></button >;
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

ReactDOM.render(<App />, document.getElementById('app'));
