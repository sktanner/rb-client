import React from 'react'
import './Collections.css'
import { Button, Input, Card, CardBody, CardTitle, Form, FormGroup } from 'reactstrap'
import { game } from '../../types'
import GameInfo from './GameInfo'

type CollectionsProps = {
    token: string
}

type CollectionsState = {
    games: game[],
    updateActive: boolean,
    selectedGame: game | null,
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
            nameSearch: '',
            name: '',
            description: '',
            thumb_url: '',
            modal: false,
            gameId: 0
        }
        this.searchFunction = this.searchFunction.bind(this)
        this.updateOff = this.updateOff.bind(this)
    }

    async APIfetch(): Promise<void> {
        let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
        let json = await res.json()

        this.setState({ games: json.games })
    }
    searchFunction(value: string) {
        this.setState({ nameSearch: value })
    }

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

    render() {
        return (
            <>
                <br />
                <h3>Search for a Game!</h3>
                <br />
                <Form inline>
                    <FormGroup className='searchSpacing'>
                        <Input className='searchBar' type='text' placeholder='Search Here' onChange={e => this.searchFunction(e.target.value.replace(/\s/g, '+'))} />
                    </FormGroup>
                    <Button color='warning' onClick={() => this.APIfetch()}>Submit</Button>
                </Form>
                <br />

                <div className='cardSpacing'>
                    {this.state.games.map((game: game) => {
                        return (
                            <div className='cardDiv'>
                                <Card fluid='sm'>
                                    <CardBody className='cardStyle'>
                                        <CardTitle className='cardTitle' tag='h5'>{game.name}</CardTitle>
                                        <img className='cardImg' src={game.thumb_url} alt='Game logo' />

                                        <Button color='warning' onClick={() => { this.setSelectedGame(game) }}>View Game</Button>
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