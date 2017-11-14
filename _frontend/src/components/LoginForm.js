import React, { Component } from 'react';
import './login_form.css';

class LoginForm extends Component {
  constructor(submitHandler, setUsernameHandler, backendUrl) {
    super(submitHandler, setUsernameHandler, backendUrl);
    this.state = {
      loginUsername: '',
      loginPassword: '',
      createUsername: '',
      createPassword: '',
      createPasswordVerify: '',
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleCreateUserSubmit = this.handleCreateUserSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="form-container col-sm-12 col-xl-6">
            <form onSubmit={this.handleLoginSubmit}>
              <h3>Login:</h3>
              <label htmlFor="loginUsernameInput">Username:</label>
              <input
                name="loginUsername"
                onChange={this.handleInputChange}
                value={this.state.loginUsername}
                id="loginUsernameInput"
                type="text"
                required
              />
              <br />
              <label htmlFor="loginPasswordInput">Password:</label>
              <input
                name="loginPassword"
                onChange={this.handleInputChange}
                value={this.state.loginPassword}
                id="loginPasswordInput"
                type="password"
                required
              />
              <button>Login</button>
            </form>
          </div>

          <div className="form-container col-sm-12 col-xl-6">
            <form onSubmit={this.handleCreateUserSubmit}>
              <h3>New User:</h3>
              <label htmlFor="createUsernameInput">Username:</label>
              <input
                name="createUsername"
                onChange={this.handleInputChange}
                value={this.state.createUsername}
                id="createUsernameInput"
                type="text"
                required
              />
              <br />
              <label htmlFor="createPasswordInput">Password:</label>
              <input
                name="createPassword"
                onChange={this.handleInputChange}
                value={this.state.createPassword}
                id="createPasswordInput"
                type="password"
                required
              />
              <br />
              <label htmlFor="createPasswordVerify">VerifyPassword:</label>
              <input
                name="createPasswordVerify"
                onChange={this.handleInputChange}
                value={this.state.createPasswordVerify}
                id="createPasswordVerifyInput"
                type="password"
                required
              />
              <button>Create User</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(e) {
    let value = e.target.value;
    const name = e.target.name;

    this.setState({
      [name]: value,
    });
  }

  async handleLoginSubmit(e) {
    e.preventDefault();
    const body = {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    };
    const url = `${this.props.backendUrl}/authenticate/`;
    this.props.setUsernameHandler(this.state.loginUsername);
    this.postAndSetToken(url, body);
  }

  handleCreateUserSubmit(e) {
    e.preventDefault();
    if (this.state.createPassword !== this.state.createPasswordVerify) {
      LoginForm.displayError('Passwords do not match!');
      return;
    }
    const body = {
      username: this.state.createUsername,
      password: this.state.createPassword,
    };

    const url = `${this.props.backendUrl}/users/`;

    this.props.setUsernameHandler(this.state.createUsername);
    this.postAndSetToken(url, body);
  }

  async postAndSetToken(url, body) {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.text();
      LoginForm.displayError(error);
      return;
    }

    const token = await res.text();
    localStorage.setItem('token', token);

    this.resetState();
    this.props.submitHandler();
  }

  resetState() {
    this.setState({
      loginUsername: '',
      loginPassword: '',
      createUsername: '',
      createPassword: '',
      createPasswordVerify: '',
    });
  }

  static displayError(message) {
    alert(message);
  }

  static isNullOrEmpty(items) {
    for (let obj in items) {
      if (obj === null || obj === undefined || obj === '') {
        return true;
      }
    }
    return false;
  }
}

export default LoginForm;
