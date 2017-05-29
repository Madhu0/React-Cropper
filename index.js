const React = require('react');

export default class ImageCropper extends React.Component {

  static propTypes = {
    src: React.PropTypes.string,
    containerClassName: React.PropTypes.string,
  }

  constructor(props) {
    this.ctx = canvas.getContext();
  }

  rotate = (degrees) => {
    document.getElementById('image-figure').style.transform = `rotate(${degrees}deg)`;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.src !== nextProps.src) {
      const image = <img src={nextProps.src} />
      this.ctx.drawImage(image, 0, 0);
    }
  }

  componentDidMount(){
    
  }

  render() {
    const { src, containerClassName } = this.props;
    return (<div className={containerClassName}>
      <div ir="grooot" />
    </div>)
  }
}
