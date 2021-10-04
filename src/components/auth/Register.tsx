import React from 'react'
import './Auth.css'
import { Form, FormGroup, Label, Input, Button, Container, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import APIURL from '../../helpers/environment'

type RegProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (setAdmin: string) => void
    togglePortal: () => void
}

type RegState = {
    email: string,
    password: string
}

class Register extends React.Component<RegProps, RegState> {
    constructor(props: RegProps) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        let res = await fetch(`${APIURL}/user/register`, {
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
            <Container fluid='sm'>
                <div className='authForm'>
                <h1>Register</h1>
                <Form onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label sm={3} htmlFor='email'>Email:</Label>
                            <Col sm={8}>
                            <Input onChange={(e) => this.setState({ email: e.target.value })} name='email' value={this.state.email} />
                            </Col>
                        </FormGroup>
                    <br />
                    <FormGroup row>
                        <Label sm={3} htmlFor='password'>Password:</Label>
                        <Col sm={8}>
                        <Input onChange={(e) => this.setState({ password: e.target.value })} name='password' value={this.state.password} />
                        </Col>
                    </FormGroup>
                    <br />
                    <Button type='submit' color='warning'>Sign Up</Button>
                    <br />
                    <Link to='' className='authLink' onClick={this.props.togglePortal}>Already have an account?</Link>
                </Form>
                </div>
            </Container>
        )
    }

}

export default Register