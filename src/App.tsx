import './App.css'
import React, { ChangeEvent } from 'react'
import NavBar from './components/navigation/Navbar'
import Auth from './components/auth/Auth'
import GameIndex from './components/game/GameIndex'

type AppProps = {}

type AppState = {
  token: string,
  email: string,
  password: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps){
    super(props)
    this.state={
      token:"",
      email: "",
      password: ""
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

  protectedViews = (): JSX.Element => {
    return (
      this.state.token === localStorage.getItem('token') 
      ? <GameIndex token={this.state.token} />
    : <Auth updateToken={this.updateToken}/>)
  }

  render(){
  return (
    <div className="App">
      <NavBar />
      {this.protectedViews()}
    </div>
  )
}
}

export default App;