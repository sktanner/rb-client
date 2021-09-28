import React from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardBody, CardTitle, CardText, CardImg, Row, Col } from 'reactstrap'
import { game, note } from '../../types'
import NoteIndex from '../note/NoteIndex'

type GameInfoProps = {
    token: string,
    gameToReview: game,
    selectedGame: game
    updateOff: () => void
    fetchGames: () => Promise<void>
    createGame: (e: React.FormEvent<HTMLFormElement>) => void
}

// type GameInfoState = {
//     games: game[]
// }

class GameInfo extends React.Component<GameInfoProps, game> {
    constructor(props: GameInfoProps) {
        super(props)
        this.state = {
            // games: [],
            name: this.props.gameToReview.name,
            description: this.props.gameToReview.description,
            id: this.props.gameToReview.id,
            collection: this.props.gameToReview.collection,
            thumb_url: this.props.gameToReview.thumb_url
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

    // toggle = () => {setModal(!modal)}

    render() {
        return (
            <div>
            <Modal size="lg" isOpen={true}>
            <ModalHeader>{this.props.gameToReview.name}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.props.createGame}>
                        <Row>
                            <Col>
                                <Card>
                                    <CardImg bottom width="100%" src={this.props.gameToReview.thumb_url} />
                                </Card>
                                <Label htmlFor="collection">Add To</Label>
                                <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                    <option></option>
                                    <option value="Want to play">Want to play</option>
                                    <option value="Played">Played</option>
                                    <option value="Want to buy">Want to buy</option>
                                    <option value="Owned">Owned</option>
                                </Input>
                            </Col>
                            <Col>
                                <p className="modalBody">
                                    {this.props.gameToReview.description}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            {this.props.selectedGame &&
                                <NoteIndex token={this.props.token} gameToReview={this.props.selectedGame} />}
                        </Row>
                    </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button type="submit" color="warning">Submit</Button>
                    {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
                    </ModalFooter>
            </Modal>
            </div>
        )
    }
}

export default GameInfo