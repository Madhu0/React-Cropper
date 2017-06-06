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
    // console.log("drag", e, id);
    // e.dataTransfer.setData("text", e.target.id);
    if (id === 'left') {
      this.setState({
        pos : Object.assign({}, this.state.pos, {
          x1: e.pageX,
        })
      });
    } else if (id === 'right') {
      this.setState({
        pos : Object.assign({}, this.state.pos, {
          x2: e.pageX,
        })
      });
    } else if (id === 'top') {
      this.setState({
        pos : Object.assign({}, this.state.pos, {
          y1: e.pageY,
        })
      });
    } else {
      this.setState({
        pos : Object.assign({}, this.state.pos, {
          y2: e.pageY,
        })
      });
    }
  }

  handleDrop = (e) => {
    console.log("drop", e);
    const data = e.dataTransfer.getData('text');
    console.log("data", data);
  }

  handleImageDragStart = (e) => {
    this.startingCoords = {
      x: e.pageX,
      y: e.pageY,
    };
    console.log("in drag start");
  }

  handleImageDragEnd = (e) => {
    this.setState({
      pos: {
        x1: this.startingCoords.x,
        y1: this.startingCoords.y,
        x2: e.pageX,
        y2: e.pageY,
      },
      showCropBox: true,
    });
    console.log("in drag end");
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
    console.log("state", this.state)
    image.src = src;
    let cropBoxHeight = this.state.pos.y1 - this.state.pos.y2;
    if (cropBoxHeight < 0) {
      cropBoxHeight *= -1;
    }
    let cropBoxWidth = this.state.pos.x1 - this.state.pos.x2;
    if (cropBoxWidth < 0) {
      cropBoxWidth *= -1;
    }
    return (<div className={containerClassName}> 
      <div id="grooot" draggable={true} onDragStart={(e) => { this.handleImageDragStart(e); }} onDragEnd={(e) => { this.handleImageDragEnd(e) }} />
      {this.state.showCropBox && <div className="cropper" draggable={true} >
        <span className="left" id="left" draggable={true} onDragEnd={ (e) => { this.handleDrag(e, 'left') } } style={{ left:this.state.pos.x1, top:this.state.pos.y1, height: cropBoxHeight }} />
        <span className="right" id="right" draggable={true} onDragEnd={ (e) => { this.handleDrag(e, 'right') } } style={{ left:this.state.pos.x2, top:this.state.pos.y1, height: cropBoxHeight }} />
        <span className="top" id="top" draggable={true} onDragEnd={ (e) => { this.handleDrag(e, 'top') } } style={{ left:this.state.pos.x1, top:this.state.pos.y1, width: cropBoxWidth }} />
        <span className="bottom" id="bottom" draggable={true} onDragEnd={ (e) => { this.handleDrag(e, 'bottom') } } style={{ left:this.state.pos.x1, top:this.state.pos.y2, width: cropBoxWidth }} />
      </div>}
      <button onClick={this.handleCrop} >Crop</button>
      { this.state.imageSrc && <img src={this.state.imageSrc} /> }
    </div>)
  }
}
