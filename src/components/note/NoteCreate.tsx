import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import { game } from '../../types'

type NoteCreateProps = {
    games: game[],
    token: string,
    selectedGame: game
    fetchNotes: () => Promise<void>
    noteMapper: () => JSX.Element[]
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
            gameId: this.props.selectedGame.id 
        }
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = async(e: any) => {
        e.preventDefault()
        // console.log(this.state.content);    
                let res = await fetch(`http://localhost:3000/note/${this.state.gameId}/create`, {
            method: 'POST',
            body: JSON.stringify({ content: this.state.content }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        console.info(json)
        // this.setState({ content: "" })
        this.props.fetchNotes()  
        // this.props.noteMapper()      
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
                    <Button color="warning" type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

export default NoteCreate