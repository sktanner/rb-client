import React from 'react'
import { Container, Row, Col, Button, CollapseProps, Input } from 'reactstrap'
import { game, note } from '../../types'
import GameInfo from './GameInfo'
import Owned from './Owned'

type CollectionsProps = {
    token: string
}

type CollectionsState = {
    games: game[],
    updateActive: boolean,
    selectedGame: game | null,
    gameToReview: game | null,
    nameSearch: string,
    APIgames: {
        id: string,
        name: string,
        description: string,
        thumb_url: string
    }[]
}

class CollectionsIndex extends React.Component<CollectionsProps, CollectionsState> {
    async APIfetch(): Promise<void> {
        let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
        let json = await res.json()

        console.log(json);
        this.setState({ APIgames: json.games })
    }

    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            games: [],
            updateActive: false,
            selectedGame: null,
            gameToReview: null,
            nameSearch: "",
            APIgames: [{
                id: "",
                name: "",
                description: "",
                thumb_url: ""
            }]
        }
        this.searchFunction = this.searchFunction.bind(this)
        this.createGame = this.createGame.bind(this)
        this.fetchGames = this.fetchGames.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    searchFunction(value: string) {
        this.setState({ nameSearch: value })
    }

    createGame() {
        this.state.APIgames.map((game) => {
        fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`, {
            method: "POST",
            body: JSON.stringify({ title: game.name, description: game.description, image: game.thumb_url }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })
        .then(res => res.json())
    })
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

    setSelectedGame = (g: game) => this.setState({selectedGame: g})

    setGameToReview = (g: game) => this.setState({gameToReview: g})

    componentDidMount(): void {
        this.fetchGames()
    }

    render() {
        return (
            <>
                <div>
                    <Input type="text" placeholder='Search Here' onChange={e => this.searchFunction(e.target.value.replace(/\s/g, '+'))} />
                    <Button color="warning" onClick={() => this.APIfetch()}>Submit</Button>
                    {/* <h3>Results:</h3>

                    {this.state.APIgames.map((game) => {
                        return (
                            <ul key={game.id}>
                                <img src={game.thumb_url} className="thumb" />
                                <li>
                                    {game.name}</li>
                            </ul>)
                    }
                    )} */}
                </div>
                <Owned games={this.state.games} token={this.props.token} setSelectedGame={this.setSelectedGame} />
                {this.state.selectedGame &&
                <GameInfo gameToReview={this.state.selectedGame} selectedGame={this.state.selectedGame} updateOff={this.updateOff} token={this.props.token} fetchGames={this.fetchGames}/>}
            </>
        )
    }
}

export default CollectionsIndex