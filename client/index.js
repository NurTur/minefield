import React from 'react';
import ReactDOM from 'react-dom';
import { CellsAdress } from "./components/cellsAdress";
import Flag from "./components/flag";

import "./scss/myStyles.scss";
import "./scss/flag.scss";



class App extends React.Component {
  state = { cells: [] }

  componentWillMount() {
    this.setState({ cells: CellsAdress("first_level") })
  }

  viewButton(item, index, event) {
    event.preventDefault();
    if (event.type === 'click') {
      const cells = [...this.state.cells];
      cells[index] = { adress: "disabledButton", value: "Empty", key: item.key, flag: !item.flag };
      this.setState({ cells });
    }
    else if (event.type === 'contextmenu') {
      const cells = [...this.state.cells];
      cells[index].flag = !item.flag;
      this.setState({ cells });
    }
  }


  handleClick = (item, index) => {
    if (item.value === "" && item.flag === false) {
      return <button
        onClick={(event) => this.viewButton(item, index, event)}
        onContextMenu={(event) => this.viewButton(item, index, event)}
        id={item.adress} key={item.key} ></button >;
    }
    else if (item.value === "" && item.flag) {
      return <button
        onContextMenu={(event) => this.viewButton(item, index, event)}
        id={item.adress} key={item.key} ><Flag /></button >;
    }
    else { return <button id={item.adress} key={item.key} disabled></button> }
  }




  render() {
    const { cells } = this.state;
    console.log(cells);
    return (<div id="first_container">{cells.map((d, i) => this.handleClick(d, i))}</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
