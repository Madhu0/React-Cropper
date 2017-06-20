const React = require('react');

export default class ImageCropper extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
<<<<<<< Updated upstream
    this.state = {};
=======
    this.state = {
      pos: {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
      },
      showCropBox: false,
    };
    this.startingCoords = {},
>>>>>>> Stashed changes
    this.canvas = document.createElement('canvas');
    this.canvas.addEventListener('mousedown', (e) => { this.handleCanvasMouseDown(e); });
    // this.canvas.addEventListener('mousemove', (e) => { this.handleCanvasMouseMove(e); });
    this.canvas.addEventListener('mouseup', (e) => { this.handleCanvasMouseUp(e); });
    // this.canvas.onMouseUp = this.handleCanvasMouseUp;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleCanvasMouseDown = (e) => {
    console.log("in mouse down", e);
    this.startingCoords.x = e.pageX;
    this.startingCoords.y = e.pageY;
    this.canvas.addEventListener('mousemove', (e) => { this.handleCanvasMouseMove(e); });
    this.keyDown = true;
    this.setState({
      showCropBox: true,
    });
  }

  handleCanvasMouseMove = (e) => {
    // console.log("in mouse move", e);
    this.mousePosition = e.pageX;
    this.mousePosition = e.pageY;
    const el = document.getElementById('rectangle');
    const pos = {};
    if (el && this.keyDown) {
      const x = e.pageX;
      const y = e.pageY;
      pos.left = ((this.startingCoords.x < x) ? this.startingCoords.x : x) + 'px';
      pos.top = ((this.startingCoords.y < y) ? this.startingCoords.y : y) + 'px';
      pos.height = Math.abs(y - this.startingCoords.y) + 'px';
      pos.width = Math.abs(x - this.startingCoords.x) + 'px';
      this.setState({
        pos,
      });
    }
  }

  handleCanvasMouseUp = (e) => {
    console.log("in mouse Up", e);
    const el = document.getElementById('rectangle');
    const x = e.pageX;
    const y = e.pageY;
    const pos = {};
    pos.left = ((this.startingCoords.x < x) ? this.startingCoords.x : x) + 'px';
    pos.top = ((this.startingCoords.y < y) ? this.startingCoords.y : y) + 'px';
    pos.height = Math.abs(y - this.startingCoords.y) + 'px';
    pos.width = Math.abs(x - this.startingCoords.x) + 'px';
    this.keyDown = false;
    this.canvas.removeEventListner('mousemove', this.handleCanvasMouseMove);
    this.setState({
      pos,
    });
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

<<<<<<< Updated upstream
=======
  handleImageDragStart = (e) => {
    this.startingCoords = {
      x: e.screenX,
      y: e.screenY,
    };
    console.log("in drag start");
  }

  handleImageDragEnd = (e) => {
    this.setState({
      pos: {
        x1: this.startingCoords.x,
        y1: this.startingCoords.y,
        x2: e.screenX,
        y2: e.screenY,
      },
      showCropBox: true,
    });
    console.log("in drag end");
  }

  testClick = (e) => {
    // lol
    var lol = 'lol';
    // just lolling
    console.log(e);
  }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    return (<div className={containerClassName}> 
      <div id="grooot" onDrop={this.handleDrop} onDragOver={(e) => { e.preventDefault(); }} />
      <div className="cropper" draggable={true} onDrag={ (e) => { this.handleDrag(e, 0) } } style={{ left:this.state.pos.left, right:this.state.pos.right }}>
        <span className="left" id="left" onDrag={ (e) => { this.handleDrag(e, 0) } } />
        <span className="right" id="right" onDrag={ (e) => { this.handleDrag(e, 1) } }/>
        <span className="top" id="top" onDrag={ (e) => { this.handleDrag(e, 2) } } />
        <span className="bottom" id="bottom" onDrag={ (e) => { this.handleDrag(e, 3) } } />
      </div>
=======
    let x1 = this.state.pos.x1;
    let x2 = this.state.pos.x2;
    let y1 = this.state.pos.y1;
    let y2 = this.state.pos.y2;
    let cropBoxHeight = this.state.pos.y2 - this.state.pos.y1;
    if (cropBoxHeight < 0) {
      cropBoxHeight *= -1;
      y2 = this.state.pos.y1;
      y1 = this.state.pos.y2;
    }
    let cropBoxWidth = this.state.pos.x2 - this.state.pos.x1;
    if (cropBoxWidth < 0) {
      cropBoxWidth *= -1;
      x2 = this.state.pos.x1;
      x1 = this.state.pos.x2;
    }
    console.log('position', this.state.pos);
    return (<div className={containerClassName}> 
      <div id="grooot" />
      <div className="rectangle" id="rectangle" style={{ display: this.state.showCropBox ? 'block' : 'none', top: this.state.pos.top, left: this.state.pos.left, width: this.state.pos.width, height: this.state.pos.height }}/>
>>>>>>> Stashed changes
      <button onClick={this.handleCrop} >Crop</button>
      { this.state.imageSrc && <img src={this.state.imageSrc} /> }
    </div>)
  }
}
