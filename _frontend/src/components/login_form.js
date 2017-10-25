import React, { Component } from 'react';
import 'login_form.css';

class LoginFormComponent extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="login-form-container col-sm-12 col-xl-8">
        <form onSubmit={this.handleSubmit}>
          <input id="usernameInput" type="text" />
          <input id="passwordInput" type="password" />
          <button>Login</button>
        </form>
      </div>
    );
  }

  handleSubmit(event) {}
}
