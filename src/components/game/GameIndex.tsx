import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import GameCreate from './GameCreate'
import GameEdit from './GameEdit'
import GameDisplay from './GameDisplay'
import { game, note } from '../../types'
// import Search from '../navigation/Search'
import NoteIndex from '../note/NoteIndex'

type GameIndexProps = {
    token: string
}

type GameIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    // gameToUpdate: game | null,
    // noteToUpdate: note | null,
    selectedGame: game | null,
    // selectedNote: note | null,
    gameToReview: game | null
}

class GameIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor(props: GameIndexProps) {
        super(props)
        this.state = {
            games: [],
            notes: [],
            updateActive: false,
            // gameToUpdate: null,
            // noteToUpdate: null,
            selectedGame: null,
            // selectedNote: null,
            gameToReview: null
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

    // editUpdateGame = (games: game): void => {
    //     this.setState({ gameToUpdate: games })
    // }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    setSelectedGame = (g: game) => this.setState({selectedGame: g})

    // setSelectedNote = (n: note) => this.setState({selectedNote: n})

    setGameToReview = (g: game) => this.setState({gameToReview: g})

    componentDidMount(): void {
        this.fetchGames()
    }

    render() {
        return (
            <Container>
                <Row>
                    {/* <Search /> */}
                </Row>
                <Row>
                    <Col md="3">
                        {/* <GameCreate fetchGames={this.fetchGames} token={this.props.token} /> */}
                    </Col>
                    <Col md="9">
                        <GameDisplay games={this.state.games} setGameToReview={this.setGameToReview} updateOn={this.updateOn} fetchGames={this.fetchGames} token={this.props.token}
                        setSelectedGame={this.setSelectedGame} />
                    </Col>
                    {this.state.updateActive && this.state.gameToReview ? <GameEdit gameToReview={this.state.gameToReview} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames} /> : <></>}
                    <Col>
                    {this.state.selectedGame &&
                    <NoteIndex token={this.props.token} gameToReview={this.state.selectedGame}/>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameIndex