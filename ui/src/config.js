
const config = {
    development: {
        apiUrl: "http://localhost:8080"
    },

    //replace with url of deployed api
    production: {
        apiUrl: "https://sandbox-ddespain-api.herokuapp.com"
    },

    test: {
        apiUrl: ''
    }
}

export default config;