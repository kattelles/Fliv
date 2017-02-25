import React from 'react';
import Modal from "react-modal";

class Image extends React.Component {
  constructor() {
    super();
    this.state = {
      url: '',
      modalOpen: false,
    };
    this.modalClose = this.modalClose.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.addToAlbum = this.addToAlbum.bind(this);
  }

  modalClose() {
    this.setState({modalOpen: false});
  }

  modalOpen() {
    this.setState({modalOpen: true});
  }

  addToAlbum() {
    this.modalClose();
    this.props.addPhotoToAlbum(this.state.url);
  }

  componentDidMount() {
    let farmId = this.props.farmId;
    let serverId = this.props.serverId;
    let photoId = this.props.photoId;
    let secret = this.props.secret;
    let baseUrl = 'https://farm' + farmId + '.staticflickr.com/' + serverId
      + '/' + photoId + '_' + secret;
    let photoUrl = baseUrl + '_q.jpg';
    let modalUrl = baseUrl + '_z.jpg';
    this.setState({
      url: photoUrl,
      modalUrl: modalUrl
    });
  }

  render() {
    return (
      <span>
        <img onClick={this.modalOpen}
              className="image"
              role="presentation"
              src={this.state.url}/>
          <Modal
            className="modal"
            contentLabel="images"
            isOpen={this.state.modalOpen}
            onRequestClose={this.modalClose}
            onAfterOpen={this.modalOpen}>
            <img onClick={this.modalOpen}
                  role="presentation"
                  src={this.state.modalUrl}
                  width="400" height="400"/>
            <div className="modal-inner">
              Add to photo album?
              <span className="button" onClick={this.addToAlbum}>Yes</span>
              <span className="button" onClick={this.modalClose}>No</span>
            </div>
          </Modal>
      </span>
      );
  }
}

export default Image;
