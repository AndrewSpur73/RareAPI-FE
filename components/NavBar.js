import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Image,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ fontSize: '30px', background: '#080a2b' }}>
      <Container>
        <Link passHref href="/">
          <Image src="/images/logo2.png" alt="Redacted" height={100} width={300} className="cursor-pointer" style={{ marginLeft: '50px' }} />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Left-aligned items */}
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/feed">
              <Nav.Link>Feed</Nav.Link>
            </Link>
            <Link passHref href="/new">
              <Nav.Link>Add a Post</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>Tags</Nav.Link>
            </Link>
          </Nav>

          {/* Right-aligned items */}
          <Nav>
            <Link passHref href="/users">
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
