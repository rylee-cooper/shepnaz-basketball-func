import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../images/shepnaz-logo.png';

const links = [
    {
        text: 'Teams',
        url: '/Team'
    },
    {
        text: 'Players',
        url: '/Player'
    },
    {
        text: 'Coaches',
        url: '/Coach'
    },
    {
        text: 'Leagues',
        url: '/League'
    },
    {
        text: 'Seasons',
        url: '/Season'
    }
];

const NavMenu = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" className="mb-lg-5 mb-sm-3">
                <Container>
                    <LinkContainer to="/" data-rb-event-key="/">
                        <Navbar.Brand>
                            <img src={logo} alt="Shepnaz Logo" className="shepnaz-nav-logo pl-3" />
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {links.map(link =>
                                <LinkContainer to={link.url} key={link.url}>
                                    <Nav.Link active={false /*setting this to false ensures programmatically switching routes causes active link to update*/}>
                                        {link.text}
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header>
    );
}

export default NavMenu;