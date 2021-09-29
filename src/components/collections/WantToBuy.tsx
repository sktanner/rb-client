import React from 'react'
import { game } from '../../types'

type WantToBuyProps = {
    token: string,
    wantToBuyGames: game[]
}

class WantToBuy extends React.Component<WantToBuyProps, {}> {

    render() {
        return (
            <div className="colCardSpacing">
                    {this.props.wantToBuyGames.map((game: game) => {
                        return (
                                        <img className="colCardImg" src={game.thumb_url} alt='Game logo' />
                        )
                    }
                    )}
                </div>
        )
    }
}

export default WantToBuy