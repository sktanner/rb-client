import React from 'react'
import './Collections.css'
import { game } from '../../types'
import GameEdit from '../game/GameEdit'

type PlayedProps = {
    token: string,
    games: game[],
    playedGames: game[],
    updateActive: boolean
    fetchGames: () => Promise<void>
    fetchOwnedGames: () => Promise<void>
    fetchPlayedGames: () => Promise<void>
    fetchWantToBuyGames: () => Promise<void>
    fetchWantToPlayGames: () => Promise<void>
}

type PlayedState = {
    selectedGame: game | null,
    updateActive: boolean
}

class Played extends React.Component<PlayedProps, PlayedState> {
    constructor(props: PlayedProps) {
        super(props)
        this.state = {
            selectedGame: null,
            updateActive: false
        }
    }

    setSelectedGame = (game: game | null) => {
        this.setState({
            selectedGame: game
        })
    }

    updateOn = (): void => {
        this.setState({ updateActive: true })
    }

    updateOff = (): void => {
        this.setState({ updateActive: false })
    }

    render() {
        return (
            <div className='colCardSpacing'>

                {this.props.playedGames.length === 0 && 'Add some Games!'}

                {this.props.playedGames && this.props.playedGames.map((game: game) => {
                    return (
                        <div>
                            <a onClick={() => { this.setSelectedGame(game); this.updateOn() }}>
                                <img className='colCardImg' src={game.thumb_url} alt='Game logo' />
                            </a>


                            {this.state.updateActive && this.state.selectedGame ? <GameEdit games={this.props.games} selectedGame={this.state.selectedGame} setSelectedGame={this.setSelectedGame} updateOff={this.updateOff} token={this.props.token} fetchGames={this.props.fetchGames} fetchOwnedGames={this.props.fetchOwnedGames} fetchPlayedGames={this.props.fetchPlayedGames} fetchWantToBuyGames={this.props.fetchWantToBuyGames} fetchWantToPlayGames={this.props.fetchWantToPlayGames} /> : <></>}
                        </div>
                    )
                }
                )}
            </div>
        )
    }
}

export default Played