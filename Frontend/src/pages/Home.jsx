import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";
import SectionHeader from "../components/movie/SectionHeader";
import MovieGrid from "../components/movie/MovieGrid";
import Pagination from "../components/movie/Pagination";
import Footer from "../components/layout/Footer";



export default function Home() {
    return (
        <>
            <TopStrip />
            <PosterStrip />
            <Navbar />
            <AlertBar />

            
            <MovieGrid />

            <Footer />
        </>
    );
}
