import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { game } from '../../types'

type GameEditProps = {
    token: string,
    gameToUpdate: game
    fetchGames: () => Promise<void>
    updateOff: () => void
}

type GameEditState = {
    // editTitle: string,
    // editDescription: string,
    // editCategories: string,
}

class GameEdit extends React.Component<GameEditProps, game> {
    constructor(props: GameEditProps) {
        super(props)
        this.state = {
            title: this.props.gameToUpdate.title,
            description: this.props.gameToUpdate.description,
            categories: this.props.gameToUpdate.categories,
            id: this.props.gameToUpdate.id,
            collection: this.props.gameToUpdate.collection
        }
        this.gameUpdate = this.gameUpdate.bind(this)
    }

    async gameUpdate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        // console.info(this.props.gameToUpdate.id);
        try {
            let res = await fetch(`http://localhost:3000/game/${this.props.gameToUpdate.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title: this.state.title, description: this.state.description, categories: this.state.categories, collection: this.state.collection }),
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
                            <Label htmlFor="title">Edit Title:</Label>
                            <Input name="title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="description">Edit Description:</Label>
                            <Input name="description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="categories">Edit Categories:</Label>
                            <Input type="select" name="categories" value={this.state.categories} onChange={(e) => this.setState({ categories: e.target.value })}>
                                <option></option>
                                <option value="Co-op">Co-op</option>
                                <option value="Strategy">Strategy</option>
                                <option value="Euro">Euro</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="collection">Edit Collection:</Label>
                            <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                <option></option>
                                <option value="WantToPlay">Want to play</option>
                                <option value="Played">Played</option>
                                <option value="WantToBuy">Want to buy</option>
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