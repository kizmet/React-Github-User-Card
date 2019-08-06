import React, {Component} from "react";
import axios from 'axios';
import "./App.css";
import NavBar from "./NavBar";
import { Container, Row, Col } from "shards-react";
import UserCard, {UserCards} from './UserCard'

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      friendsLoaded: false,
      friendData: [],
      profiles: []
    };
  }

   componentDidMount() {
    axios
    .get("https://api.github.com/users/gaearon")
    .then(data => {
      const user = data.data;
      console.log("1!");
      this.setState({
        user: user
      })
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
          })
          friendData.forEach(friend => {
            const name = friend.login;
            const profile = axios
              .get(`https://api.github.com/users/${name}`)
              .then(profile => {
                const user = profile.data;
                this.setState({
                  profiles: [...this.state.profiles,user],
                  friendsLoaded: true
                })

              });
          });
        });
    })
    .catch(error => {
      console.log(error);
    });
};


    state = { activeItem: 'home' }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
 render() {
    
    return (
  
    <div className="App">
      <header className="App-header"><h1>Github User Profile</h1></header>
      <Container className="">
        <Row>
          
          <UserCard user={this.state.user} className='profile'/>

        </Row>
        <Row style={{alignItems: 'center'}}>
          
          {this.state.friendsLoaded &&
            this.state.profiles.map(user=><UserCards user={user} key={user.id}className='profiles'/>)
          }
          
        </Row>        
      </Container>
    </div>
  );
  }
}

export default App;
