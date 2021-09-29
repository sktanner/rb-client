import React from 'react'
import { Row, Col } from 'reactstrap'
import { game, note } from '../../types'
import Owned from './Owned'
import Played from './Played'
import WantToBuy from './WantToBuy'
import WantToPlay from './WantToPlay'

type CollectionsProps = {
    token: string
}

type CollectionsState = {
    ownedGames: game[],
    playedGames: game[],
    wantToBuyGames: game[],
    wantToPlayGames: game[]
}

class Collections extends React.Component<CollectionsProps, CollectionsState> {
    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            ownedGames: [],
            playedGames: [],
            wantToBuyGames: [],
            wantToPlayGames: []
        }
        this.fetchOwnedGames = this.fetchOwnedGames.bind(this)
    }

    async fetchOwnedGames(): Promise<void> {
        console.info(this.props.token)
        let res = await fetch('http://localhost:3000/game/Owned', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ ownedGames: json })
        console.info(this.state.ownedGames)
    }

    async fetchPlayedGames(): Promise<void> {
        console.info(this.props.token)
        let res = await fetch('http://localhost:3000/game/Played', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ playedGames: json })
        console.info(this.state.playedGames)
    }

    async fetchWantToBuyGames(): Promise<void> {
        console.info(this.props.token)
        let res = await fetch('http://localhost:3000/game/WantToBuy', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ wantToBuyGames: json })
        console.info(this.state.wantToBuyGames)
    }

    async fetchWantToPlayGames(): Promise<void> {
        console.info(this.props.token)
        let res = await fetch('http://localhost:3000/game/WantToPlay', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ wantToPlayGames: json })
        console.info(this.state.wantToPlayGames)
    }

    componentDidMount(): void {
        this.fetchOwnedGames()
        this.fetchPlayedGames()
        this.fetchWantToBuyGames()
        this.fetchWantToPlayGames()
    }

    render() {
        return (
            <div className="cardSpacing">
                <Row>
                    <Col>
                        <Owned token={this.props.token} ownedGames={this.state.ownedGames} />
                    </Col>
                    <Col>
                        <Played token={this.props.token} playedGames={this.state.playedGames} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <WantToBuy token={this.props.token} wantToBuyGames={this.state.wantToBuyGames} />
                    </Col>
                    <Col>
                        <WantToPlay token={this.props.token} wantToPlayGames={this.state.wantToPlayGames} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Collections