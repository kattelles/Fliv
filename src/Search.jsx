import React from 'react';
import Image from './Image';
import Masonry from 'react-masonry-component';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      query: '',
      photos: [],
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleQueryChange(event) {
    event.preventDefault();
    this.setState({query: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let url = this.buildUrl(this.state.query);
    this.makeApiCall(url);
  }

  buildUrl(query) {
    let flickr = 'https://api.flickr.com/services/rest/?method=';
    let method = 'flickr.photos.search&tags=';
    let parsedQuery = query.replace(/\s/g, '');
    let apiKey = '&api_key=ff9a7b7e5bd5865ab7069d061bf54b96';
    let formatting = '&per_page=100&format=json&nojsoncallback=1';
    return flickr + method + parsedQuery + apiKey + formatting;
  }

  makeApiCall(url) {
    fetch(url)
      .then(response => response.json())
      .then(results => {
        let photos = [];
        let max = 100;
        if (results.photos.total < max) {
          max = results.photos.total;
        }
        for (let i = 0; i < max; i++) {
          photos.push(results.photos.photo[i]);
        }
        this.setState({photos: photos});
      });
  }

  render() {
    let photos = this.state.photos.map(photo => {
      return (
        <Image key={photo.id}
                photoId={photo.id}
                farmId={photo.farm}
                secret={photo.secret}
                serverId={photo.server}
                addPhotoToAlbum={this.props.addPhotoToAlbum}/>
            );
    });

    return (
      <div className="search-outer">
        <form className="search" onSubmit={this.handleSubmit}>
          <input className="input"
              type="text"
              placeholder="search by tag or location"
              value={this.state.query}
              onChange={this.handleQueryChange}/><br/>
            <input type="submit" className="button" value="Search"/>
        </form>
        <Masonry>{photos}</Masonry>
      </div>
    );
  }
}

export default Search;
