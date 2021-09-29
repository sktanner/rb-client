import React from 'react'
import { Container, Row, Col, Button, CollapseProps } from 'reactstrap'
import { game, note } from '../../types'

type PlayedProps = {
}

type PlayedState = {
    games: game[]
}

class Played extends React.Component<PlayedProps, PlayedState> {
    constructor(props: PlayedProps) {
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

export default Played