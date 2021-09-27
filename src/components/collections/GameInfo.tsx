import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap'
import { game, note } from '../../types'
import NoteIndex from '../note/NoteIndex'

type GameInfoProps = {
    token: string,
    gameToReview: game,
    selectedGame: game
    updateOff: () => void
    fetchGames: () => Promise<void>
}

// type GameInfoState = {
//     games: game[]
// }

class GameInfo extends React.Component<GameInfoProps, game> {
    constructor(props: GameInfoProps) {
        super(props)
        this.state = {
            // games: [],
            title: this.props.gameToReview.title,
            description: this.props.gameToReview.description,
            categories: this.props.gameToReview.categories,
            id: this.props.gameToReview.id,
            collection: this.props.gameToReview.collection
        }
    }

    async gameUpdate(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        try {
            let res = await fetch(`http://localhost:3000/game/${this.props.gameToReview.id}`, {
                method: 'PUT',
                body: JSON.stringify({ collection: this.state.collection }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })

            let json = await res.json()

            this.props.fetchGames()
            this.props.updateOff()
        } catch (err) {
            console.info(err)
        }
    }

    render() {
        return (
            <Modal isOpen={true}>
                <ModalBody>
                    <Form onSubmit={this.gameUpdate}>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle tag="h5">Title</CardTitle>
                                </CardBody>
                                <CardImg bottom width="100%" src={this.props.gameToReview.image} />
                            </Card>
                        </Col>
                        <Col>
                            {this.props.gameToReview.description}
                        </Col>
                        <Col>
                        <Label htmlFor="collection">Add To</Label>
                        <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                            <option></option>
                            <option value="Want to play">Want to play</option>
                            <option value="Played">Played</option>
                            <option value="Want to buy">Want to buy</option>
                            <option value="Owned">Owned</option>
                        </Input>
                        </Col>
                    </Row>
                    <Row>
                        <NoteIndex token={this.props.token} gameToReview={this.props.selectedGame} />
                    </Row>
                    </Form>
                    <Button type="submit" color="warning">Submit</Button>
                </ModalBody>
            </Modal>
        )
    }
}

export default GameInfo