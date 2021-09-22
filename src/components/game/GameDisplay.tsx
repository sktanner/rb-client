import React from 'react'
import { Table, Button } from 'reactstrap'
import { game } from '../../types'

type GameDisplayProps = {
    games: game[],
    token: string,
    fetchGames: () => Promise<void>
    updateOn: () => void
    editUpdateGame: (games: game) => void
    setSelectedGame: (g:game) => void
}

type GameDisplayState = {}

class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    async deleteGame(game: game) {
        // console.info(game.id)
        fetch(`http://localhost:3000/game/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.props.fetchGames())
    }

    gameMapper(): JSX.Element[] {
        return this.props.games.map((game: game, index: number) => {
            // console.log(this.props.games);
            
            return (
                <tr key={index}>
                    <th scope="row">{game.id}</th>
                    <td>{game.title}</td>
                    <td>{game.description}</td>
                    <td>{game.categories}</td>
                    <td>
                        <Button color="warning" onClick={() => {
                            this.props.editUpdateGame(game)
                            this.props.updateOn()
                        }}>Update
                        </Button>
                        <Button color="danger" onClick={() => { this.deleteGame(game) }}>Delete</Button>
                        <Button onClick={() => {this.props.setSelectedGame(game)}}>Leave a note!</Button>
                    </td>

                </tr>
            )
        })

    }

    render() {
        return (
            <>
                <h3>Games</h3>
                <hr />
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
        )
    }
}

export default GameDisplay