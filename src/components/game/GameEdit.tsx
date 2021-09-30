import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { game } from '../../types'
import NoteIndex from '../note/NoteIndex'

type GameEditProps = {
    token: string,
    games: game[],
    selectedGame: game
    fetchGames: () => Promise<void>
    fetchOwnedGames: () => Promise<void>
    fetchPlayedGames: () => Promise<void>
    fetchWantToBuyGames: () => Promise<void>
    fetchWantToPlayGames: () => Promise<void>
    setSelectedGame(g: game | null): void
    updateOff: () => void
}

// type GameEditState = {}

class GameEdit extends React.Component<GameEditProps, game> {
    constructor(props: GameEditProps) {
        super(props)
        this.state = {
            name: this.props.selectedGame.name,
            description: this.props.selectedGame.description,
            id: this.props.selectedGame.id,
            collection: this.props.selectedGame.collection,
            thumb_url: this.props.selectedGame.thumb_url
        }
        this.gameUpdate = this.gameUpdate.bind(this)
    }

    async gameUpdate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        console.info(this.props.selectedGame)
        e.preventDefault()
        try {
            let res = await fetch(`http://localhost:3000/game/${this.props.selectedGame.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: this.state.name, description: this.state.description, collection: this.state.collection }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
            let json = await res.json()
            this.props.fetchGames()
            this.props.fetchOwnedGames()
            this.props.fetchPlayedGames()
            this.props.fetchWantToBuyGames()
            this.props.fetchWantToPlayGames()
            this.props.updateOff()
            console.info(json)
        } catch (err) {
            console.info(err)
        }
    }

    deleteGame() {
        fetch(`http://localhost:3000/game/${this.props.selectedGame.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then(() => this.props.fetchGames())
        this.props.fetchOwnedGames()
        this.props.fetchPlayedGames()
        this.props.fetchWantToBuyGames()
        this.props.fetchWantToPlayGames()
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>{this.state.name}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.gameUpdate}>
                        <FormGroup>
                            <Label htmlFor="collection">Edit Collection:</Label>
                            <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                <option value="" selected disabled>Select</option>
                                <option value="WantToPlay">Want to play</option>
                                <option value="Played">Played</option>
                                <option value="WantToBuy">Want to buy</option>
                                <option value="Owned">Owned</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Update the Game!</Button>

                        {this.props.selectedGame &&
                            <Button color="danger" onClick={() => { this.deleteGame(); this.props.setSelectedGame(null) }}>Remove from My Games</Button>}

                        {this.props.selectedGame &&
                            <NoteIndex token={this.props.token} selectedGame={this.props.selectedGame} />}
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default GameEdit