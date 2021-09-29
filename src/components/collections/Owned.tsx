import React from 'react'
import { game } from '../../types'

type OwnedProps = {
    token: string,
    ownedGames: game[]
}

class Owned extends React.Component<OwnedProps, {}> {

    render() {
        return (
            <div className="colCardSpacing">
                    {this.props.ownedGames.map((game: game) => {
                        return (
                                        <img className="colCardImg" src={game.thumb_url} alt='Game logo' />
                        )
                    }
                    )}
                </div>
        )
    }
}

export default Owned