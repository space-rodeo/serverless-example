import React from 'react';
import { Nav, NavItem, Navbar } from 'reactstrap';
import { Link, Outlet } from 'react-router-dom';

import './App.css';

function App() {
    return (
        <div className='App'>
            <Navbar className='navbar'>
                <Nav>
                    <NavItem>
                        <Link to='/' className='nav-home-link'>Serverless Example</Link>
                    </NavItem>
                </Nav>
            </Navbar>
            <div id='main'>
                <Outlet />
            </div>
        </div>
    );
}

export default App;