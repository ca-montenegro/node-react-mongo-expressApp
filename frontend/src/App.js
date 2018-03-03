import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      followers:[]
    };
  }

  componentDidMount(){
    fetch("/api/camontenegro11")
    .then((res)=>{
      if (res.status!=="200"){
        console.log("Error getting the data");
      }
      return res.json();
    })
    .then((json)=>{
      this.setState({
        followers:json
      });
    });
  }
  render() {
    return (
      <div className="App">
      <h1> Tweets</h1>
      {this.state.followers.map((f)=> <div>{f.user.screen_name}</div>)}
      <div> Made by Camilo</div>
      </div>
    );
  }
}

export default App;
