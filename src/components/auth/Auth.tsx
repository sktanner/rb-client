import React from "react"
import { Container, Row, Col } from 'reactstrap'
import Register from "./Register"
import Login from "./Login"

type AuthProps = {
    updateToken: (newToken: string) => void
}

type AuthState = {}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props)
    }

    render() {
        return (
            <Container className="auth-container">
            <Row>
                <Col md="6">
                    <Register updateToken={this.props.updateToken} />
                </Col>
                <Col md="6" className="login-col">
                    {/* <Login updateToken={this.updateToken} /> */}
                </Col>
            </Row>
        </Container>
        )
    }
}

export default Auth