import './App.css'
import React from 'react'
import NavBar from './components/navigation/Navbar'
import Auth from './components/auth/Auth'
import GameIndex from './components/game/GameIndex'
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
  // users: user[]
  // email: string,
  // password: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state={
      token:"",
      isAdmin: ""
      // users: []
      // email: "",
      // password: ""
    }
  }

  componentDidMount(): void{
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')! //nonnull assertion expression operator
      })
    }
    if(localStorage.getItem('isAdmin')) {
      this.setState({
        isAdmin: localStorage.getItem('isAdmin')!
      })
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({token: newToken})
    console.log(this.state.token)
  }

  updateIsAdmin = (setAdmin: string): void => {
    localStorage.setItem('isAdmin', setAdmin)
    this.setState({isAdmin: setAdmin})
    console.log(this.state.isAdmin)
  }

  clearToken = (): void => {
    localStorage.clear()
    this.setState({token: ''})
  }

  protectedViews = (): JSX.Element => {
    return (
      this.state.token === localStorage.getItem('token') 
      ? <GameIndex token={this.state.token} />
    : <Auth updateToken={this.updateToken} updateIsAdmin={this.updateIsAdmin}/>)
  }

  render(){
  return (
    <Router>
    <div className="App">
      <NavBar token={this.state.token} isAdmin={this.state.isAdmin}/>
      {this.protectedViews()}
    </div>
    </Router>
  )
}
}

export default App;