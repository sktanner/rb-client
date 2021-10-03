import React from "react"
import './Auth.css'
import { Container, Row, Col } from 'reactstrap'
import Register from "./Register"
import Login from "./Login"
import AppLogo from "../../assets/AppLogo.png"

type AuthProps = {
    updateToken: (newToken: string) => void
    updateIsAdmin: (setAdmin: string) => void
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
            <div>
                <Row>
                    <Col>
                        <img className="AppLogo" src={AppLogo}></img>
                    </Col>
                </Row>

                <Container fluid="sm" className="authContainer">
                    <Row>
                        {this.state.showLogin
                            ? <Register
                                togglePortal={this.togglePortal}
                                updateToken={this.props.updateToken}
                                updateIsAdmin={this.props.updateIsAdmin}
                            />
                            : <Login
                                togglePortal={this.togglePortal}
                                updateToken={this.props.updateToken}
                                updateIsAdmin={this.props.updateIsAdmin}
                            />
                        }
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Auth