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
    noteMapper: () => JSX.Element[]
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
                        {this.props.noteMapper()}
                    </tbody>
                </Table>
            </>
        )
    }
}

export default NoteDisplay