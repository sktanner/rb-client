import React from "react"
import { Form, FormGroup, Label, Input, Button, Badge, Container, Col } from 'reactstrap'
import { user } from '../../types'

type RegProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (setAdmin: string) => void
    togglePortal: () => void
}

type RegState = {
    // users: user
    email: string,
    password: string
}

class Register extends React.Component<RegProps, RegState> {
    constructor(props: RegProps) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        let res = await fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({ user: { email: this.state.email, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        let json = await res.json()
        this.props.updateToken(json.sessionToken)
        this.props.updateIsAdmin(json.user.isAdmin)
    }

    render() {
        return (
            <Container>
                <h1>Register</h1>
                <Form className="authForm" onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={3} htmlFor="email">Email:</Label>
                            <Col sm={8}>
                            <Input onChange={(e) => this.setState({ email: e.target.value })} name="email" value={this.state.email} />
                            </Col>
                        </FormGroup>
                    <br />
                    <FormGroup row>
                        <Label sm={3} htmlFor="password">Password:</Label>
                        <Col sm={8}>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} name="password" value={this.state.password} />
                        </Col>
                    </FormGroup>
                    <br />
                    <Button type="submit">Sign Up</Button>
                    <br />
                    <Badge href="#" color="light" onClick={this.props.togglePortal}>Already have an account?</Badge>
                </Form>
            </Container>
        )
    }

}

export default Register