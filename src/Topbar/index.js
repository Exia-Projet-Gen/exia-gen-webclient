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
                        <NavItem eventKey={1} href="#" active={this.props.activeTable === "dictionary"} onClick={() => (this.props.onClick("dictionary"))}>Dictionary</NavItem>
                        <NavItem eventKey={2} href="#" active={this.props.activeTable === "files"} onClick={() => (this.props.onClick("files"))}>Decoded files</NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Topbar;