import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { game } from '../../types'

type NoteEditProps = {
    token: string,
    gameToReview: game
}

type NoteEditState = {
    content: string,
    gameId: number
}

class NoteEdit extends React.Component<NoteEditProps, NoteEditState> {
    constructor(props: NoteEditProps) {
        super(props)
        this.state = {
            content: "",
            gameId: this.props.gameToReview.id
        }
        this.noteUpdate = this.noteUpdate.bind(this)
    }

    async noteUpdate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            let res = await fetch(`http://localhost:3000/note/${this.state.gameId}`, {
                method: 'PUT',
                body: JSON.stringify({ content: this.state.content }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
            let json = await res.json()
            this.setState({ content: "" })
        } catch (err) {
            console.info(err)
        }
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalHeader>Edit Note</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.noteUpdate}>
                        <FormGroup>
                            <Label htmlFor="content">Edit Content:</Label>
                            <Input name="content" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                        </FormGroup>
                        <Button type="submit">Update the Note!</Button>
                    </Form>
                </ModalBody>
            </Modal>
        )
    }
}

export default NoteEdit