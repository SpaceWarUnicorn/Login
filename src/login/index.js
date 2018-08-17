import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container, Button } from "reactstrap";
import getGapi from "./getGapi";
import Auth from "../auth/Auth";
import "./style.css";

class Login extends Component {
  state = {
    redirectToReferrer: false
  };

  gapiSetup(gapi) {
    const updateSigninStatus = this.updateSigninStatus.bind(this);
    const clientConfig = {
      clientId: "78234197602-vbeqsvaqnujugs56k6u72v7l5t078v0f.apps.googleusercontent.com",
      scope: "profile"
    }
    gapi.client
      .init(clientConfig)
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      });
    this.setState({ gapi, gapiReady: true });
  }

  doAuth(){
    Auth.authenticate(() => {this.setState({ redirectToReferrer: true }); console.log('workeo')})
    console.log('workeo')
  }

  doGLogin() {
    const { gapi } = this.state;
    gapi.auth2.getAuthInstance().signIn();

  }


  updateSigninStatus(updSt) {
    console.log("Status update", updSt);
    const auth = this.doAuth.bind(this)
    if(updSt){
      console.log("Status update", updSt);
      auth();
    }
}

  constructor(props) {
    super(props);
    getGapi(window, document).then(this.gapiSetup.bind(this));
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {

      return <Redirect to={from} />;
    }

    return (
      <div id="login">
        <Container>
          <h2 className="text-center">Login</h2>

          <Button onClick={this.doGLogin.bind(this)}>G Login</Button>

        </Container>
      </div>
    );
  }
}

export default Login;
