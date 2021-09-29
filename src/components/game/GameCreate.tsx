import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

type GameCreateProps = {
    token: string,
    fetchGames: () => Promise<void>
}

type GameCreateState = {
    name: string,
    description: string,
    collection: string
}

class GameCreate extends React.Component<GameCreateProps, GameCreateState> {
    constructor(props: GameCreateProps) {
        super(props)
        this.state = {
            name: "",
            description: "",
            collection: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        // console.log("working");
        let res = await fetch('http://localhost:3000/game/create', {
            method: 'POST',
            body: JSON.stringify({ name: this.state.name, description: this.state.description, collection: this.state.collection }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ name: "", description: "", collection: "" })
        this.props.fetchGames()
        // console.info(json)
    }

    render() {
        return (
            <div>
                <h3>Create a Game</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="name" />
                        <Input name="name" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description" />
                        <Input name="description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="collection" />
                        <Input type="select" name="collection" value={this.state.collection} onChange={(e) => this.setState({ collection: e.target.value })}>
                            <option></option>
                            <option value="Want to play">Want to play</option>
                            <option value="Played">Played</option>
                            <option value="Want to buy">Want to buy</option>
                            <option value="Owned">Owned</option>
                        </Input>
                    </FormGroup>
                    <Button type="submit" color="warning">Submit</Button>
                </Form>
            </div>
        )
    }

}

export default GameCreate