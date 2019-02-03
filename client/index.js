import React from 'react';
import ReactDOM from 'react-dom';
import { CellsAdress } from "./components/cellsAdress";

import "./myStyles.scss";




class App extends React.Component {
  state = { cells: [] }

  componentWillMount() {
    this.setState({ cells: CellsAdress("first_level") })
  }

  viewButton(item, index) {
    console.log(item, index);
    const { cells } = this.state;
    const obj = { adress: "disabledButton", value: "Empty" }
    const arr = (cells.slice(0, index).concat(obj)).concat(cells.slice(index + 1));
    this.setState({ cells: arr });
  }


  handleClick = (item, index) => {
    if (item.value === "") {
      return <button onClick={() => this.viewButton(item, index)


      } id={item.adress} key={item.adress} ></button >;
    } else { return <button disabled></button> }
  }

  render() {
    const { cells } = this.state;
    console.log(cells);
    return (<div id="first_container">{cells.map((d, i) => this.handleClick(d, i))}</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
//