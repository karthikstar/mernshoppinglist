import React, { Component, Fragment} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    // NavbarText,
    Container
  } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';

  class AppNavbar extends Component {
    state = {
        isOpen : false
    };

    static propTypes = {
        auth:PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen:!this.state.isOpen
        });
    }
    render(){
        const {isAuthenticated, user} = this.props.auth
        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span> 
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal /> 
                </NavItem>
                <NavItem>
                    <LoginModal /> 
                </NavItem>
            </Fragment>
        );

        return(
            <div>
            <Navbar color = "dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar >
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );

    }
}
// if authenticated, then authLinks will show which is the logout componment
// if nt authenticated, then guestlinks will be shown instead, which has register and login components


const mapStateToProps = state => ({
    auth:state.auth
});




export default connect(mapStateToProps,null)(AppNavbar);
//   first param of connect is mapStateToProps if u have to use some piece of state in the app or else set it to null
// 2nd param af connect is any action functions u want to use from reducers, {register, logout} for eg
// in the next () put the component to which u want to pass these functions and pieces of state. 
