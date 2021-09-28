import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { game } from '../../types'

type GameEditProps = {
    token: string,
    gameToReview: game
    fetchGames: () => Promise<void>
    updateOff: () => void
}

// type GameEditState = {}

class GameEdit extends React.Component<GameEditProps, game> {
    constructor(props: GameEditProps) {
        super(props)
        this.state = {
            name: this.props.gameToReview.name,
            description: this.props.gameToReview.description,
            id: this.props.gameToReview.id,
            collection: this.props.gameToReview.collection,
            thumb_url: this.props.gameToReview.thumb_url
        }
        this.gameUpdate = this.gameUpdate.bind(this)
    }

    async gameUpdate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            let res = await fetch(`http://localhost:3000/game/${this.props.gameToReview.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name: this.state.name, description: this.state.description, collection: this.state.collection }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
            // console.info(res)
            let json = await res.json()
            // console.info(json)
            this.props.fetchGames()
            this.props.updateOff()
        } catch (err) {
            console.info(err)
        }
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Edit Game</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.gameUpdate}>
                        <FormGroup>
                            <Label htmlFor="name">Edit Title:</Label>
                            <Input name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Edit Description:</Label>
                            <Input name="description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="collection">Edit Collection:</Label>
                            <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                <option></option>
                                <option value="Want to play">Want to play</option>
                                <option value="Played">Played</option>
                                <option value="Want to buy">Want to buy</option>
                                <option value="Owned">Owned</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Update the Game!</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default GameEdit