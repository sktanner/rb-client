import React from "react"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
        }
    }


    async handleSubmit () {
        // e.preventDefault();
        let res = await fetch("http://localhost:3000/user/register", {
            method: 'POST',
            body: JSON.stringify({ user: { email: this.state.email, password: this.state.password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        let json = await res.json()
        
        // .then(
        //     (res) => res.json()
        // ).then((data) => {
        //     props.updateToken(data.sessionToken)
        // })
    }

    render() {
        return(
            <div>

            </div>
        )
    }

}

export default Register