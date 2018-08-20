import React, {Component} from "react";
import { Button } from "reactstrap";
import {withRouter} from "react-router-dom";

import Auth from "../auth/Auth";
import getGapi from "./getGapi";

class Logout extends Component {

  constructor(props) {
    super(props);
    getGapi(window, document).then(this.gapiSetup.bind(this));
  }
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
    Auth.authenticate(() => this.setState({ redirectToReferrer: true }))
  }

  updateSigninStatus(updSt) {
    const auth = this.doAuth.bind(this)
    if(updSt){
      auth();
    }
  }



  doGLogout() {
    const { gapi } = this.state;
    gapi.auth2.getAuthInstance().signOut()
      .then(gapi.auth2.getAuthInstance().disconnect());

      Auth.signout(() => this.props.history.push("/"))
  }

  render() {

    return (
      <div>
      {
        Auth.isAuthenticated ?
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

const LogOut = withRouter(Logout);

export default LogOut;
