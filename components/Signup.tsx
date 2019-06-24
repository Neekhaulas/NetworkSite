import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            success
        }
    }
`;

class Login extends Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: ''
        }
    }

    saveToState = (e: any) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <Mutation
                mutation={SIGNUP_MUTATION}
                variables={this.state}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
                {(signup: any, { data, error, loading }: any) => {
                    if (data != null) {
                        if (data.signup.success === true) {
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
                                await signup();
                                this.setState({ name: '', email: '', password: '' });
                            }}
                        >
                            {loading && (<p>Loading</p>)}
                            {error && (<p>Error</p>)}
                            <fieldset disabled={loading} aria-busy={loading}>
                                <h2>Sign up to N Joy</h2>
                                <label htmlFor="email">
                                    Email
                                <input
                                        type="email"
                                        name="email"
                                        placeholder="email"
                                        value={this.state.email}
                                        onChange={this.saveToState}
                                    />
                                </label>
                                <label htmlFor="username">
                                    Username
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

                                <button type="submit">Sign Up!</button>
                            </fieldset>
                        </form>
                    );
                }}
            </Mutation>
        )
    }
}

export default Login;