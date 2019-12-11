import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const NavBar = props => {
	let { isAuthenticated, user } = props;
	return (
		<Navbar className="bg-primary justify-content-between">
			<Navbar.Brand href="/">InstaCar</Navbar.Brand>
			<Navbar.Toggle aria-controls="toggle-navbar" />
			<Navbar.Collapse id="navbar-nav">
				<Nav className="ml-auto">
					<Nav.Item>
						<span>
							<FontAwesomeIcon icon={faPhone} style={{ transform: 'rotate(100deg)' }} />
						</span>
						+91 8890232339
					</Nav.Item>
					{isAuthenticated && user._id ? (
						<NavLink to="/auth/logout" className="px-2 text-dark">
							<span className="px-1">
								<FontAwesomeIcon icon={faSignOutAlt} />
							</span>
							Logout
						</NavLink>
					) : null}
					{!isAuthenticated ? (
						<NavLink to="/auth/signin" className="px-2 text-dark">
							<span className="px-1">
								<FontAwesomeIcon icon={faSignInAlt} />
							</span>
							Signin
						</NavLink>
					) : null}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default NavBar;
