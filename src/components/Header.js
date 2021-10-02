import React, { Component } from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
export class Header extends Component {
  render() {
    return (
      <>
        {this.props.isAuthenticated ? <>
          <Navbar bg="success" variant="light">
            <Container>
              <Navbar.Brand href="#home">{this.props.myName}</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link tag={Link} to="/home" href="/home">Home</Nav.Link>
                <Nav.Link tag={Link} to='/home' href="/profile">Profile</Nav.Link>
                <LogoutButton />
              </Nav>
            </Container>
          </Navbar>
        </> : <Navbar bg="success" variant="light">
          <Container>
            <Navbar.Brand href="#home">401 EXAM</Navbar.Brand>
            <Nav className="me-auto">
              <LoginButton />
            </Nav>
          </Container>
        </Navbar>}
      </>
    )
  }
}
export default Header