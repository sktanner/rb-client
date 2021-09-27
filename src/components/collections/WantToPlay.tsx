import React from 'react'
import { Container, Row, Col, Button, CollapseProps } from 'reactstrap'
import { game, note } from '../../types'

type WantToPlayProps = {
    token: string
}

type WantToPlayState = {
    games: game[]
}

class WantToPlay extends React.Component<WantToPlayProps, WantToPlayState> {
    constructor(props: WantToPlayProps) {
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

export default WantToPlay