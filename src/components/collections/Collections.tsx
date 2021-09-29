import React from 'react'
import { game, note } from '../../types'
import Owned from './Owned'

type CollectionsProps = {
    token: string
}

type CollectionsState = {
    games: game[]
}

class Collections extends React.Component<CollectionsProps, CollectionsState> {
    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            games: []
        }
        this.fetchGames = this.fetchGames.bind(this)
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

    componentDidMount(): void {
        this.fetchGames()
    }

    render() {
        return (
            <>
                    <Owned token={this.props.token} games={this.state.games} />
            </>
        )
    }
}

export default Collections