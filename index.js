const React = require('react');

export default class ImageCropper extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  rotate = (degrees) => {
    document.getElementById('image-figure').style.transform = `rotate(${degrees}deg)`;
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.src !== nextProps.src) {
  //     const image = new Image();
  //     image.src = nextProps.src;
  //     this.ctx.drawImage(image, 0, 0);
  //     document.getElementById('grooot').appendChild(this.canvas)
  //   }
  // }

  // componentDidMount(){
  //   const image = <img src={this.props.src} />
  //   this.ctx.drawImage(image, 0, 0);
  //   document.getElementById('grooot').appendChild(this.canvas)
  // }

  componentDidUpdate() {
    document.getElementById('grooot').appendChild(this.canvas);
  }

  componentDidMount() {
    document.getElementById('grooot').appendChild(this.canvas);
  }

  handleCrop = () => {
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(this.canvas, 100, 100, 200, 200, 0, 0, 200, 200);
    const src = tempCanvas.toDataURL('image/png', 1);
    this.setState({
      imageSrc: src,
    });
  }

  handleDrag = (e, id) => {
    console.log("drag", e, id);
    e.dataTransfer.setData("text", e.target.id);  
  }

  handleDrop = (e) => {
    console.log("drop", e);
    const data = e.dataTransfer.getData('text');
    console.log("data", data);
  }

  render() {
    console.log("canvas ", this.canvas);
    const { src, containerClassName } = this.props;
    const image = new Image();
    image.onload = () => {
      // const ratio = image.width/image.height;
      // image.width = 320 * ratio;
      // image.height = 320 / ratio;
      image.crossOrigin = "anonymous";
      this.canvas.width = image.width;
      this.canvas.height = image.height;
      this.ctx.drawImage(image, 0, 0, image.width, image.height);
    }
    image.src = src;
    return (<div className={containerClassName}> 
      <div id="grooot" onDrop={this.handleDrop} onDragOver={(e) => { e.preventDefault(); }} />
      <div className="cropper" draggable={true} onDrag={ (e) => { this.handleDrag(e, 0) } } style={{ left:this.state.pos.left, right:this.state.pos.right }}>
        <span className="left" id="left" onDrag={ (e) => { this.handleDrag(e, 0) } } />
        <span className="right" id="right" onDrag={ (e) => { this.handleDrag(e, 1) } }/>
        <span className="top" id="top" onDrag={ (e) => { this.handleDrag(e, 2) } } />
        <span className="bottom" id="bottom" onDrag={ (e) => { this.handleDrag(e, 3) } } />
      </div>
      <button onClick={this.handleCrop} >Crop</button>
      { this.state.imageSrc && <img src={this.state.imageSrc} /> }
    </div>)
  }
}
