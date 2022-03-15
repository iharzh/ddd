import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface HeaderProps {
  currentUser: { firstName: string; lastName: string; id: string } | undefined;
  handleLogout: () => void;
}

const Header = ({ currentUser, handleLogout }: HeaderProps) => {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="px-3">
      <Nav className="me-auto">
        <LinkContainer to="/">
          <Navbar.Brand>Travel</Navbar.Brand>
        </LinkContainer>
        <LinkContainer to="/users">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/locations">
          <Nav.Link>Locations</Nav.Link>
        </LinkContainer>
      </Nav>
      {currentUser && (
        <>
          <Navbar.Text>
            <LinkContainer to={`/users/${currentUser.id}`}>
              <Nav.Link>
                {currentUser.firstName} {currentUser.lastName}
              </Nav.Link>
            </LinkContainer>
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
