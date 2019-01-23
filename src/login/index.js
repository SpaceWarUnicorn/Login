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
      clientId: "{your google clientID}",
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
    Auth.authenticate(() => this.setState({ redirectToReferrer: true }));
  }

  doGLogin() {
    const { gapi } = this.state;
    gapi.auth2.getAuthInstance().signIn();
  }


  updateSigninStatus(updSt) {
    const auth = this.doAuth.bind(this)
    if(updSt){
      auth();
    }
}

  componentDidMount(){
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


      {
        !Auth.isAuthenticated ?
        (  <div>
            <Container>
              <h2 className="text-center">Login</h2>
              <Button onClick={this.doGLogin.bind(this)}>G Login</Button>
            </Container>
          </div>
         )
       :
       (<div></div>)
    }
      </div>
    );
  }
}

export default Login;
