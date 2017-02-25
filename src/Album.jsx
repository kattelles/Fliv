import React from 'react';
import Search from './Search';
import Masonry from 'react-masonry-component';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      photos: [],
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.createAlbum = this.createAlbum.bind(this);
    this.addPhotoToAlbum = this.addPhotoToAlbum.bind(this);
  }

  createAlbum(event) {
    event.preventDefault();
    this.setState ({
      photos: [],
      albumName: this.state.albumName,
      albumDate: this.state.albumDate,
    });
  }

  handleNameChange(event) {
    event.preventDefault();
    this.setState({albumName: event.target.value});
  }

  handleDateChange(event) {
    event.preventDefault();
    this.setState({albumDate: event.target.value});
  }

  addPhotoToAlbum(photoUrl) {
    let photos = this.state.photos;
    photos.push(photoUrl);
    this.setState({photos: photos})
  }

  render() {
    let photos = this.state.photos.map(photo => {
      return (
        <img key={photo.url} src={photo}/>
      );
    });

    return (
      <div className="app">
        <div className="album-outer">
          <div className="album-header">My Photo Album</div>
          <Masonry>{photos}</Masonry>
        </div>
        <Search addPhotoToAlbum={this.addPhotoToAlbum}/>
      </div>
    );
  }
}

export default Album;
