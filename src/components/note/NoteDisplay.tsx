import React from 'react'
import './Note.css'
import { Table } from 'reactstrap'
import { game, note } from '../../types'

type NoteDisplayProps = {
    games: game[],
    notes: note[],
    token: string,
    selectedGame: game
    fetchNotes: () => Promise<void>
    updateOn: () => void
    editUpdateNote: (notes: note) => void
    noteMapper: () => JSX.Element[]
}

type NoteDisplayState = {
    gameId: number
}

class NoteDisplay extends React.Component<NoteDisplayProps, NoteDisplayState> {
    constructor(props: NoteDisplayProps) {
        super(props)
        this.state = {
            gameId: this.props.selectedGame.id
        }
    }

    render() {
        return (
            <>
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