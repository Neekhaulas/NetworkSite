import { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import Router from "next/router";
import { CURRENT_USER_QUERY } from "./User";
import { Button, Block, TextInput } from './Style';

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
                            Router.push('/');
                        }
                    }
                    return (
                        <Block>
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
                                <div>
                                    <h2>Sign up to N Joy</h2>
                                    <label htmlFor="email">
                                        Email
                                    <TextInput
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={this.state.email}
                                            onChange={this.saveToState}
                                        />
                                    </label>
                                    <label htmlFor="username">
                                        Username
                                    <TextInput
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            value={this.state.username}
                                            onChange={this.saveToState}
                                        />
                                    </label>
                                    <label htmlFor="password">
                                        Password
                                    <TextInput
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.saveToState}
                                        />
                                    </label>

                                    <Button type="submit">Sign Up!</Button>
                                </div>
                            </form>
                        </Block>
                    );
                }}
            </Mutation>
        )
    }
}

export default Login;