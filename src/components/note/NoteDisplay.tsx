import React from 'react'
import { Table, Button } from 'reactstrap'
import { game, note } from '../../types'

type NoteDisplayProps = {
    notes: note[],
    token: string,
    // gameToReview: game
    fetchNotes: () => Promise<void>
}

type NoteDisplayState = {
    gameId: number
}

class NoteDisplay extends React.Component<NoteDisplayProps, NoteDisplayState> {

    async deleteGame(note: note) {
        fetch(`http://localhost:3000/game/${this.state.gameId}`, {
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
                    <th scope="row">{note.id}</th>
                    <td>{note.content}</td>
                    <td>
                        {/* <Button color="warning" onClick={() => {
                            this.props.editUpdateGame(note)
                            this.props.updateOn() }}>
                            Update</Button>
                        <Button color="danger"
                            onClick={() => { this.deleteGame(note) }}>
                            Delete</Button>
                        <Button
                            onClick={() => { this.props.setSelectedGame(game) }}>
                            Leave a note!</Button> */}
                    </td>

                </tr>
            )
        })

    }

    render() {
        return (
            <>
                <h3>Games</h3>
                <hr />
                <Table striped>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Categories</th>
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