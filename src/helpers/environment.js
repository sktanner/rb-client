let APIURL = ''

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000'
        break
    case 'skt-gameroom.herokuapp.com':
        APIURL = 'https://skt-gameroom-server.herokuapp.com'
}

export default APIURL