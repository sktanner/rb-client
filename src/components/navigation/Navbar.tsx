import React from 'react';
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap';
import Admin from '../admin/Admin';
// import { user } from '../../types'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


type NavBarProps = {
  isAdmin: string,
  token: string
}

type NavBarState = {
  user: {
    email: string,
    password: string,
    isAdmin: string
  }
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps) {
    super(props)
    this.state = {
      user: {
        email: "",
        password: "",
        isAdmin: ""
      }
    }
  }

  logout = (): void => {
    localStorage.clear()
    window.location.href = "/login"
  }

  // userMapper = (): React.Component => {
  //   // if (this.state.user.isAdmin == true) && {
  //   // return (this.props.users.map((user: user) => {            

  //     return (
  //           <>
  //           <Admin token={this.props.token} users={this.props.users}/>
  //           </>
  //       )
  //   // })
  // }


  render() {
    console.log(this.state.user.isAdmin);

    return (
      <div>
        <Navbar color="light">
          <NavbarBrand>Board Game Collection</NavbarBrand>
          {this.props.isAdmin == "true" && 
            <Router>
            <Link to="/admin">Admin</Link>
            <Switch>
            <Route path="/admin">
            <Admin token={this.props.token}/>
            </Route>
            </Switch>
            </Router>}
          <Button onClick={this.logout}>Logout</Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar