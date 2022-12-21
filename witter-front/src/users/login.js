import React from 'react'
import axios from 'axios'

class LoginUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            csrf: "",
            username: "",
            password: "",
            error: "",
            isAuthenticated: false,
        };
    }

    componentDidMount = () => {
        this.getSession();
    }

    getCSRF = () => {
        axios.get("http://localhost:8000/users/auth/csrf", {
            withCredentials: true,
        })
        .then((res) => {
            let csrfToken = res.headers.get("X-CSRFToken");
            this.setState({ csrf: csrfToken });
            console.log(csrfToken);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    getSession = () => {
        axios.get("http://localhost:8000/users/auth/session/", {
            withCredentials: true,
        })
        .then((data) => {
            console.log(data);
            if (data.isAuthenticated) {
                this.setState({ isAuthenticated: true });
            } else {
                this.setState({ isAuthenticated: false });
                this.getCSRF();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    currentuser = () => {
        axios.get("http://localhost:8000/users/auth/currentuser/", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
        .then((response) => {
            console.log("You are logged in as: " + response.data.username);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    }

    handleUserNameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    isResponseOk(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response.data;
        } else {
            throw Error(response.statusText);
        }
    }

    login = (event) => {
        event.preventDefault();
        let data = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        axios.post("http://localhost:8000/users/auth/login/",
            data, {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": this.state.csrf,
            },
            withCredentials: true
            },
        )
        .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            this.setState({ isAuthenticated: true, username: "", password: "", error: "" });
        })
        .catch((err) => {
            console.log(err);
            this.setState({ error: "Wrong username or password." });
        });
    }

    logout = () => {
        axios.get("http://localhost:8000/users/auth/logout", {
            withCredentials: true,
        })
        .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            this.setState({ isAuthenticated: false });
            this.getCSRF();
        })
        .catch((err) => {
            console.log(err);
        });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.login}>
                    <label htmlFor="username"> Username: </label>
                    <input type="username" id="username" value={this.state.username} onChange={this.handleUserNameChange} />
                    <label htmlFor="password"> Password: </label>
                    <input type="password" id="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.currentuser}>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    } 
}

export default LoginUser