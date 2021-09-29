import React from 'react'
import { game, note } from '../../types'

type WantToPlayProps = {
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