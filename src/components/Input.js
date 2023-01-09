import { Component } from 'react';
import React from 'react';

class Input extends Component {
  state = {
    text: '',
  };

  onChange(e) {
    this.setState({ text: e.target.value });
  }

  onSubmit(e) {
    let x = document.forms['forma']['inputforme'].value;
    if (x == '') {
      alert('Molimo upišite poruku');
      e.preventDefault();
      return false;
    } else {
      e.preventDefault();
      this.setState({ text: '' });
      this.props.onSendMessage(this.state.text);
    }
  }

  render() {
    return (
      <div className='Input'>
        <form name='forma' onSubmit={(e) => this.onSubmit(e)}>
          <input
            name='inputforme'
            onChange={(e) => this.onChange(e)}
            value={this.state.text}
            type='text'
            placeholder='Poruka'
            autoFocus={true}
          />
          <button>Pošalji</button>
        </form>
      </div>
    );
  }
}

export default Input;