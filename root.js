import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ImageCropper from './index.js'

class InputHelper extends Component {

  constructor(props){
    super(props)
    this.state = {
      image: null,
    };
  }

  handleInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = event.target.result;
      this.setState({
        image,
      });
    }
    reader.readAsDataURL(file);
  }

  handleImageLoad = (e) => {
    console.log(e);
  }

  handleClick = (e) => {
    if (this.ref) {
      this.ref.rotate(90)
    }
  }

  render(){
    return (<div>
      {!this.state.image ? <input type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleInputChange} /> : <ImageCropper src={this.state.image} ref = {(el) => { this.ref = el; }} componentDidMount={this.handleImageLoad} onLoad={this.handleImageLoad} componentDidUpdate={this.handleImageLoad} />}
      <button onClick={this.handleClick}>Rotate</button>
    </div>);
  }
}

ReactDOM.render(<InputHelper />, document.getElementById('root'));