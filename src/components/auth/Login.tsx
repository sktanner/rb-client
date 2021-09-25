import React from 'react'
import { Form, FormGroup, Label, Input, Button, Badge, Col } from 'reactstrap'
// import { user } from '../../types'

type LoginProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (setAdmin: string) => void
    togglePortal: () => void
}

type LoginState = {
    email: string,
    password: string
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
        this.props.updateToken(json.sessionToken)
        this.props.updateIsAdmin(json.user.isAdmin)
        console.log(json);
    }

    render(){
    return(
        <div>
            <h1>Login</h1>
            <Form className="authForm" onSubmit={this.handleSubmit}>
                <FormGroup row>
                    <Label sm={3} htmlFor="email">Email:</Label>
                    <Col sm={8}>
                    <Input onChange={(e) => this.setState({email:e.target.value})} name="email" value={this.state.email}/>
                    </Col>
                </FormGroup>
                <br />
                <FormGroup row>
                    <Label sm={3} htmlFor="password">Password:</Label>
                    <Col sm={8}>
                    <Input onChange={(e) => this.setState({password:e.target.value})} name="password" value={this.state.password}/>
                    </Col>
                </FormGroup>
                <br />
                <Button type="submit">Login</Button>
                <br />
                <Badge href="#" color="light" onClick={this.props.togglePortal}>Don't have an account?</Badge>
            </Form>
        </div>
    )}

}

export default Login