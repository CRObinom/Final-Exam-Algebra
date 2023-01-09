import React, { Component } from 'react';
import '../App.css';
import Messages from './Messages';
import Input from './Input';

function names() {
  const randomName = [
    'Dupin',
    'Lav',
    'Žirafa',
    'Slonić',
    'Merkat',
    'Orao',
    'Tigar',
    'Zebra',
    'Krokodil',
    'Hrčak',
  ];

  const name = randomName[Math.floor(Math.random() * randomName.length)];
  return name;
}

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: names(),
      color: randomColor(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone('7WJcBlqfT7Nos11a', {
      data: this.state.member,
    });
  }
  componentDidMount() {
    const member = { ...this.state.member };
    member.id = this.drone.clientId;
    this.setState({ member });

    const room = this.drone.subscribe('observable-room');
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className='App'>
        <div className='App-header'>
          <h1>Chat-App-Završni rad</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    if (message === '') {
      alert('Molimo upišite poruku');
    } else {
    }
    this.drone.publish({
      room: 'observable-room',
      message,
    });
  };
}

export default App;