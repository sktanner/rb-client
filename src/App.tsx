import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navigation/Navbar';
import Auth from './components/auth/Auth'

type AppProps = {}


type AppState = {
  token: string
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state={
      token:""
    }
  }

  componentDidMount(): void{
    if (localStorage.getItem('token')) {
      this.setState({
        token: localStorage.getItem('token')! //nonnull assertion expression operator
      })
    }
  }

  updateToken = (newToken: string): void => {
    localStorage.setItem('token', newToken)
    this.setState({token: newToken})
    console.log(this.state.token)
  }

  clearToken = (): void => {
    localStorage.clear()
    this.setState({token: ''})
  }

  // protectedViews = (): void => {
  //   return (
  //     this.setState === localStorage.getItem('token') 
  //     ? <Game token={token}/>
  //   : <Auth updateToken={updateToken}/>)
  // }

  render(){
  return (
    <div className="App">
      <NavBar />
      <Auth updateToken={this.updateToken}/>
    </div>
  )
}
}

export default App;