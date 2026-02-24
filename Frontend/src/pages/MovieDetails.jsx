import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/movieApi";
import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";
import MovieHeader from "../components/movie/MovieHeader";
import MovieMeta from "../components/movie/MovieMeta";
import MovieScreenshots from "../components/movie/MovieScreenshots";
import MovieDownload from "../components/movie/MovieDownload";
import MovieTrailer from "../components/movie/MovieTrailer";
import MovieFooter from "../components/movie/MovieFooter";



const MovieDetail = () => {

    //  FIRST: define slug
    const { slug } = useParams();

    //  THEN: use it
    console.log("Slug from URL ", slug);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;

        getMovieDetail(slug)
            .then(res => {
                console.log("API RESPONSE ", res.data);
                setData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("API ERROR ", err);
                setError("Movie not found");
                setLoading(false);
            });
    }, [slug]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data?.movie) return <div>Movie not found</div>;

   return (
  <div
    className="
      min-h-screen w-full
      bg-black text-white
      overflow-x-hidden
    "
  >
    {/* Top utility strips */}
    <TopStrip />
    <PosterStrip />
    <Navbar />
    <AlertBar />

    {/* Main content container */}
    <div
      className="
        max-w-350
        mx-auto
        px-3 sm:px-4 md:px-6
        py-4 sm:py-6
      "
    >
      <MovieHeader title={data.movie.title} />

      <MovieMeta
        movie={data.movie}
        genres={data.genres}
      />

      <MovieScreenshots screenshots={data.screenshots} />

      <MovieDownload title={data.movie.title} />

      <MovieTrailer
        title={data.movie.title}
        poster={data.movie.poster}
        trailer={data.movie.trailer}
      />

      <MovieFooter title={data.movie.title} />
    </div>
  </div>
);
}

export default MovieDetail;