import React from 'react';
import { Table, Button } from 'reactstrap'
import { user } from '../../types'
import APIURL from '../../helpers/environment'

type AdminProps = {
    token: string,
    isAdmin: string
}

type AdminState = {
    users: user[]
}

class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props)
        this.state = {
            users: []
        }
        this.fetchUsers = this.fetchUsers.bind(this)
    }

    async fetchUsers(): Promise<void> {
        let res = await fetch(`${APIURL}/user/`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ users: json })
    }

    deleteUser(user: user) {
        fetch(`${APIURL}/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.fetchUsers())
    }

    userMapper(): JSX.Element[] {
        return this.state.users.map((user: user) => {
            return (
                <tr key={user.id}>
                    <th scope='row'>{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <td>
                    <Button color='danger' onClick={() => { this.deleteUser(user) }}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    componentDidMount(): void {
        this.fetchUsers()
    }

    render() {
        return (
            <>
                <h3>Users</h3>
                <br />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.userMapper()}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default Admin