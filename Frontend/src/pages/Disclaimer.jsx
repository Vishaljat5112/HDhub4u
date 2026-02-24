import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";
import { Link } from "react-router-dom";


export default function Disclaimer() {
  return (
    <div className="bg-black text-white min-h-screen">

      <TopStrip/>
      <PosterStrip/>
      <Navbar/>
      <AlertBar/>
      

      {/* GO TO HOME */}
      <div className="flex justify-center my-6">
        <Link
          to="/"
          className="bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-md text-sm font-medium"
        >
          Go to HomePage 🏠
        </Link>
      </div>

      {/* DISCLAIMER CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-6 border-t border-gray-700">
        <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
          📄 Disclaimer
        </h2>

        <h3 className="text-center text-lg font-semibold mb-2">
          "Disclaimer for HDHub4u.TV"
        </h3>
        <p className="text-center text-yellow-400 font-medium mb-6">
          Welcome to HDHub4u !
        </p>

        <div className="space-y-5 text-gray-300 text-sm leading-relaxed">

          <p>
            At HDHub4u.TV, we are dedicated to offering our users a{" "}
            <span className="text-white font-semibold">PREMIUM EXPERIENCE</span>{" "}
            when it comes to accessing a Wide Range of Movies and
            TV-Shows / Web-Series.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">High-Quality Video and Audio:</span>{" "}
            HDHub4u prides itself on providing High-Quality video Resolutions
            and Exceptional Audio Clarity.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Fast Downloading Links:</span>{" "}
            Enjoy Seamless Downloads so you can Spend More Time Watching &
            Less Time Waiting.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Safety First:</span>{" "}
            All files are checked to ensure they are free of malware, viruses,
            and harmful content.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">First on the Net HDCAMs:</span>{" "}
            We strive to be at the forefront of entertainment by offering
            First-On-The-Net high-quality releases.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Content Accessibility:</span>{" "}
            We help users discover a variety of Films and Television Shows
            across different languages and genres.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Respecting Copyright Laws:</span>{" "}
            HDHub4u.TV does not host any content on its servers and only links
            to third-party sites.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Promoting Legal Alternatives:</span>{" "}
            We encourage the use of official streaming platforms to support
            creators.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">User Responsibility:</span>{" "}
            Users are responsible for complying with local laws in their
            jurisdiction.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Feedback & Improvement:</span>{" "}
            Your feedback helps us improve and serve you better.
          </p>

          <p>
            <span className="text-yellow-400 font-semibold">Educating Users:</span>{" "}
            We promote fair use and respect for intellectual property.
          </p>

          <p className="text-center text-yellow-500 font-semibold pt-6">
            Thank you for choosing HDHub4u.TV! Enjoy High-Quality Entertainment.
            Happy Viewing!
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 border-t border-gray-800 bg-black">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} HDHub4u.TV • All Rights Reserved
          </p>
          <p className="mt-2">
            Disclaimer • Privacy Policy • DMCA • Contact Us
          </p>
        </div>
        
      </footer>
      

    </div>
  );
}