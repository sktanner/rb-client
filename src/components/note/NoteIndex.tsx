import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
// import GameCreate from './GameCreate'
// import GameEdit from './GameEdit'
// import GameDisplay from './GameDisplay'
import { game, note } from '../../types'
import Search from '../navigation/Search'
import NoteCreate from '../note/NoteCreate'
import NoteDisplay from '../note/NoteDisplay'
import NoteEdit from '../note/NoteEdit'

type NoteIndexProps = {
    token: string,
    gameToReview: game,
    // selectedGame: game
}

type NoteIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    // gameToUpdate: game | null,
    noteToUpdate: note | null,
    // selectedGame: game | null,
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
            // gameToUpdate: null,
            noteToUpdate: null,
            // selectedGame: null,
            selectedNote: null,
            // gameToReview: null,
            gameId: this.props.gameToReview.id
        }
        // this.fetchGames = this.fetchGames.bind(this)
        this.fetchNotes = this.fetchNotes.bind(this)
        this.updateOff = this.updateOff.bind(this)
        this.noteMapper = this.noteMapper.bind(this)
    }

    async fetchNotes(): Promise<void> {
        
        let res = await fetch(`http://localhost:3000/note/${this.state.gameId}`, {
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

    // setSelectedGame = (g: game) => this.setState({selectedGame: g})

    setSelectedNote = (n: note) => this.setState({selectedNote: n})

    // setGameToReview = (g: game) => this.setState({gameToReview: g})

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
                        {/* <Button
                            onClick={() => { this.setSelectedNote(note) }}>
                            Leave a note!</Button> */}
                    </td>
                </tr>
            )
        })
    }

    deleteNote(note: note) {
        console.log(note);
        
        fetch(`http://localhost:3000/note/${note.id}`, {
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
                        {this.props.gameToReview &&
                            <NoteCreate 
                            games={this.state.games} 
                            token={this.props.token}
                            gameToReview={this.props.gameToReview}
                            fetchNotes={this.fetchNotes} noteMapper={this.noteMapper}
                            />}
                    </Col>
                    <Col md="9">
                    {this.props.gameToReview &&
                        <NoteDisplay games={this.state.games} notes={this.state.notes} token={this.props.token} gameToReview={this.props.gameToReview} fetchNotes={this.fetchNotes} updateOn={this.updateOn} editUpdateNote={this.editUpdateNote} noteMapper={this.noteMapper}
                        />}
                    </Col>
                    {this.props.gameToReview && this.state.updateActive && this.state.noteToUpdate ? <NoteEdit noteToUpdate={this.state.noteToUpdate} updateOff={this.updateOff} token={this.props.token} fetchNotes={this.fetchNotes} gameToReview={this.props.gameToReview} /> : <></>}
                </Row>
            </Container>
        )
    }
}

export default NoteIndex