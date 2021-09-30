import React from 'react'
import { Row, Col, Button, Input, Card, CardBody, CardTitle } from 'reactstrap'
import { game } from '../../types'
import GameInfo from './GameInfo'

type CollectionsProps = {
    token: string
}

type CollectionsState = {
    games: game[],
    updateActive: boolean,
    selectedGame: game | null,
    // gameToReview: game | null,
    nameSearch: string,
    name: string,
    description: string,
    thumb_url: string,
    modal: boolean,
    gameId: number
}

class CollectionsIndex extends React.Component<CollectionsProps, CollectionsState> {
    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            games: [],
            updateActive: false,
            selectedGame: null,
            // gameToReview: null,
            nameSearch: "",
            name: "",
            description: "",
            thumb_url: "",
            modal: false,
            gameId: 0
        }
        this.searchFunction = this.searchFunction.bind(this)
        // this.fetchGames = this.fetchGames.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    async APIfetch(): Promise<void> {
        let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
        let json = await res.json()

        console.info(json);
        this.setState({ games: json.games })
    }
    searchFunction(value: string) {
        this.setState({ nameSearch: value })
    }

    // async fetchGames(): Promise<void> {
    //     let res = await fetch('http://localhost:3000/game', {
    //         method: 'GET',
    //         headers: new Headers({
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${this.props.token}`
    //         })
    //     })
    //     let json = await res.json()
    //     this.setState({ games: json })
    // }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    setSelectedGame = (game: game | null) => {
        this.setState({
            selectedGame: game,
        })
    }


    componentDidMount(): void {
        // this.fetchGames()
    }

    render() {

        return (
            <>
            <br/>
            <h3>Search for a Game!</h3>
            <br/>
            <Row>
                <Col></Col>
                <Col>
                <Input className="searchBar" type="text" placeholder='Search Here' onChange={e => this.searchFunction(e.target.value.replace(/\s/g, '+'))} />
                </Col>
                <Col>
                <Button color="warning" onClick={() => this.APIfetch()}>Submit</Button>
                </Col>
                <Col></Col>
                </Row>
                <br />
                
                <div className="cardSpacing">
                    {this.state.games.map((game: game) => {
                        return (
                            <div className="cardDiv">
                                <Card fluid="sm">
                                    <CardBody className="card">
                                        <CardTitle className="cardTitle" tag="h5">{game.name}</CardTitle>
                                        <img className="cardImg" src={game.thumb_url} alt='Game logo' />
                                        <br />
                                        <Button onClick={() => { this.setSelectedGame(game) }}>View Game</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    }
                    )}
                </div>
                {this.state.selectedGame &&
                    <GameInfo setSelectedGame={this.setSelectedGame} selectedGame={this.state.selectedGame} token={this.props.token} />}
            </>
        )
    }
}

export default CollectionsIndex