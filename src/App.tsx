import './App.css'
import React from 'react'
import Auth from './components/auth/Auth'
import GameIndex from './components/game/GameIndex'
import SearchPage from './components/collections/SearchPage'
import Admin from './components/admin/Admin';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
import Collections from './components/collections/Collections'

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
      (<Collections token={this.state.token} />)
      : (<Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin} />)
  }

  adminViews = () => {
    return localStorage.getItem('isAdmin') === 'true' ?
      (<Admin token={this.state.token} isAdmin={this.state.isAdmin} />)
      : (<Collections token={this.state.token} />)
  }

  render() {
    return (
      <div className="App">
        {this.state.token && (
          <Navbar>
            <NavbarBrand className="NavLogo"></NavbarBrand>
            {this.state.isAdmin === "true" &&
              <Link to="/admin" className="link">Admin</Link>}
            
              {/* <Link to="/gameindex" className="link">Home</Link> */}
              
              <Link to="/search" className="link">Search</Link>
              
              <Link to="/collections" className="link">My Collections</Link>

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
          {this.state.token ? <GameIndex token={this.state.token} /> : <Redirect to="/" />}
          </Route>
          <Route path="/search">
            <SearchPage token={this.state.token} />
          </Route>
          <Route path="/collections">
            {this.state.token ? <Collections token={this.state.token} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/admin">
            {this.adminViews}
          </Route>
        </Switch>
      </div>
    )
  }

}

export default App