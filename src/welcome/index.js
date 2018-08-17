import React, { Component } from "react";
import { Container } from "reactstrap";
import "./style.css";

class Welcome extends Component {
  render() {
    return (
      <div id="welcome">
        <Container>
          <h2>Welcome</h2>
        </Container>
      </div>
    );
  }
}

export default Welcome;
