import React from 'react';
import { Table, Button } from 'reactstrap'
import { user } from '../../types'

type AdminProps = {
    users: user[],
    token: string,
}

type AdminState = {}

class Admin extends React.Component<AdminProps, AdminState> {

    // deleteUser(user: user) {
    //     // console.info(game.id)
    //     fetch(`http://localhost:3000/game/${game.id}`, {
    //         method: 'DELETE',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${this.props.token}`
    //         })
    //     }).then(() => this.props.fetchUsers())
    // }

    userMapper(): JSX.Element[] {
        return this.props.users.map((user: user) => {            
            return (
                <tr key={user.id}>
                    <th scope="row">{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.isAdmin}</td>
                        {/* <Button color="danger" onClick={() => { this.deleteUser(user) }}>Delete</Button> */}
                </tr>
            )
        })
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
                            <th>Password</th>
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