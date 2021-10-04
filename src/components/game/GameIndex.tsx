import React from 'react'
import './Game.css'
import { Container, Row, Col, Button } from 'reactstrap'
import GameCreate from './GameCreate'
import GameEdit from './GameEdit'
import GameDisplay from './GameDisplay'
import { game, note } from '../../types'
import NoteIndex from '../note/NoteIndex'
import APIURL from '../../helpers/environment'

type GameIndexProps = {
    token: string
}

type GameIndexState = {
    games: game[],
    notes: note[],
    updateActive: boolean,
    selectedGame: game | null,
}

class GameIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor(props: GameIndexProps) {
        super(props)
        this.state = {
            games: [],
            notes: [],
            updateActive: false,
            selectedGame: null,
        }
        this.fetchGames = this.fetchGames.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    async fetchGames(): Promise<void> {
        let res = await fetch(`${APIURL}/game`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ games: json })
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
                </Row>
                <Row>
                    <Col md='3'>
                        {/* <GameCreate fetchGames={this.fetchGames} token={this.props.token} /> */}
                    </Col>
                    <Col md='9'>
                        <GameDisplay games={this.state.games} updateOn={this.updateOn} fetchGames={this.fetchGames} token={this.props.token}
                        setSelectedGame={this.setSelectedGame} />
                    </Col>
                    {/* {this.state.updateActive && this.state.selectedGame ? <GameEdit selectedGame={this.state.selectedGame} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames} /> : <></>} */}
                    <Col>
                    {this.state.selectedGame &&
                    <NoteIndex token={this.props.token} selectedGame={this.state.selectedGame}/>}
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default GameIndex