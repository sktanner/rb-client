import React from 'react'
import { game, note } from '../../types'

type WantToBuyProps = {
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