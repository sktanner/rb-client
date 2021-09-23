import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import GameCreate from './GameCreate'
import GameEdit from './GameEdit'
import GameDisplay from './GameDisplay'
import { game, note } from '../../types'
import Search from '../navigation/Search'
import NoteCreate from '../note/NoteCreate'


type GameIndexProps = {
    token: string,
}

type GameIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    gameToUpdate: game | null,
    selectedGame: game | null,
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
            selectedGame: null,
            gameId: null
        }
        this.fetchGames = this.fetchGames.bind(this)
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
        // console.log(games);
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    setSelectedGame = (g: game) => this.setState({selectedGame: g})

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