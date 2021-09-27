import './App.css'
import React from 'react'
import Auth from './components/auth/Auth'
import GameIndex from './components/game/GameIndex'
import CollectionsIndex from './components/collections/CollectionsIndex'
import Admin from './components/admin/Admin';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

type AppProps = {}

type AppState = {
  token: string,
  isAdmin: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = {
      token: "",
      isAdmin: ""
    }
  }

  componentDidMount(): void {
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')! //nonnull assertion expression operator
      })
    }
    if (localStorage.getItem('isAdmin')) {
      this.setState({
        isAdmin: localStorage.getItem('isAdmin')!
      })
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({ token: newToken })
    // console.log(this.state.token)
  }

  updateIsAdmin = (setAdmin: string): void => {
    localStorage.setItem('isAdmin', setAdmin)
    this.setState({ isAdmin: setAdmin })
    // console.log(this.state.isAdmin)
  }

  clearToken = () => {
    localStorage.clear()
    this.setState({ token: '', isAdmin: '' })
  }

  protectedViews = () => {
    return this.state.token === localStorage.getItem('token') ?
      (<GameIndex token={this.state.token} />)
      : (<Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin} />)
  }

  adminViews = () => {
    return localStorage.getItem('isAdmin') === 'true' ?
      (<Admin token={this.state.token} isAdmin={this.state.isAdmin} />)
      : (<GameIndex token={this.state.token} />)
  }

  render() {
    return (
      <div className="App">
        {this.state.token && (
          <Navbar>
            <NavbarBrand className="link">Game Room</NavbarBrand>
            {this.state.isAdmin === "true" &&
              <Link to="/admin" className="link">Admin</Link>}
            {this.state.isAdmin === "true" &&
              <Link to="/gameindex" className="link">Home</Link>}
              {this.state.isAdmin === "true" &&
              <Link to="/collections" className="link">Collections</Link>}

            <Link to='/'>
              <Button color="warning" onClick={this.clearToken}>Logout</Button>
            </Link>
          </Navbar>
        )}
        
        <Switch>
          <Route exact path='/'>
            {this.protectedViews}
          </Route>
          <Route path="/gameindex">
            <GameIndex token={this.state.token} />
          </Route>
          <Route path="/collections">
            <CollectionsIndex token={this.state.token} />
          </Route>
          <Route exact path="/admin">
            {this.adminViews}
          </Route>
        </Switch>
      </div>
    )
  }


  // render() {
  //   return (
  //       <div className="App">
  //         {/* <NavBar token={this.state.token} isAdmin={this.state.isAdmin}/> */}
  //         <Navbar>
  //           <NavbarBrand className="link">Game Room</NavbarBrand>
  //           {this.state.isAdmin === "true" &&
  //             <Link to="/admin" className="link">Admin</Link>}
  //           {this.state.isAdmin === "true" &&
  //             <Link to="/gameindex" className="link">Home</Link>}
  //           {this.state.token === localStorage.getItem('token') &&
  //             <Button  color="warning" onClick={this.clearToken}>Logout</Button>}
  //         </Navbar>

  //         {this.state.token === '' &&
  //           <Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin} />}

  //         <Switch>
  //           <Route path="/gameindex">
  //             {this.state.token === localStorage.getItem('token') &&
  //               <GameIndex token={this.state.token} />}
  //           </Route>
  //           <Route exact path="/admin">
  //             {this.state.isAdmin === "true" &&
  //               <Admin token={this.state.token} isAdmin={this.state.isAdmin} />}
  //           </Route>
  //         </Switch>
  //         {/* {this.protectedViews()} */}
  //       </div>
  //   )
  // }
}

export default App