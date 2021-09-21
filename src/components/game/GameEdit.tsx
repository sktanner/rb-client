import React, {useState} from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'

type GameEditProps = {
    token: string,
    gameToUpdate: number
    fetchGames: () => Promise<void>
    updateOff: () => Promise<void>
}

type GameEditState = {
    editTitle: string,
    editDescription: string,
    editCategories: string,
}

class GameEdit extends React.Component<GameEditProps, GameEditState> {
    constructor(props: GameEditProps) {
        super(props)
        this.state = {
            editTitle: "",
            editDescription: "",
            editCategories: ""
        }
        this.gameUpdate = this.gameUpdate.bind(this)
    }

    async gameUpdate (e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        let res = await fetch(`http://localhost:3000/game/${this.props.gameToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({game: { title: this.state.editTitle, description: this.state.editDescription, categories: this.state.editCategories}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ title: this.state.editTitle, description: this.state.editDescription, categories: this.state.editCategories})
            this.props.fetchGames()
            this.props.updateOff()
    }

    render() {
        return (
            <Modal isOpen={true}>
            <ModalHeader>Create a Game</ModalHeader>
            <ModalBody>
                <Form onSubmit={this.gameUpdate}>
                    <FormGroup>
                        <Label htmlFor="title">Edit Title:</Label>
                        <Input name="title" value={this.state.editTitle} onChange={(e) => this.setState({ editTitle: e.target.value })}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description">Edit Description:</Label>
                        <Input name="description" value={this.state.editDescription} onChange={(e) => this.setState({ editDescription: e.target.value })}/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="categories">Edit Categories:</Label>
                        <Input type="select" name="categories" value={this.state.editCategories} onChange={(e) => this.setState({ editCategories: e.target.value })}>
                            <option></option>
                            <option value="Co-op">Co-op</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Euro">Euro</option>
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