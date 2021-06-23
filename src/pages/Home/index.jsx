import { Component } from 'react';
import './styles.css';
import { loadPosts } from "../../service/loadPosts"
import { Posts } from "../../components/Posts/Posts"
import { Button } from '../../components/Button/Button';
import {TextInput} from "../../components/TextInput/TextInput"
  
class Home extends Component {
  state = {
    posts: [], 
    allPosts: [],
    page: 0,
    postsPerPage: 53,
    searchValue: ''
  };

async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue ? allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts; 

    return (
      <section className="container">
        <div className="search-container">
          <TextInput handleChange={this.handleChange} searchValue={searchValue} />
        </div>
        
        {filteredPosts.length > 0 && (<Posts posts={filteredPosts} />)}
        {filteredPosts.length === 0 && ( <h1 className="h1">Não existem posts :'( </h1>)}
        <div className="button-container">
          {!searchValue && (
           <Button disabled={ noMorePosts } text={'Loading More Posts'} onClick={this.loadMorePosts} />
          )}
        </div>
      
      </section>
    );
  }
}
export default Home;
