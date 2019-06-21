import React, { Component } from "react";
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
                <UserInfo id={this.props.id} />
            </div>
        )
    }
}

export default User;