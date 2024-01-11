import React, { Component } from "react";

export class NewsItem extends Component {
    constructor(){
        //must call super constructorin derived class 
        super();
    }
  render() {
   let {title,description,imageUrl,newsUrl,author,date,source} = this.props;
    return (
      <div className="my-3">
        <div class="card" >
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex:'1'}}>{source}</span>
          <img src={!imageUrl?"https://motionarray.imgix.net/preview-327986-dY2hb6egMT-high_0015.jpg?w=660&q=60&fit=max&auto=format":imageUrl} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{title} </h5>
            <p class="card-text">{description}</p>
            <p class="card-text"><small class="text-muted">By {!author?"unknown": author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" class="btn btn-sm btn-dark">
              {/* _blank se article new tab mein khul jata hai */}
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
