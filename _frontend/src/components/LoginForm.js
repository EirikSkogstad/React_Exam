import React, { Component } from 'react';
import './login_form.css';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      loginUsername: '',
      loginPassword: '',
      createUsername: '',
      createPassword: '',
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
              <button>Create User</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  handleInputChange(event) {
    let value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  }

  // FIXME this code does not currently make sense
  /*
    This needs to be implemented:
    - Actually get username and password.
    - Url should point to authenticate endpoint
    - Dont set token if authentication failed
   */
  handleLoginSubmit(event) {
    const body = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    };
    const url = 'http://localhost:1234/authenticate/';

    const response = fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then(res => res.text());
    //.then(token => (localStorage.token = token));
    console.log(response);
    event.preventDefault();

  }

  handleCreateUserSubmit(event) {

  }
}

export default LoginForm;
