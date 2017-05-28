const React = require('react');

export default class ImageCropper extends React.Component {

  // static propTypes = {
  //   src: React.PropTypes.string,
  //   containerClassName: React.PropTypes.string,
  // }

  rotate = (degrees) => {
    document.getElementById('image-figure').style.transform = `rotate(${degrees}deg)`;
  }

  render() {
    const { src, containerClassName } = this.props;
    return (<div className={containerClassName}>
      <figure id="image-figure">
        <img src={src} />
      </figure>  
    </div>)
  }
}
