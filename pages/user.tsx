import React, { Component } from "react";
import AppBar from "../components/AppBar";
import UserInfo from "../components/UserInfo";

class User extends Component<{
    id: number
}> {
    static async getInitialProps({ query } : any) {
        return {
            id: query.id
        };
    }

    render() {
        return (
            <div>
                <AppBar />
                <UserInfo id={this.props.id} />
            </div>
        )
    }
}

export default User;