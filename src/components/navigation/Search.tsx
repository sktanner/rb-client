import React from 'react';
import { Button, Input } from 'reactstrap';

type SearchProps = {}
type SearchState = {
  nameSearch: string,
  games: {
    name: string,
    id: number,
    thumb_url: string
    // description: string
  }[]
}

class Search extends React.Component<SearchProps, SearchState> {

  async APIfetch(): Promise<void> {
    let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
    let json = await res.json()

    console.log(json);
    this.setState({ games: json.games })
  }

  constructor(props: SearchProps) {
    super(props)
    this.state = {
      nameSearch: "",
      games: [{
        name: "",
        id: 0,
        thumb_url: ""
        // description: ""
      }]
    }
    this.searchFunction = this.searchFunction.bind(this)
  }

  searchFunction(value: string) {
    this.setState({ nameSearch: value })
  }


  render() {
    return (
      <div>
        <Input type="text" placeholder='Search Here' onChange={e => this.searchFunction(e.target.value.replace(/\s/g, '+'))} />
        <Button color="warning" onClick={() => this.APIfetch()}>Submit</Button>
        <h3>Results:</h3>

        {this.state.games.map((game) => {
          return (
              <ul key={game.id}>
                <img src={game.thumb_url} className="thumb" />
                <li>
                  {game.name}</li>
              </ul>)
        }
        )}
      </div>
    )
  }
}

export default Search