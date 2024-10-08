import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";





export class News extends Component {
  // static used to use proptypes 
  static defaultProps={
   country:'in',
   pageSize:6,
   category:'general',
    }
  static propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string,
  }
  constructor() {
    //must call super constructorin derived class
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0,
    };
   
  }

async updateNews(){
  const url =
      `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1bb3dca857364bdcb00391db14499157&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      //pagesize tells number of article in a page
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults ,loading: false});
}

  // priority order of running:constructor>render>componentDidMount
  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1bb3dca857364bdcb00391db14499157&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //this.setState({articles: parsedData.articles})
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.updateNews();
    
  }

  handlePrevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1bb3dca857364bdcb00391db14499157&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // //this.setState({articles: parsedData.articles})
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false,
    // });
    this.setState({page: this.state.page - 1});
    this.updateNews();
  };

  handleNextClick = async () => {
  //   if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1bb3dca857364bdcb00391db14499157&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   this.setState({loading: true});
  //   let data = await fetch(url);
  //   let parsedData = await data.json();
  //   // this.setState({articles: parsedData.articles})
   
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false,
  //   });
  // };
  this.setState({page: this.state.page + 1 });
  this.updateNews();
  }

  fetchMoreData = async() => {
    this.setState({page: this.state.page +1});
    const url =
    `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1bb3dca857364bdcb00391db14499157&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
    //pagesize tells number of article in a page
  let data = await fetch(url);
  let parsedData = await data.json();
  this.setState({ articles: this.state.articles.concat (parsedData.articles),totalResults:parsedData.totalResults });
    
  };

  render() {
    return (
      <>
        <h1 className="text-center"style={{margin:'30px 0px'}}>NewsMonkey-Top Headlines</h1>
    {this.state.loading && <Spinner/>}
        {/* map is a higher order array method */}
        <InfiniteScroll
          dataLength={this.state.articles ? this.state.articles.length : 0}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
<div className="container">
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            );
          })}
          </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            class="btn btn-dark mx-2"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize)}
            type="button"
            class="btn btn-dark mx-2"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </> 
    );
  }
}

export default News;
