import React from 'react'
import { Table, Button } from 'reactstrap'
import { game, note } from '../../types'

type NoteDisplayProps = {
    games: game[],
    notes: note[],
    token: string,
    gameToReview: game
    fetchNotes: () => Promise<void>
    updateOn: () => void
    editUpdateNote: (notes: note) => void
    setSelectedNote: (n:note) => void
}

type NoteDisplayState = {
    gameId: number
}

class NoteDisplay extends React.Component<NoteDisplayProps, NoteDisplayState> {
    constructor(props: NoteDisplayProps) {
        super(props)
        this.state = {
            gameId: this.props.gameToReview.id
        }
    }

    deleteNote(note: note) {
        fetch(`http://localhost:3000/note/${this.state.gameId}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(() => this.props.fetchNotes())
    }

    noteMapper(): JSX.Element[] {
        return this.props.notes.map((note: note, index: number) => {

            return (
                <tr key={index}>
                    <th scope="row"></th>
                    <td>{note.content}</td>
                    <td>
                         <Button color="warning" onClick={() => {
                            this.props.editUpdateNote(note)
                            this.props.updateOn() }}>
                            Update</Button>
                        <Button color="danger"
                            onClick={() => { this.deleteNote(note) }}>
                            Delete</Button>
                        <Button
                            onClick={() => { this.props.setSelectedNote(note) }}>
                            Leave a note!</Button>
                    </td>

                </tr>
            )
        })

    }

    render() {
        return (
            <>
                <h3>Notes</h3>
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.noteMapper()}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default NoteDisplay