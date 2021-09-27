import React from 'react'
import { Container, Row, Col, Button, CollapseProps } from 'reactstrap'
import { game, note } from '../../types'

type WantToBuyProps = {
    token: string
}

type WantToBuyState = {
    games: game[]
}

class WantToBuy extends React.Component<WantToBuyProps, WantToBuyState> {
    constructor(props: WantToBuyProps) {
        super(props)
        this.state = {
            games: []
        }
    }


    render() {
        return (
            <>
            </>
        )
    }
}

export default WantToBuy