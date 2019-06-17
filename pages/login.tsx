import React, { Component } from "react";
import AppBar from "../components/AppBar";

class Login extends Component {
    static async getInitialProps({ query } : any) {
        return {
            id: query.id
        };
    }

    render() {
        return (
            <div>
                <AppBar />
            </div>
        )
    }
}

export default Login;