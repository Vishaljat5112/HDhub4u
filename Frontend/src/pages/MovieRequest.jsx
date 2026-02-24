import AlertBar from "../components/layout/AlertBar";
import Navbar from "../components/layout/Navbar";
import PosterStrip from "../components/layout/PosterStrip";
import TopStrip from "../components/layout/TopStrip";

import { Link } from "react-router-dom";

export default function MovieRequest() {
    return (
        <div className="bg-black text-white min-h-screen">


            <TopStrip />
            <PosterStrip />
            <Navbar />
            <AlertBar />

            {/* GO TO HOME */}
            <div className="flex justify-center py-4 border-b border-gray-800">
                <Link
                    to="/"
                    className="bg-gray-800 hover:bg-gray-700 transition px-5 py-2 rounded-md text-sm font-medium"
                >
                    Go to HomePage 🏠
                </Link>
            </div>

            {/* PAGE TITLE */}
            <div className="max-w-6xl mx-auto px-4 py-6">
                <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                    📝 Movie Request Page
                </h2>

                <p className="text-center text-green-400 italic mb-2">
                    Kindly search on our site before making a request.
                </p>

                <p className="text-center text-red-500 font-semibold text-lg mb-6">
                    Make Request Down in Comments !!!
                </p>

                {/* RULES */}
                <div className="border-t border-b border-gray-700 py-6">
                    <h3 className="text-center text-xl font-bold mb-6">#RULES</h3>

                    <ul className="space-y-4 text-sm text-gray-300 text-center max-w-3xl mx-auto">
                        <li>1- Don't Ask for specific Link or size (we will give you the best).</li>
                        <li>2- ALL QUALITY's will be provided for any movie Asked.</li>
                        <li>3- Don't ask for another request before your first request was finished.</li>
                        <li>4- Don't ask twice for the same request.</li>
                        <li>5- All requests will processed one by one.</li>
                        <li>6- Provide us IMDB link for movies to make on comment Section.</li>
                        <li>7- Don't Request Series / TV Shows (we don't take it).</li>
                        <li>8- We are not Robot so give us some time.</li>
                    </ul>
                </div>

                {/* TEAM LINE */}
                <div className="text-center text-lg font-semibold my-8">
                    …. HDHUB4u Team ….
                </div>

                {/* COMMENT SECTION (UI ONLY) */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-400">
                        ✉ Subscribe
                    </div>

                    <div className="flex items-center gap-3 bg-white rounded-md px-4 py-3 max-w-3xl mx-auto">
                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black">
                            👤
                        </div>
                        <input
                            type="text"
                            placeholder="Join the discussion..."
                            className="w-full outline-none text-black text-sm"
                            autoComplete="off"
                        />
                    </div>

                    <p className="text-center text-xs text-gray-500 mt-3">
                        Comment system is for display purpose only.
                    </p>
                </div>
            </div>

            {/* FOOTER */}
            <footer className="mt-12 border-t border-gray-800 bg-black">
                <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} HDHub4u.TV • All Rights Reserved</p>
                    <p className="mt-2">
                        Disclaimer • How To Download • Join Our Group • Movie Request
                    </p>
                </div>
            </footer>

        </div>
    );
}