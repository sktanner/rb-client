import React from 'react'
import './Collections.css'
import { Row, Col } from 'reactstrap'
import APIURL from '../../helpers/environment'
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
        let res = await fetch(`${APIURL}/game`, {
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
        let res = await fetch(`${APIURL}/game/Owned`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ ownedGames: json })
    }

    async fetchPlayedGames(): Promise<void> {
        let res = await fetch(`${APIURL}/game/Played`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ playedGames: json })
    }

    async fetchWantToBuyGames(): Promise<void> {
        let res = await fetch(`${APIURL}/game/WantToBuy`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ wantToBuyGames: json })
    }

    async fetchWantToPlayGames(): Promise<void> {
        let res = await fetch(`${APIURL}/game/WantToPlay`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ wantToPlayGames: json })
    }


    componentDidMount(): void {
        this.fetchOwnedGames()
        this.fetchPlayedGames()
        this.fetchWantToBuyGames()
        this.fetchWantToPlayGames()
    }

    render() {
        return (
            <div className='collectionSpacing'>
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