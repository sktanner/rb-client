import React from 'react'
import { Button, Card, CardBody, Collapse } from 'reactstrap'
import { game } from '../../types'

type DescriptionProps = {
    selectedGame: game
}

type DescriptionState = {
    isOpen: boolean
}

class Description extends React.Component<DescriptionProps, DescriptionState> {
    constructor(props: DescriptionProps) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    render() {
        return (
            <div>
                <Button color='warning' onClick={this.toggle} style={{ marginBottom: '1rem' }}>Description</Button>
                <Collapse isOpen={this.state.isOpen}>
                    <Card>
                        <CardBody>
                            {this.props.selectedGame.description.replace(/<[^>]+>/g, '')}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }

}

export default Description