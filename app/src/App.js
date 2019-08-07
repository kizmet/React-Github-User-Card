import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./NavBar";
import { Container, Row, Col, Tooltip } from "shards-react";
import UserCard, { UserCards } from "./UserCard";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      friendsLoaded: false,
      friendData: [],
      profiles: [],
      open: false
    };
  }

  componentDidMount() {
    axios
      .get("https://api.github.com/users/gaearon")
      .then(data => {
        const user = data.data;
        this.setState({
          user: user
        });
        return { user };
      })
      .then(data => {
        console.log("2!");
        const user = data.user;
        const profile = user.login;
        const friends = axios
          .get(`https://api.github.com/users/${profile}/followers`)
          .then(friends => {
            const friendData = friends.data;
            this.setState({
              friendData: friendData
            });
            friendData.forEach(friend => {
              const name = friend.login;
              const profile = axios
                .get(`https://api.github.com/users/${name}`)
                .then(profile => {
                  const user = profile.data;
                  const userT = ({
                    ...user,
                    open:false
                  })
                  this.setState({
                    profiles: [...this.state.profiles, userT],
                    friendsLoaded: true
                  });

                });
            });
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

// componentDidUpdate(id) {
//   this.toggle(id)
// }
  toggle = id => {
    this.setState({
      profiles: this.state.profiles.map(profile => {
        if (profile.id === id) {
          return {
            ...profile,
            open: true
          };}  else {
            return profile
          }
        })
      })
      
    };
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Github Profile</h1>
        </header>
        <Container className="">
          <Row>
            <UserCard user={this.state.user} className="profile" />
          </Row>
          <header className="App-header">
            <h1>Github Friends</h1>
          </header>
          <Row style={{ alignItems: "center" }}>
            {this.state.friendsLoaded &&
              console.log(this.state.profiles) || this.state.profiles.map(user => (
                
                  <UserCards user={user} key={user.id} className="profiles" />
                  // <Tooltip
                  //   open={this.state.open}
                  //   target={`#li-${user.id}`}
                  //   toggle={this.toggle(user.id)}
                  // >
                  //   {user.login}
                  // </Tooltip>
                
              ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
