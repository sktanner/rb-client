import React from 'react';
import { Button, Input } from 'reactstrap';

type SearchProps = {}
type SearchState = {
    nameSearch: string,
    APIgames: {
        name: string,
        description: string
    }[]
}

class Search extends React.Component<SearchProps,SearchState> {

    async APIfetch(): Promise<void> {
        let res = await fetch(`https://api.boardgameatlas.com/api/search?name=${this.state.nameSearch}&client_id=Kt62SmliZz`)
        let json = await res.json()

        console.log(json);
        this.setState({ APIgames: json.games })
    }

    constructor(props: SearchProps) {
        super(props)
        this.state = {
          nameSearch: "",
          APIgames: [{
              name: "",
              description: ""
          }]
        }
        this.searchFunction = this.searchFunction.bind(this)
      }
    
      searchFunction(value: string) {
        // let result = this.state.things.filter(thing => thing.includes(value.toLowerCase()))
        this.setState({ nameSearch: value })
      }
    
    //   displayResults() {
    //     console.log(this.state.APIgames);
    //   }
    
      render() {
        return (
          <div>
            <Input type="text" placeholder='Search Here' onChange={e => this.searchFunction(e.target.value)} />
            {/* //.replace(/\s/g, '+') */}
            <Button onClick={() => this.APIfetch()}>Submit</Button>
            <h3>Results:</h3>
            {this.state.APIgames.map((game, index) =>
            {return( <ul>
                <li>{game.name}</li>
            </ul>)
            }
        )}
          </div>
        )
      }
    }

export default Search