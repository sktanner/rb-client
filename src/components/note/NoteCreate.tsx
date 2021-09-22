import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { game } from '../../types'

type NoteCreateProps = {
    games: game[],
    token: string,
    gameToReview: game
}

type NoteCreateState = {
    content: string,
    gameId: number
}

class NoteCreate extends React.Component<NoteCreateProps, NoteCreateState> {
    constructor(props: NoteCreateProps) {
        super(props)
        this.state = {
            content: "",
            gameId: this.props.gameToReview.id 
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit( e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()        
        // console.log("working");
        //TODO: gameid
                let res = await fetch(`http://localhost:3000/note/${this.state.gameId}/create`, {
            method: 'POST',
            body: JSON.stringify({ content: this.state.content }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ content: "" })
    }

    render() {
        return (
            <div>
                <h3>Add a Note</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="content" />
                        <Input name="content" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default NoteCreate