import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import GameCreate from './GameCreate'
import GameEdit from './GameEdit'
import GameDisplay from './GameDisplay'
import { game, note } from '../../types'
import Search from '../navigation/Search'
import NoteCreate from '../note/NoteCreate'
import NoteDisplay from '../note/NoteDisplay'

type GameIndexProps = {
    token: string,
}

type GameIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    gameToUpdate: game | null,
    noteToUpdate: note | null,
    selectedGame: game | null,
    selectedNote: note | null,
    gameId: number | null
}

class GameIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor(props: GameIndexProps) {
        super(props)
        this.state = {
            games: [],
            notes: [],
            updateActive: false,
            gameToUpdate: null,
            noteToUpdate: null,
            selectedGame: null,
            selectedNote: null,
            gameId: null
        }
        this.fetchGames = this.fetchGames.bind(this)
        this.fetchNotes = this.fetchNotes.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    async fetchGames(): Promise<void> {
        let res = await fetch('http://localhost:3000/game', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ games: json })
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
    }

    editUpdateGame = (games: game): void => {
        this.setState({ gameToUpdate: games })
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

    setSelectedGame = (g: game) => this.setState({selectedGame: g})

    setSelectedNote = (n: note) => this.setState({selectedNote: n})

    componentDidMount(): void {
        this.fetchGames()
    }

    render() {
        return (
            <Container>
                <Row>
                    <Search />
                </Row>
                <Row>
                    <Col md="3">
                        <GameCreate fetchGames={this.fetchGames} token={this.props.token} />
                    </Col>
                    <Col md="3">
                        {this.state.selectedGame &&
                            <NoteCreate 
                            games={this.state.games} 
                            token={this.props.token}
                            gameToReview={this.state.selectedGame}
                            />}
                    </Col>
                    <Col md="9">
                    {this.state.selectedGame &&
                        <NoteDisplay games={this.state.games} notes={this.state.notes} token={this.props.token} gameToReview={this.state.selectedGame} fetchNotes={this.fetchNotes} updateOn={this.updateOn} editUpdateNote={this.editUpdateNote} setSelectedNote={this.setSelectedNote}
                        />}
                    </Col>
                    <Col md="9">
                        <GameDisplay games={this.state.games} editUpdateGame={this.editUpdateGame} updateOn={this.updateOn} fetchGames={this.fetchGames} token={this.props.token}
                        setSelectedGame={this.setSelectedGame} />
                    </Col>
                    {this.state.updateActive && this.state.gameToUpdate ? <GameEdit gameToUpdate={this.state.gameToUpdate} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames} /> : <></>}
                </Row>
            </Container>
        )
    }
}

export default GameIndex