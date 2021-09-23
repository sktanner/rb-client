import React from "react"
import { Container, Row, Col } from 'reactstrap'
import Register from "./Register"
import Login from "./Login"

type AuthProps = {
    updateToken: (newToken: string) => void
}

type AuthState = {
    showLogin: boolean,
    email: string,
    password: string
}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
        this.state = {
            showLogin: true,
            email: "",
            password: ""
        }
        this.togglePortal = this.togglePortal.bind(this)
    }

    togglePortal = (): void => {
        this.setState({ showLogin: !this.state.showLogin })
    }

    render() {
        return (
            <Container className="auth-container">
                <Row>
                    {this.state.showLogin
                        // <Col md="6">
                        ? <Register
                            togglePortal={this.togglePortal}
                            updateToken={this.props.updateToken}
                        />
                        // </Col>
                        // <Col md="6" className="login-col">
                        : <Login
                            togglePortal={this.togglePortal}
                            updateToken={this.props.updateToken}
                        />
                        // </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default Auth