
const config = {
    development: {
        apiUrl: "http://localhost:8080"
    },

    production: {
        apiUrl: "https://bsdi-poc-api.herokuapp.com" // change this
    },
    test: {
        apiUrl: ''
    }
}

export default config;