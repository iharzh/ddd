import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

interface HeaderProps {
  currentUser: {firstName: string; lastName: string} | undefined;
  handleLogout: () => void;
}

const Header = ({currentUser, handleLogout}: HeaderProps) => {

  return (
    <Navbar bg="light" expand="md">
      <LinkContainer to="/">
        <Navbar.Brand>Travel</Navbar.Brand>
      </LinkContainer>
      <LinkContainer to="/users">
        <Nav.Link>Users</Nav.Link>
      </LinkContainer>
      {currentUser && (
        <>
          <Navbar.Text>
            {currentUser.firstName} {currentUser.lastName}
          </Navbar.Text>
          <Nav.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav.Item>
        </>
      )}
    </Navbar>
  );
};

export default Header;
