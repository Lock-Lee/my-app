import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      keyword: "",
      array: [],
      edittext: "",
    };
  }
  ChangeData(e, t) {
    this.setState({
      keyword: e,
      edittext: e,
    });
  }
  addData(text, idx) {
    if (text === "edit") {
      let { array } = this.state;
      array[idx].key = false;
      array[idx].text = this.state.keyword;
      this.setState({ array: array, keyword: "", show: false });
    } else {
      let { array } = this.state;
      array.push({ text: this.state.keyword, key: false });
      this.setState({ array: array, keyword: "" });
    }
  }
  display(text, key) {
    return (
      <>
        <textarea
          value={text}
          onChange={(e) => {
            this.ChangeData(e.target.value);
          }}
        ></textarea>
        <button
          onClick={() => {
            this.addData("add");
            this.setState({
              show: false,
            });
          }}
        >
          save
        </button>
        <button
          onClick={() => {
            this.setState({
              show: true,
            });
          }}
        >
          cencel
        </button>
      </>
    );
  }
  edit(idx) {
    let { array } = this.state;
    array[idx].key = true;
    this.setState({ array: array, keyword: "" });
  }
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.show ? (
          <>{this.display()}</>
        ) : (
          <>
            <button
              onClick={() => {
                this.setState({
                  show: true,
                });
              }}
            >
              + add new
            </button>
          </>
        )}
        {this.state.array.map((item, idx) => {
          return (
            <div key={idx}>
              {item.key ? (
                <>
                  {" "}
                  <textarea
                    key={idx}
                    value={this.state.edittext}
                    onChange={(e) => {
                      this.ChangeData(e.target.value, item.text);
                    }}
                  ></textarea>
                  <button
                    onClick={() => {
                      this.addData("edit", idx);
                      this.setState({
                        show: false,
                      });
                    }}
                  >
                    save
                  </button>
                  <button
                    onClick={() => {
                      this.setState({
                        show: true,
                      });
                    }}
                  >
                    cencel
                  </button>
                </>
              ) : (
                <>
                  {item.text}{" "}
                  <button
                    onClick={() => {
                      this.edit(idx);
                      this.setState({ edittext: item.text });
                    }}
                  >
                    edit
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}
