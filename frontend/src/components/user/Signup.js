import React, { useState, useReducer, Component } from "react";
import axios from "axios";
class Signup extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
      open: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: "" });
    this.setState({
      [name]: event.target.value
    });
  };

  formSumbit = event => {
    event.preventDefault();
    const { name, email, password } = this.state;
    const user = {
      name,
      email,
      password
    };

    this.Signup(user).then(data => {
      if (data.error)
        this.setState({
          error: data.error
        });
      else
        this.setState({
          name: "",
          email: "",
          password: "",
          error: "",
          open: true
        });
    });
  };

  Signup = user => {
    // return axios.post("/signup", {
    //   user
    // })

    return fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  render() {
    const { name, email, password, error, open } = this.state;
    return (
      <div className="container">
        <h2 className="mt-5 mb-5"> Signup </h2>{" "}
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        <div
          className="alert alert-info"
          style={{ display: open ? "" : "none" }}
        >
          New Account is created Sign in
        </div>
        <form action="">
          <div className="form-group">
            <label className="text-muted"> Name </label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("name")}
              value={name}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <label className="text-muted"> Email </label>{" "}
            <input
              type="email"
              className="form-control"
              onChange={this.handleChange("email")}
              value={email}
            />{" "}
          </div>{" "}
          <div className="form-group">
            <label className="text-muted"> Password </label>{" "}
            <input
              type="text"
              className="form-control"
              onChange={this.handleChange("password")}
              value={password}
            />{" "}
          </div>{" "}
          <button
            onClick={this.formSumbit}
            className="btn btn-raised btn-primary"
          >
            Sumbit{" "}
          </button>{" "}
        </form>{" "}
      </div>
    );
  }
}

export default Signup;
