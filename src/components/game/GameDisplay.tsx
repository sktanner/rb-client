import React from 'react'
import { Table, Button } from 'reactstrap'

type GameDisplayProps = {
    token: string,
    fetchGames: () => Promise<void>
    updateOn: () => Promise<void>
    editUpdateGame: () => Promise<void>
}

type GameDisplayState = {
    games: game[],
}

type game = {
    title: string,
    description: string,
    categories: string,
    image: string
}

class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    async deleteGame () {
        fetch(`http://localhost:3000/game/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }) .then(() => this.props.fetchGames())
    }

    gameMapper () {
        return this.state.games.map((game, index) => {
            return(
                <tr key={index}>
                    <th scope="row">{game.id}</th>
                    <td>{game.title}</td>
                    <td>{game.description}</td>
                    <td>{game.categories}</td>
                    <td>
                        <Button color="warning" onClick={() => {this.props.editUpdateGame(game); this.props.updateOn()}}>Update</Button>
                        <Button color="danger" onClick={() => {this.deleteGame(game)}}>Delete</Button>
                    </td>
                </tr>
            )
        })
    }

render(){
    return(
        <>
        <h3>Games</h3>
        <hr/>
        <Table striped>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Categories</th>
                </tr>
            </thead>
            <tbody>
                {this.gameMapper()}
            </tbody>
        </Table>
        </>
    )}
}

export default GameDisplay