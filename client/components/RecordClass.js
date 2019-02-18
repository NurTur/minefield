import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";


class RecordClass extends React.Component {

    render() {
        return <div id="PageView">
            <header>
                <div id="headerPage">
                    <div className="headerContainer" >
                        <div className="greeting1"><div className="text">Wellcome,</div></div>
                        <div className="greeting2"><div className="text">{this.props.User.username} !!!</div></div>
                        <div className="navig">
                            <NavLink to="/game" id="nav1">Game</NavLink>
                            <NavLink to="/" id="nav1">Logout</NavLink>
                        </div>
                    </div>
                </div>
            </header>
            <main>
                {(this.props.Records.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                <th className="column1">COUNT MINES</th>
                                <th className="column2">USERNAME</th>
                                <th className="column3">RECORDS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.Records.map((d, i) =>
                                <tr key={i}>
                                    <td>{Math.floor(i / 2) * 5 + 10}</td>
                                    {d.name !== "" ? <td>{d.name}</td> : <td style={{ color: "red" }}>none</td>}
                                    {d.answer > 0 ? (i % 2 === 0 ? <td>{d.answer} moves</td> : <td>{d.answer} seconds</td>) : <td style={{ color: "red" }}>none</td>}
                                </tr>
                            )}
                        </tbody>
                    </table>)}
            </main>
        </div>


    }
}


export default connect(state => ({ User: state.User, Records: state.Records }))(RecordClass);