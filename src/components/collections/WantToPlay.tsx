import React from 'react'
import { game } from '../../types'

type WantToPlayProps = {
    token: string,
    wantToPlayGames: game[]
}

class WantToPlay extends React.Component<WantToPlayProps, {}> {

    render() {
        return (
            <div className="colCardSpacing">
                    {this.props.wantToPlayGames.map((game: game) => {
                        return (
                                        <img className="colCardImg" src={game.thumb_url} alt='Game logo' />
                        )
                    }
                    )}
                </div>
        )
    }
}

export default WantToPlay