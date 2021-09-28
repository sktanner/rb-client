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
    gameToReview: game | null,
    nameSearch: string,
    name: string,
    description: string,
    thumb_url: string
}

class CollectionsIndex extends React.Component<CollectionsProps, CollectionsState> {
    async APIfetch(): Promise<void> {
        let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
        let json = await res.json()

        console.log(json);
        this.setState({ games: json.games })
    }

    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            games: [],
            updateActive: false,
            selectedGame: null,
            gameToReview: null,
            nameSearch: "",
            name: "",
            description: "",
            thumb_url: ""
        }
        this.searchFunction = this.searchFunction.bind(this)
        this.createGame = this.createGame.bind(this)
        this.fetchGames = this.fetchGames.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    searchFunction(value: string) {
        this.setState({ nameSearch: value })
    }

    createGame(e: React.FormEvent<HTMLFormElement>): void {
        // this.state.games.map((game) => {
        fetch('http://localhost:3000/game/create', {
            method: "POST",
            body: JSON.stringify({ name: this.state.name, description: this.state.description, image: this.state.thumb_url }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })
            .then(res => res.json())
            console.log("working");
            
        // })
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

    setSelectedGame = (sg: game) => this.setState({ selectedGame: sg })

    setGameToReview = (gr: game) => this.setState({ gameToReview: gr })

    componentDidMount(): void {
        this.fetchGames()
    }

    // collectionButton = () => {
    //     return this.state.selectedGame && (
    //         <GameInfo token={this.props.token} selectedGame={this.state.selectedGame} gameToReview={this.state.selectedGame} updateOff={this.updateOff} fetchGames={this.fetchGames}/>
    //     )
    // }

    render() {
        return (
            <CardDeck>
                <Input type="text" placeholder='Search Here' onChange={e => this.searchFunction(e.target.value.replace(/\s/g, '+'))} />
                <Button color="warning" onClick={() => this.APIfetch()}>Submit</Button>
                <h3>Results:</h3>

                {this.state.games.map((game) => {
                    return (
                        <div className="cardDiv">
                            <Card fluid="sm" className="card" key={game.id}>
                                <CardBody>
                                    <CardTitle tag="h5">{game.name}</CardTitle>
                                    {/* {/* <CardImg src={game.thumb_url} /> */}
                                </CardBody>
                                <img width='100%' src={game.thumb_url} alt='Game logo' />
                                {/* <CardText>{game.description}</CardText> */}
                                <CardBody>
                                    {/* <Link to="#"></Link> */}
                                    <Button onClick={() => { this.setSelectedGame(game) }}>Save to Collection</Button>
                                </CardBody>
                            </Card>
                        </div>
                    )
                }
                )}

                {this.state.selectedGame &&
                    <GameInfo gameToReview={this.state.selectedGame} selectedGame={this.state.selectedGame} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames} createGame={this.createGame} />}
            </CardDeck>
        )
    }
}

export default CollectionsIndex