import React from 'react';
import { Navbar, NavbarBrand, Button, NavLink } from 'reactstrap';
import Admin from '../admin/Admin';
import { user } from '../../types'


type NavBarProps = {
  users: user[],
  token: string,
}

type NavBarState = {
  user: {
    email: string,
    password: string,
    isAdmin: boolean
  }
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
  constructor(props: NavBarProps){
    super(props)
    this.state={
      user: {
        email: "",
        password: "",
        isAdmin: false
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
    console.log(this.state.user);
    
    return (
      <div>
        <Navbar color="light">
          <NavbarBrand>Board Game Collection</NavbarBrand>
          {/* if user.isAdmin = true, then show admin button */}
          {this.props.token && this.state.user.isAdmin == true ? <Admin token={this.props.token} users={this.props.users}/> : <></>}

          {/* <Button onClick={this.userMapper}>Admin</Button>  : <></>}

{this.state.updateActive && this.state.gameToUpdate ? <GameEdit gameToUpdate={this.state.gameToUpdate} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames} /> : <></>} */}

            <Button onClick={this.logout}>Logout</Button>
        </Navbar>
      </div>
    )
  }
}

export default NavBar