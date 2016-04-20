import React, { Component, PropTypes } from 'react';
import s from './SettingsPage.scss';
import Bridge from '../../actions/bridge';

class UserForm extends Component {
  static propTypes = {
    ip: PropTypes.string.isRequired,
    onBridgeSaved: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      attemptedRegistration: false,
      registerUserError: false,
    };
  }

  onBridgeSaved(bridgeAndConnection) {
    this.props.onBridgeSaved(bridgeAndConnection);
  }

  onBridgeSaveError(response) {
    console.error('failed to save bridge info', response);
  }

  onRegisterUserError(response) {
    console.error('failed to register bridge user', response);
    this.setState({ registerUserError: true });
  }

  onUserChange(e) {
    this.setState({ user: e.target.value.trim() });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ registerUserError: false });
    if (typeof this.state.user !== 'string' || this.state.user.length < 1) {
      return;
    }
    Bridge.save(this.props.ip, this.state.user).
           then(this.onBridgeSaved.bind(this)).
           catch(this.onBridgeSaveError.bind(this));
  }

  registerUser() {
    const user = 'hue-steamer';
    Bridge.registerUser(this.props.ip, user).
           then(this.onBridgeSaved.bind(this)).
           catch(this.onRegisterUserError.bind(this));
    this.setState({
      attemptedRegistration: true,
      registerUserError: false,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        {this.state.registerUserError ? (
          <p className={s.error}>
            There was an error registering a user on your Philips Hue
            bridge. Did you press the Link button on your bridge?
          </p>
        ) : ''}
        <div className={s.formGroup}>
          <label htmlFor="user">
            If you already have a user on this Philips Hue bridge, you can enter
            the name here:
          </label>
          <input type="text" id="user" onChange={this.onUserChange.bind(this)}
            className={s.userField}
          />
          <button type="submit" className={s.inlineButton}>
            Save
          </button>
        </div>
        <div>
          <p>
            Or, if you do not have a user on your bridge yet, please press the
            link button on your Philips Hue bridge, then click the button below:
          </p>
          <button type="button" onClick={this.registerUser.bind(this)}>
            Register User
          </button>
        </div>
      </form>
    );
  }
}

export default UserForm;
