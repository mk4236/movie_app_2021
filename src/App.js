import './App.css';
import Movies from './components/movies';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    isLoading: true,
    movies: [],
  };

  getMovies = async () => {
    const url =
      'https://yts-proxy.nomadcoders1.now.sh/list_movies.json?sort_by=rating';
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(url);
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section>
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading.....</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => {
              console.log(movie);
              return (
                <Movies
                  key={movie.id}
                  id={movie.id}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.summary}
                  poster={movie.medium_cover_image}
                  genres={movie.genres}
                />
              );
            })}
          </div>
        )}
      </section>
    );
  }
}

export default App;
