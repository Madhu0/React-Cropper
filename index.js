const React = require('react');

export default class ImageCropper extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
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
    this.canvas = document.createElement('canvas');
    this.canvas.addEventListener('mousedown', (e) => { this.handleCanvasMouseDown(e); });
    // this.canvas.addEventListener('mousemove', (e) => { this.handleCanvasMouseMove(e); });
    this.canvas.addEventListener('mouseup', (e) => { this.handleCanvasMouseUp(e); });
    this.canvas.addEventListener('mouseout', (e) => { this.handleCanvasMouseOut(e) });
    // this.canvas.onMouseUp = this.handleCanvasMouseUp;
    this.ctx = this.canvas.getContext('2d');
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  handleCanvasMouseOut = (e) => {
    this.keyDown = false;
    this.canvas.removeEventListener('mousemove', this.handleCanvasMouseMove);
  }

  handleCanvasMouseDown = (e) => {
    console.log("in mouse down", e);
    this.startingCoords.x = e.pageX;
    this.startingCoords.y = e.pageY;
    this.canvas.addEventListener('mousemove', (e) => { this.handleCanvasMouseMove(e); });
    this.keyDown = true;
    this.rectangleElement = document.getElementById('rectangle');
    this.setState({
      showCropBox: true,
    });
  }

  handleCanvasMouseMove = (e) => {
    // console.log("in mouse move", e);
    this.mousePosition = e.pageX;
    this.mousePosition = e.pageY;
    const pos = {};
    const el = this.rectangleElement;
    if (el && this.keyDown) {
      const x = e.pageX;
      const y = e.pageY;
      pos.left = (this.startingCoords.x < x) ? this.startingCoords.x : x;
      pos.top = (this.startingCoords.y < y) ? this.startingCoords.y : y;
      pos.height = Math.abs(y - this.startingCoords.y);
      pos.width = Math.abs(x - this.startingCoords.x);
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
    pos.left = (this.startingCoords.x < x) ? this.startingCoords.x : x;
    pos.top = (this.startingCoords.y < y) ? this.startingCoords.y : y;
    pos.height = Math.abs(y - this.startingCoords.y);
    pos.width = Math.abs(x - this.startingCoords.x);
    this.keyDown = false;
    this.canvas.removeEventListener('mousemove', this.handleCanvasMouseMove);
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
    const cnavasPos = this.canvas.getBoundingClientRect();
    const sourceX = this.state.pos.left - cnavasPos.left - window.scrollX;
    const sourceY = this.state.pos.top - cnavasPos.top - window.scrollY;
    tempCanvas.height = this.state.pos.height;
    tempCanvas.width = this.state.pos.width;    
    tempCtx.drawImage(this.canvas, sourceX, sourceY, this.state.pos.width, this.state.pos.height, 0, 0, this.state.pos.width, this.state.pos.height);
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
      <div className="rectangle" id="rectangle" style={{ display: this.state.showCropBox ? 'block' : 'none' }}>
        <span id="left" className="left" style={{ top: this.state.pos.top + 'px', left: this.state.pos.left + 'px', height: this.state.pos.height + 'px' }} />
        <span id="top" className="top" style={{ top: this.state.pos.top + 'px', left: this.state.pos.left + 'px', width: this.state.pos.width + 'px' }} />
        <span id="right" className="right" style={{ top: this.state.pos.top + 'px', left: this.state.pos.left + this.state.pos.width + 'px', height: this.state.pos.height + 'px' }} />
        <span id="bottom" className="bottom" style={{ top: this.state.pos.top + this.state.pos.height + 'px', left: this.state.pos.left + 'px', width: this.state.pos.width + 'px' }} />
      </div>
      <div id="grooot" />
      <button onClick={this.handleCrop} >Crop</button>
      { this.state.imageSrc && <img src={this.state.imageSrc} /> }
    </div>)
  }
}
