import React, { Component } from "react";
import SmallPopUp from "./SmallPopUp";
import sampleData from "./sampleData.json";
import "./styles/App.css";

class App extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isBtnClicked: false,
            popupType: "",
            popupMsg: "",
        };

        this.resetPopup = this.resetPopup.bind(this);
        this.loadData = this.loadData.bind(this);
        this.deleteLastRow = this.deleteLastRow.bind(this);
        this.addRow = this.addRow.bind(this);
    }

    resetPopup() {
        this.setState({
            isBtnClicked: false,
            popupType: "",
            popupMsg: "",
        });
    }

    loadData() {
        const { data } = this.state;

        if (data.length === 0) {
            this.setState({
                data: sampleData,
                isBtnClicked: true,
                popupType: "success",
                popupMsg: "Data has beed loaded",
            });
        } else {
            this.setState({
                isBtnClicked: true,
                popupType: "error",
                popupMsg: "Data is already loaded",
            });
        }
    }

    deleteLastRow() {
        const { data } = this.state;

        if (data.length !== 0) {
            let tempName = data[data.length - 1].name;
            data.pop();

            this.setState({
                data: data,
                isBtnClicked: true,
                popupType: "success",
                popupMsg: `${tempName} has been deleted`,
            });
        } else {
            this.setState({
                isBtnClicked: true,
                popupType: "error",
                popupMsg: "No data found",
            });
        }
    }

    addRow() {
        const { data } = this.state;

        if (data.length !== 0) {
            let tempName = data[0].name;
            data.push(data[0]);

            this.setState({
                data: data,
                isBtnClicked: true,
                popupType: "success",
                popupMsg: `${tempName} has been added`,
            });
        } else {
            this.setState({
                isBtnClicked: true,
                popupType: "error",
                popupMsg: "No data found",
            });
        }
    }

    render() {
        const { data, isBtnClicked, popupType, popupMsg } = this.state;

        let content = data.map((row) => {
            let domains = (
                <ul>
                    {row.domains.map((domain) => {
                        return <li>{domain}</li>;
                    })}
                </ul>
            );

            let web_pages = (
                <ul>
                    {row.web_pages.map((web_page) => {
                        return (
                            <li>
                                <a href={web_page}>{web_page}</a>
                            </li>
                        );
                    })}
                </ul>
            );

            let state_province = row["state-province"] || "N/A";

            return (
                <tr>
                    <td className="m2">{domains}</td>
                    <td className="m3">{web_pages}</td>
                    <td className="m1">{state_province}</td>
                    <td className="m3">{row.name}</td>
                    <td className="m15">{row.country}</td>
                    <td className="m15">{row.alpha_two_code}</td>
                </tr>
            );
        });

        let table = (
            <table>
                <tr className="table-heading">
                    <th className="m2">Domains</th>
                    <th className="m3">Web Pages</th>
                    <th className="m1">State Province</th>
                    <th className="m3">Name</th>
                    <th className="m15">Country</th>
                    <th className="m15">Alpha Two Code</th>
                </tr>

                <tr>
                    <td colspan="6">
                        <div className="table-content">
                            {data.length !== 0 ? (
                                content
                            ) : (
                                <div className="no-data-msg">
                                    <p>
                                        Table has no data. Click '<span onClick={this.loadData}>Load</span>' to load
                                        data.
                                    </p>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            </table>
        );

        let popup;
        if (isBtnClicked) {
            popup = <SmallPopUp type={popupType} text={popupMsg} onFinish={this.resetPopup} />;
        }

        return (
            <div className="app">
                <div className="header">
                    <div className="header-content">
                        <h1>Drive IQ React Task</h1>
                        <h2>By Viktoriya Voblikova</h2>
                        <div className="btn-container">
                            <button className="load-btn" onClick={this.loadData}>
                                Load
                            </button>
                            <button className="delete-btn" onClick={this.deleteLastRow}>
                                Delete
                            </button>
                            <button className="add-btn" onClick={this.addRow}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
                {table}
                {popup}
            </div>
        );
    }
}

export default App;
