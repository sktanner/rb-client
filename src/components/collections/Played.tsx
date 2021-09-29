import React from 'react'
import { game } from '../../types'

type PlayedProps = {
    token: string,
    playedGames: game[]
}

class Played extends React.Component<PlayedProps, {}> {

    render() {
        return (
            <div className="colCardSpacing">
                    {this.props.playedGames.map((game: game) => {
                        return (
                                        <img className="colCardImg" src={game.thumb_url} alt='Game logo' />
                        )
                    }
                    )}
                </div>
        )
    }
}

export default Played