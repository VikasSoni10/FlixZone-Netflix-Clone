import React, { useState, useEffect } from 'react'
import './Home.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {BiPlay} from 'react-icons/bi';
import {AiOutlinePlus} from 'react-icons/ai';


const movieUrl = "https://api.themoviedb.org/3/movie/";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";
const upcoming = "upcoming";
const apiKey = "e8eaaf61359d1e4a1182457f0e80e40d";
const imgUrl = "https://image.tmdb.org/t/p/original"

const Card = ({ img }) => {
  return (
    <img className='card' src={img} alt="cover" />
  );
}

const Row = ({ title, arr = [] }) => {
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div>
        {
          arr.map((item, ind) => (
            <Card key={ind} img={`${imgUrl}${item.backdrop_path}`} />
          ))
        }
      </div>
    </div>
  );
}

const Home = () => {

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genre, setGenre] = useState([]);


  useEffect(() => {
    const getNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${movieUrl}/${nowPlaying}?api_key=${apiKey}`);
      // console.log(results)
      setNowPlayingMovies(results);
    }

    const getPopular = async () => {
      const { data: { results } } = await axios.get(`${movieUrl}/${popular}?api_key=${apiKey}`);
      console.log(results)
      setPopularMovies(results);
    }

    const getTopRated = async () => {
      const { data: { results } } = await axios.get(`${movieUrl}/${topRated}?api_key=${apiKey}`);
      // console.log(results)
      setTopRatedMovies(results);
    }

    const getUpcoming = async () => {
      const { data: { results } } = await axios.get(`${movieUrl}/${upcoming}?api_key=${apiKey}`);
      // console.log(results)
      setUpcomingMovies(results);
    }

    const getGenre = async () => {
      const { data: { genres } } = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
      // console.log(genre)
      setGenre(genres);
    }

    getNowPlaying();
    getPopular();
    getTopRated();
    getUpcoming();
    getGenre();
  }, [])


  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgUrl}${popularMovies[0].backdrop_path}`})` : "rgb(10, 10, 10)"
      }}>

       
         {popularMovies[0] &&  <h1>{popularMovies[0].original_title}</h1>}
         {popularMovies[0] &&  <p>{popularMovies[0].overview}</p>}

        <div>
        <button><BiPlay /> Play</button>
       <button><AiOutlinePlus /> My List</button>
       </div>  
      

      </div>

      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topRatedMovies} />
      <Row title={"Upcoming"} arr={upcomingMovies} />
      <div className='genre'>
      {
        genre.map((item)=>(
          <Link key={item.id} to={`genre/${item.id}`}>{item.name}</Link>
        ))
      }
      </div>
      
    </section >
  )
}

export default Home;