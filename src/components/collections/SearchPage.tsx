import React from 'react'
import { Container, Row, Col, Button, CollapseProps, Input, Card, CardText, CardBody, CardLink, CardTitle, CardDeck, CardImg, CardGroup } from 'reactstrap'
import { game, note } from '../../types'
import GameInfo from './GameInfo'
import Owned from './Owned'
import { Link } from "react-router-dom";

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
    modal: boolean
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
            modal: false
        }
        this.searchFunction = this.searchFunction.bind(this)
        this.createGame = this.createGame.bind(this)
        this.fetchGames = this.fetchGames.bind(this)
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

    async createGame(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        console.info("working")
        let res = await fetch('http://localhost:3000/game/create', {
            method: "POST",
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                thumb_url: this.state.thumb_url
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })
        let json = await res.json
        // this.setState({ name: "", description: "", thumb_url: "" })
        console.info(this.state.name);
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

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    setSelectedGame = (game: game) => {
        this.setState({
            selectedGame: game,
            name: game.name,
            description: game.description,
            thumb_url: game.thumb_url
        })
    }

    toggle = (): void => {
        this.setState({ modal: !this.state.modal })
    }

    // setGameToReview = (gr: game) => this.setState({ gameToReview: gr })

    componentDidMount(): void {
        // this.fetchGames()
    }

    componentDidUpdate() {
        console.info(this.state.selectedGame)
        console.info(this.state.name)
        console.info(this.state.description)
        console.info(this.state.thumb_url)
    }

    render() {
        // console.info(this.state.name);

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
                    {this.state.games.map((game) => {
                        return (
                            <div className="cardDiv">
                                <Card fluid="sm" key={game.id}>
                                    <CardBody className="card">
                                        <CardTitle className="cardTitle" tag="h5">{game.name}</CardTitle>
                                        <img className="cardImg" src={game.thumb_url} alt='Game logo' />
                                        <br />
                                        <Button onClick={() => { this.setSelectedGame(game); this.toggle() }}>View Game</Button>
                                    </CardBody>
                                </Card>
                            </div>
                        )
                    }
                    )}
                </div>
                {this.state.selectedGame &&
                    <GameInfo selectedGame={this.state.selectedGame} modal={this.state.modal} updateOff={this.updateOff} toggle={this.toggle} token={this.props.token} fetchGames={this.fetchGames} createGame={this.createGame} />}
            </>
        )
    }
}

export default CollectionsIndex