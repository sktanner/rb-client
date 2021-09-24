import React from 'react';
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap';
import Admin from '../admin/Admin';
import { user } from '../../types'


type NavBarProps = {
  users: user[],
  token: string,
}

type NavBarState = {}

class NavBar extends React.Component<NavBarProps, NavBarState> {

  logout = (): void => {
    localStorage.clear()
    window.location.href = "/login"
}

userMapper(): JSX.Element[] {
  return this.props.users.map((user: user) => {            
      return (
        <ul>{user.isAdmin}
          <Admin token={this.props.token} users={this.props.users}/>
          </ul>
      )
  })
}

  render() {
    return (
      <div>
        <Navbar color="light">
          <NavbarBrand>Board Game Collection</NavbarBrand>
          {/* if user.isAdmin = true, then show admin button */}
          {this.props.user.isAdmin == true &&
          <Button onClick={this.userMapper}>Admin</Button>}
            <Button onClick={this.logout}>Logout</Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar