import React from 'react'
import './Game.css'
import { Table, Button } from 'reactstrap'
import APIURL from '../../helpers/environment'
import { game } from '../../types'

type GameDisplayProps = {
    games: game[],
    token: string,
    fetchGames: () => Promise<void>
    updateOn: () => void
    setSelectedGame: (g: game) => void
}

type GameDisplayState = {}

class GameDisplay extends React.Component<GameDisplayProps, GameDisplayState> {

    deleteGame(game: game) {
        fetch(`${APIURL}/game/${game.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.props.fetchGames())
    }

    gameMapper(): JSX.Element[] {
        return this.props.games.map((game: game) => {

            return (
                <tr key={game.id}>
                    <td>{game.name}</td>
                    <td>{game.description.replace(/<[^>]+>/g, '')}</td>
                    <td>{game.collection}</td>
                    <td>
                        <Button color='warning' onClick={() => {
                            this.props.setSelectedGame(game)
                            this.props.updateOn()
                        }}>Update
                        </Button>
                    </td>
                    <td>
                        <Button color='danger' onClick={() => { this.deleteGame(game) }}>Delete</Button>
                    </td>
                    <td>
                        <Button color='success' onClick={() => { this.props.setSelectedGame(game) }}>Leave a note!</Button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                <h3>Games</h3>
                <br />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Collection</th>
                            <th></th>
                            <th></th>
                            <th></th>
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