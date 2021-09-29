import React from 'react'
import { Table, Button } from 'reactstrap'
import { game, note } from '../../types'

type OwnedProps = {
    token: string
    games: game[]
}

type OwnedState = {
    ownedGames: game[]
}

class Owned extends React.Component<OwnedProps, OwnedState> {
    constructor(props: OwnedProps) {
        super(props)
        this.state = {
            ownedGames: []
        }
    }

    setOwnedGames() {
        this.setState({
            ownedGames: this.props.games.filter(game => game.collection === "Owned")
        })
    }

    // ownedMapper (): JSX.Element[] {
    //     this.props.games.filter(game => game.collection === "Owned")
        
    //         console.info(this.props.games.filter(game => game.collection === "Owned"))

    //         return (
    //             <tr key={game.id}>
    //                 <td>{game.name}</td>
    //             </tr>
    //             )
    // }


    render() {
        console.info(this.state.ownedGames)
        return (
            <Table>
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    {this.setOwnedGames}
                </tbody>
            </Table>
        )
    }
}

export default Owned