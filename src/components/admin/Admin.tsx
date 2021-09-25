import React from 'react';
import { Table, Button } from 'reactstrap'
import { user } from '../../types'

type AdminProps = {
    token: string,
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
        let res = await fetch('http://localhost:3000/user/', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ users: json })
        // console.log(this.state.users);
    }

    deleteUser(user: user) {
        // console.info(user.id)
        fetch(`http://localhost:3000/user/${user.id}`, {
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
                    <th scope="row">{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.isAdmin}</td>
                    <Button color="danger" onClick={() => { this.deleteUser(user) }}>Delete</Button>
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
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Is Admin</th>
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