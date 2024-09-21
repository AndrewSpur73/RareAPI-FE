import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Image,
} from 'react-bootstrap';
import UserMenu from './UserMenu';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() { // assuming 'user' is passed as a prop
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ fontSize: '30px', background: '#080a2b', color: '#ffffff' }}>
      <Container>
        <Link passHref href="/">
          <Image
            src="/images/logo2.png"
            alt="Redacted"
            height={100}
            width={300}
            className="cursor-pointer"
            style={{ marginLeft: '50px' }}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned items */}
          <Nav className="me-auto">
            <Link passHref href="/feed">
              <Nav.Link className="navbar-text">Feed</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link className="navbar-text">Add a Post</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link className="navbar-text">Tags</Nav.Link>
            </Link>
          </Nav>

          {/* Right-aligned items */}
          <Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {user.id && ( // only show UserMenu if the user is logged in
              <div className="userMenu">
                <UserMenu />
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
