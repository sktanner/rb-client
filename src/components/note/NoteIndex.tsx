import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import APIURL from '../../helpers/environment'
import { game, note } from '../../types'
import NoteCreate from '../note/NoteCreate'
import NoteDisplay from '../note/NoteDisplay'
import NoteEdit from '../note/NoteEdit'

type NoteIndexProps = {
    token: string,
    selectedGame: game
}

type NoteIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    noteToUpdate: note | null,
    selectedNote: note | null,
    gameId: number
}

class NoteIndex extends React.Component<NoteIndexProps, NoteIndexState> {
    constructor(props: NoteIndexProps) {
        super(props)
        this.state = {
            games: [],
            notes: [],
            updateActive: false,
            noteToUpdate: null,
            selectedNote: null,
            gameId: this.props.selectedGame.id
        }
        this.fetchNotes = this.fetchNotes.bind(this)
        this.updateOff = this.updateOff.bind(this)
        this.noteMapper = this.noteMapper.bind(this)
    }

    async fetchNotes(): Promise<void> {
        
        let res = await fetch(`${APIURL}/note/${this.state.gameId}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ notes: json })
        console.info(json)
    }

    editUpdateNote = (notes: note): void => {
        this.setState({ noteToUpdate: notes })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    componentDidMount(): void {
        this.fetchNotes()
    }

    noteMapper(): JSX.Element[] {
        console.log(this.state.notes);
        
        return this.state.notes.map((note: note) => {

            return (
                <tr key={note.id}>
                    <th scope="row"></th>
                    <td>{note.content}</td>
                    <td>
                         <Button color="warning" onClick={() => {
                            this.editUpdateNote(note)
                            this.updateOn() }}>
                            Update</Button>
                            </td>
                            <td>
                        <Button color="danger"
                            onClick={() => { this.deleteNote(note) }}>
                            Delete</Button>
                    </td>
                </tr>
            )
        })
    }

    deleteNote(note: note) {
        console.log(note);
        
        fetch(`${APIURL}/note/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then(() => this.fetchNotes())
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col md="3">
                        {this.props.selectedGame &&
                            <NoteCreate 
                            games={this.state.games} 
                            token={this.props.token}
                            selectedGame={this.props.selectedGame}
                            fetchNotes={this.fetchNotes} noteMapper={this.noteMapper}
                            />}
                    </Col>
                    <Col md="9">
                    {this.props.selectedGame &&
                        <NoteDisplay games={this.state.games} notes={this.state.notes} token={this.props.token} selectedGame={this.props.selectedGame} fetchNotes={this.fetchNotes} updateOn={this.updateOn} editUpdateNote={this.editUpdateNote} noteMapper={this.noteMapper}
                        />}
                    </Col>
                    {this.props.selectedGame && this.state.updateActive && this.state.noteToUpdate ? <NoteEdit noteToUpdate={this.state.noteToUpdate} updateOff={this.updateOff} token={this.props.token} fetchNotes={this.fetchNotes} selectedGame={this.props.selectedGame} /> : <></>}
                </Row>
            </Container>
        )
    }
}

export default NoteIndex