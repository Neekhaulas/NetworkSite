import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
        }
    }
`;

class Login extends Component<any, any> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            username: '',
            password: ''
        }
    }

    saveToState = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Mutation
                mutation={LOGIN_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(login: any, { data, error, loading }: any) => {
                    if (data != null) {
                        if (data.login.success === true) {
                            Router.push({
                                pathname: '/'
                            });
                        }
                    }
                    return (
                        <form
                            method="post"
                            onSubmit={async e => {
                                e.preventDefault();
                                await login();
                                this.setState({ name: '', email: '', password: '' });
                            }}
                        >
                            {loading && (<p>Loading</p>)}
                            {error && (<p>Error</p>)}
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign into your account</h2>
                                <label htmlFor="email">
                                    Email
                                <input
                                        type="text"
                                        name="username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="password">
                                    Password
                                <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.saveToState}
                                    />
                                </label>

                                <button type="submit">Sign In!</button>
                            </fieldset>
                        </form>
                    );
                }}
            </Mutation>
        )
    }
}

export default Login;