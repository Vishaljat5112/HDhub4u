import React from "react";
import TopStrip from "../layout/TopStrip";
import PosterStrip from "../layout/PosterStrip";    
import Navbar from "../layout/Navbar";
import AlertBar from "../layout/AlertBar";
import Footer from "../layout/Footer";






export default function MovieDetails() {
    return (
        <>
            <TopStrip />
            <PosterStrip />
            <Navbar />
            <AlertBar />

            
            

            <Footer />
        </>
    );
}