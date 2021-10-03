import React from 'react'
import { Button, Form, Input, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardImg, Row, Col } from 'reactstrap'
import APIURL from '../../helpers/environment'
import { game, } from '../../types'

type GameInfoProps = {
    token: string,
    setSelectedGame(g: game | null): void
    selectedGame: game,
}

type GameInfoState = {
    collection: string,
}

class GameInfo extends React.Component<GameInfoProps, GameInfoState> {
    constructor(props: GameInfoProps) {
        super(props)
        this.state = {
            collection: "",
        }
    }

    createGame = async(e: any) =>  {
        e.preventDefault()
        console.info(this.state)
        let res = await fetch(`${APIURL}/game/create`, {
            method: "POST",
            body: JSON.stringify({
                name: this.props.selectedGame.name,
                description: this.props.selectedGame.description,
                thumb_url: this.props.selectedGame.thumb_url,
                collection: this.state.collection
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }),
        })
        let json = await res.json()
        console.info(json.data.id, "CREATE");
    }

    render() {
        return (
            <div>
                <Modal size="lg" isOpen={true}>
                    <ModalHeader>{this.props.selectedGame.name}</ModalHeader>
                    <Form onSubmit={this.createGame}>
                        <ModalBody>
                            <Row>
                                <Col>
                                    <Card className="gameInfoCard">
                                        <CardImg className="gameInfoImg" src={this.props.selectedGame.thumb_url} />
                                    </Card>
                                </Col>
                                <Col>
                                    <p className="modalBody">
                                        {this.props.selectedGame.description.replace(/<[^>]+>/g, '')}
                                    </p>
                                </Col>
                            </Row>
                            Add to your collection:
                            <Input className="addToColl" type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                                <option value="" selected disabled>Select</option>
                                <option value="WantToPlay">Want to play</option>
                                <option value="Played">Played</option>
                                <option value="WantToBuy">Want to buy</option>
                                <option value="Owned">Owned</option>
                            </Input>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="submit" color="warning">Save to Collection</Button>
                            <Button color="danger" onClick={() => this.props.setSelectedGame(null)}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default GameInfo