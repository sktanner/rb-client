import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import GameCreate from './GameCreate'
import GameEdit from './GameEdit'
import GameDisplay from './GameDisplay'
import { game } from '../../types'
import Search from '../navigation/Search'
import NoteCreate from '../note/NoteCreate'


type GameIndexProps = {
    token: string
}

type GameIndexState = {
    games: game[],
    updateActive: boolean,
    gameToUpdate: game | null,
    selectedGame: game | null
}

class GameIndex extends React.Component<GameIndexProps, GameIndexState> {
    constructor(props: GameIndexProps) {
        super(props)
        this.state = {
            games: [],
            updateActive: false,
            gameToUpdate: null,
            selectedGame: null
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
        // console.info(json)
        this.setState({ games: json })

        // .then((logData) => {
        //     this.setState({logData: this.state.games})
        //     console.log(this.state.games);
        // })
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