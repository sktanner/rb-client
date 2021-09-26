import React from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

type GameCreateProps = {
    token: string,
    fetchGames: () => Promise<void>
}

type GameCreateState = {
    title: string,
    description: string,
    categories: string,
    image: string,
    // id: number
}

class GameCreate extends React.Component<GameCreateProps, GameCreateState> {
    constructor(props: GameCreateProps) {
        super(props)
        this.state = {
            title: "",
            description: "",
            categories: "",
            image: "",
            // id: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()
        // console.log("working");
                let res = await fetch('http://localhost:3000/game/create', {
            method: 'POST',
            body: JSON.stringify({ title: this.state.title, description: this.state.description, categories: this.state.categories }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        let json = await res.json()
        this.setState({ title: "", description: "", categories: "" })
        this.props.fetchGames()
        // console.info(json)
    }

    render() {
        return (
            <div>
                <h3>Create a Game</h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title" />
                        <Input name="title" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="description" />
                        <Input name="description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="categories" />
                        <Input type="select" name="categories" value={this.state.categories} onChange={(e) => this.setState({ categories: e.target.value })}>
                            <option></option>
                            <option value="Co-op">Co-op</option>
                            <option value="Strategy">Strategy</option>
                            <option value="Euro">Euro</option>
                        </Input>
                    </FormGroup>
                    {/* <FormGroup>
                    <Label htmlFor="image"/>
                </FormGroup> */}
                    <Button type="submit" color="warning">Submit</Button>
                </Form>
            </div>
        )
    }

}

export default GameCreate