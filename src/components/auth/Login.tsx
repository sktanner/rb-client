import React from 'react'
import { Form, FormGroup, Label, Input, Button, Badge, Col, Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import APIURL from '../../helpers/environment'

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
        let res = await fetch(`${APIURL}/user/login`, {
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
        <Container fluid="sm">
        <div className="authForm">
            <h1>Login</h1>
            <Form onSubmit={this.handleSubmit}>
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
                <Button type="submit"  color="warning">Login</Button>
                <br />
                <Link to="" className="authLink" onClick={this.props.togglePortal}>Don't have an account?</Link>
            </Form>
        </div>
        </Container>
    )}

}

export default Login