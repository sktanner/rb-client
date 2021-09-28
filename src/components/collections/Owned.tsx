import React from 'react'
import { Container, Row, Col, Button, CollapseProps } from 'reactstrap'
import { game, note } from '../../types'

type OwnedProps = {
    token: string,
    games: game[]
    // setSelectedGame: (g: game) => void
}

type OwnedState = {
}

class Owned extends React.Component<OwnedProps, OwnedState> {
    constructor(props: OwnedProps) {
        super(props)
        this.state = {
            games: []
        }
    }

    ownedMapper() {
        return this.props.games.map((game: game) => {
            return (
                game.collection === "owned" && (
                    <ul key={game.id}>
                        <li>{game.name}</li>
                    </ul>

                )
            )
        })
    }


    render() {
        return (
            <ul>
                <li>
                    {this.ownedMapper()}
                    {/* each image is clickable and needs - onClick={() => { this.props.setSelectedGame(game) } */}
                </li>
            </ul>
        )
    }
}

export default Owned