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
    games: game[]
    ownedGames: game[],
    playedGames: game[],
    wantToBuyGames: game[],
    wantToPlayGames: game[],
    updateActive: boolean,
}

class Collections extends React.Component<CollectionsProps, CollectionsState> {
    constructor(props: CollectionsProps) {
        super(props)
        this.state = {
            games: [],
            ownedGames: [],
            playedGames: [],
            wantToBuyGames: [],
            wantToPlayGames: [],
            updateActive: false,
        }
        this.fetchGames = this.fetchGames.bind(this)
        this.fetchOwnedGames = this.fetchOwnedGames.bind(this)
        this.fetchPlayedGames = this.fetchPlayedGames.bind(this)
        this.fetchWantToBuyGames = this.fetchWantToBuyGames.bind(this)
        this.fetchWantToPlayGames = this.fetchWantToPlayGames.bind(this)
    }

    async fetchGames(): Promise<void> {
        console.info(this.props.token)
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
        // console.log(json)
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
            <div className="collectionSpacing">
                <Row>
                    <Col>
                    <h3>Owned</h3>
                        <Owned token={this.props.token} games={this.state.games} ownedGames={this.state.ownedGames} updateActive={this.state.updateActive} fetchGames={this.fetchGames} fetchOwnedGames={this.fetchOwnedGames} fetchPlayedGames={this.fetchPlayedGames} fetchWantToBuyGames={this.fetchWantToBuyGames} fetchWantToPlayGames={this.fetchWantToPlayGames}  />
                    </Col>
                    <Col>
                    <h3>Want to Buy</h3>
                        <WantToBuy token={this.props.token} games={this.state.games} wantToBuyGames={this.state.wantToBuyGames} updateActive={this.state.updateActive} fetchGames={this.fetchGames} fetchOwnedGames={this.fetchOwnedGames} fetchPlayedGames={this.fetchPlayedGames} fetchWantToBuyGames={this.fetchWantToBuyGames} fetchWantToPlayGames={this.fetchWantToPlayGames} />
                    </Col>
                    </Row>
                <Row>
                    <Col>
                    <h3>Played</h3>
                        <Played token={this.props.token} games={this.state.games} playedGames={this.state.playedGames} updateActive={this.state.updateActive} fetchGames={this.fetchGames} fetchOwnedGames={this.fetchOwnedGames} fetchPlayedGames={this.fetchPlayedGames} fetchWantToBuyGames={this.fetchWantToBuyGames} fetchWantToPlayGames={this.fetchWantToPlayGames} />
                    </Col>
                    <Col>
                    <h3>Want to Play</h3>
                        <WantToPlay token={this.props.token} games={this.state.games} wantToPlayGames={this.state.wantToPlayGames} updateActive={this.state.updateActive} fetchGames={this.fetchGames} fetchOwnedGames={this.fetchOwnedGames} fetchPlayedGames={this.fetchPlayedGames} fetchWantToBuyGames={this.fetchWantToBuyGames} fetchWantToPlayGames={this.fetchWantToPlayGames} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Collections