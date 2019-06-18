import React, { Component } from "react";
import AppBar from "../components/AppBar";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from "next/router";

const LOGIN = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
        }
    }
`;

class Login extends Component {
    username!: any;
    password!: any;

    render() {
        return (
            <div>
                <AppBar />
                <Mutation mutation={LOGIN}>
                    {(login: any, { data, loading, error }: any) => {
                        if (data != null) {
                            if (data.login.success === true) {
                                Router.push({
                                    pathname: '/'
                                });
                            }
                        }
                        return (
                            <form
                                onSubmit={
                                    e => {
                                        e.preventDefault();
                                        login({ variables: { username: this.username.value, password: this.password.value } });
                                    }
                                }
                            >
                                <label>
                                    <input type="text" name="username" placeholder="username" ref={node => {
                                        this.username = node;
                                    }} />
                                </label>
                                <label>
                                    <input type="password" name="password" placeholder="password" ref={node => {
                                        this.password = node;
                                    }} />
                                </label>
                                <input type="submit" value="Submit" />
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :(</p>}
                            </form>
                        )
                    }}
                </Mutation>
            </div>
        )
    }
}

export default Login;