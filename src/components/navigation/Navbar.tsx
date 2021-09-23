import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Button,
} from 'reactstrap';

class NavBar extends React.Component {

  logout = (): void => {
    localStorage.clear()
    window.location.href = "/login"
}

  render() {
    return (
      <div>
        <Navbar color="light">
          <NavbarBrand>Board Game Collection</NavbarBrand>
            <Button onClick={this.logout}>Logout</Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar