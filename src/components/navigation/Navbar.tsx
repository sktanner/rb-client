import React from 'react';
// import { Navbar, NavbarBrand, Button } from 'reactstrap';
// import Admin from '../admin/Admin';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";


// type NavBarProps = {
//   isAdmin: string,
//   token: string
// }

// type NavBarState = {
// }

// class NavBar extends React.Component<NavBarProps, NavBarState> {
  // constructor(props: NavBarProps) {
  //   super(props)
  //   this.state = {
  //   }
  // }

  // logout = (): void => {
  //   localStorage.clear()
  //   window.location.href = "/login"
  // }

//   render() {
//     // console.log(this.props.isAdmin);

//     return (
//       <div>
//         <Navbar color="light">
//           <NavbarBrand>Board Game Collection</NavbarBrand>
//           {this.props.isAdmin == "true" &&
//             <Link to="/admin">Admin</Link>}
//           <Button onClick={this.logout}>Logout</Button>
//         </Navbar>
//         <Switch>
//           <Route exact path="/admin">
//             <Admin token={this.props.token} />
//           </Route>
//         </Switch>
//       </div>
//     )
//   }
// }

// export default NavBar