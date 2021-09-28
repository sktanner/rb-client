import React from 'react'
import { Button, Form, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, Row, Col } from 'reactstrap'
import { game, note } from '../../types'
import NoteIndex from '../note/NoteIndex'

type GameInfoProps = {
    token: string,
    // gameToReview: game,
    selectedGame: game
    updateOff: () => void
    fetchGames: () => Promise<void>
    createGame: (e: React.FormEvent<HTMLFormElement>) => Promise<void>
}

type GameInfoState = {
    // games: game[]
    collection: string,
    modal: boolean,
    nestedModal: boolean,
    closeAll: boolean
}

class GameInfo extends React.Component<GameInfoProps, GameInfoState> {
    constructor(props: GameInfoProps) {
        super(props)
        this.state = {
            collection: "",
            modal: false,
            nestedModal: false,
            closeAll: false
            // games: [],
            // name: this.props.gameToReview.name,
            // description: this.props.gameToReview.description,
            // id: this.props.gameToReview.id,
            // collection: this.props.gameToReview.collection,
            // thumb_url: this.props.gameToReview.thumb_url
        }
    }

    async gameUpdate(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        // e.preventDefault()
        try {
            let res = await fetch(`http://localhost:3000/game/${this.props.selectedGame.id}`, {
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

    toggle() {
        this.setState({ modal: this.state.modal! })
    }

    toggleNested() {
        this.setState({
            nestedModal: this.state.nestedModal!,
            closeAll: false
        })
    }

    toggleAll() {
        this.setState({
            nestedModal: this.state.nestedModal!,
            closeAll: true
        })
    }

    render() {
        { console.info(this.props.selectedGame) }
        return (
            <div>
                <Modal size="lg" isOpen={true} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.selectedGame.name}</ModalHeader>
                    <Form onSubmit={this.props.createGame}>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <Card>
                                        <CardImg bottom width="100%" src={this.props.selectedGame.thumb_url} />
                                    </Card>
                                </Col>
                                <Col>
                                    <p className="modalBody">
                                        {this.props.selectedGame.description}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                {this.props.selectedGame &&
                                    <NoteIndex token={this.props.token} selectedGame={this.props.selectedGame} />}
                            </Row>
                            <Modal isOpen={this.state.nestedModal} toggle={this.toggleNested} onClosed={this.state.closeAll ? this.toggle : undefined}>
                                <ModalBody>
                                    <Label htmlFor="collection">Add To</Label>
                                    <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                        <option></option>
                                        <option value="Want to play">Want to play</option>
                                        <option value="Played">Played</option>
                                        <option value="Want to buy">Want to buy</option>
                                        <option value="Owned">Owned</option>
                                    </Input>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={(e) => { this.toggleAll(); this.gameUpdate(e) }}>Done</Button>
                                </ModalFooter>
                            </Modal>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="warning" onClick={(e) => { this.toggleNested() }}>Save to Collection</Button>
                            {/* <Button color="secondary" onClick={toggle}>Cancel</Button> */}
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default GameInfo