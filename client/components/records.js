import React from "react";
import GetRecords from "../services/getRecords";

class Records extends React.Component {
    state = { loader: [] }


    componentDidMount() {
        this.onGetRecords();
    }

    onGetRecords = async () => {
        try {
            const result = await GetRecords();

            let arr = [];
            [...Array(14).keys()].forEach(x => {
                arr.push({ name: "", answer: 0 });
            });

            result.forEach((e, i) => {
                [...Array(14).keys()].forEach(i => {
                    if (e.myrecord[i] !== 0 && e.myrecord[i] < arr[i].answer) { arr[i].answer = e.myrecord[i]; arr[i].name = e.username; }
                    if (arr[i].answer === 0 && e.myrecord[i] > arr[i].answer) { arr[i].answer = e.myrecord[i]; arr[i].name = e.username; }
                });
            });

            this.setState({ loader: arr });
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        console.log("loader ", this.state.loader);
        return (
            <div id="firstPage">
                <div className="container">
                    <header className="header">
                        <nav id="nav1">Game</nav>
                        <nav id="nav1">Logout</nav>
                    </header>
                    <main className="main">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="column1">COUNT MINES</th>
                                    <th className="column2">USERNAME</th>
                                    <th className="column3">RECORDS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loader.map((d, i) =>
                                    <tr key={i}>
                                        <td>{Math.floor(i / 2) * 5 + 10}</td>

                                        {d.name !== "" ? <td>{d.name}</td> : <td style={{ color: "red" }}>none</td>}
                                        {d.answer > 0 ? (i % 2 === 0 ? <td>{d.answer} moves</td> : <td>{d.answer} seconds</td>) : <td style={{ color: "red" }}>none</td>}

                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </main>
                </div></div>)
    }
}

export default Records;