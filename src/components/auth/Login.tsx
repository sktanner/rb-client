import React, {useState} from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'

type LoginProps = {}

type LoginState = {
    email: string,
    password: string
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
    }

    async handleSubmit (e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        let res = await fetch("http://localhost:3000/user/login", {
            method: 'POST',
            body: JSON.stringify({user:{email: this.state.email, password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        let json = await res.json()

        // .then(
        //     (response) => response.json()
        // ).then((data) => {
        //     props.updateToken(data.sessionToken)
        // })
    }

    render(){
    return(
        <div>
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label htmlFor="email">Email</Label>
                    <Input onChange={(e) => this.setState({email:e.target.value})} name="email" value={this.state.email}/>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={(e) => this.setState({password:e.target.value})} name="password" value={this.state.password}/>
                </FormGroup>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )}

}

export default Login