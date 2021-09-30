import React from 'react'
import { game } from '../../types'
import GameEdit from '../game/GameEdit'

type WantToBuyProps = {
    token: string,
    games: game[],
    wantToBuyGames: game[],
    updateActive: boolean
    fetchGames: () => Promise<void>
    fetchOwnedGames: () => Promise<void>
    fetchPlayedGames: () => Promise<void>
    fetchWantToBuyGames: () => Promise<void>
    fetchWantToPlayGames: () => Promise<void>
    // modalOpen (): void
}

type WantToBuyState = {
    selectedGame: game | null,
    updateActive: boolean
}

class WantToBuy extends React.Component<WantToBuyProps, WantToBuyState> {
    constructor(props: WantToBuyProps) {
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
        console.info(this.props.wantToBuyGames)
        return (
            <div className="colCardSpacing">
                {this.props.wantToBuyGames && this.props.wantToBuyGames.map((game: game) => {
                    return (
                        <div>
                            <a onClick={() => { this.setSelectedGame(game); this.updateOn() }}>
                            <img className="colCardImg" src={game.thumb_url} alt='Game logo' />
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

export default WantToBuy