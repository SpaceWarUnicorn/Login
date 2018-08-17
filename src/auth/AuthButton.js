import React, {Component} from "react";
import { Button } from "reactstrap";
import { Redirect, withRouter } from "react-router-dom";

import fakeAuth from "./fakeAuth";
import getGapi from "../login/getGapi";

class Logout extends Component {
  state = {
    redirectToReferrer: false
  };

  constructor() {
    super();
    getGapi(window, document).then(this.gapiSetup.bind(this));
  }
  gapiSetup(gapi) {
    console.log("gapi in gapiSetup for logout", gapi);
    const clientConfig = {
      clientId: "78234197602-vbeqsvaqnujugs56k6u72v7l5t078v0f.apps.googleusercontent.com",
      scope: "profile"
    }
    gapi.client
      .init(clientConfig)
    this.setState({ gapi, gapiReady: true });
  }

  doGLogout() {
    const { gapi } = this.state;
    gapi.auth2.getAuthInstance().signOut()
      .then(gapi.auth2.getAuthInstance().disconnect()
        .then(console.log('disconnected')));

      fakeAuth.signout()

    this.setState({ redirectToReferrer: true })
  }

  render() {
      const { redirectToReferrer } = this.state;

      if (redirectToReferrer === true && window.location.pathname !== '/') {

        return <Redirect to ='/' />;
      }

      if(window.location.pathname === '/' && redirectToReferrer === true ){
        this.setState({ redirectToReferrer: false });
      }


    return (
      <div>
      {
        fakeAuth.isAuthenticated ?
        (this.state.gapiReady && (
         <div>
           Hola!  <Button onClick={this.doGLogout.bind(this)}>G Logout</Button>
         </div>
         )
       )
       : (
         <div>
          <p>You are not logged in.</p>
         </div>
       )
     }
       </div>
    );
  }
}

export default Logout;
