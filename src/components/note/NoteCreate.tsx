import React from 'react'
import './Note.css'
import { Button, Form, Label, Input } from 'reactstrap'
import APIURL from '../../helpers/environment'
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
            content: '',
            gameId: this.props.selectedGame.id 
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = async(e: any) => {
        e.preventDefault()
                let res = await fetch(`${APIURL}/note/${this.state.gameId}/create`, {
            method: 'POST',
            body: JSON.stringify({ content: this.state.content }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ content: '' })
        this.props.fetchNotes()  
    }

    render() {
        return (
            <div>
                <h5>Add a note!</h5>
                <Form inline className='addNote' onSubmit={this.handleSubmit}>
                    
                        <Label htmlFor='content' />
                        <Input className='noteInput' name='content' value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                    
                    <Button className='addNoteButton' color='warning' type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}

export default NoteCreate