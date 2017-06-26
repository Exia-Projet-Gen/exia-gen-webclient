import React, { Component } from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

import './style.css';

class Topbar extends Component {
    render() {
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/home">EXIA - Gen project</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">Create</NavItem>
                        <NavItem eventKey={2} href="#">Read</NavItem>
                        <NavItem eventKey={2} href="#">Update</NavItem>
                        <NavItem eventKey={2} href="#">Delete</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Topbar;