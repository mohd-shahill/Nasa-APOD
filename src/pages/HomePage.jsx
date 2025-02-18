import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader';
import StarryBackground from '../components/StarryBackground';
// import SearchPage from './SearchPage';
import { Link } from "react-router-dom";


function HomePage() {
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(true);
    const API_KEY = import.meta.env.VITE_NASA_API_KEY;

    useEffect(() => {
        const fetchRandomAPOD = async () => {
            try {
                // NASA APOD endpoint using count=1 for a random image
                const res = await axios.get(
                    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=1`
                );
                // The API returns an array; we take the first (and only) item
                setApod(res.data[0]);
            } catch (error) {
                console.error("Error fetching APOD:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRandomAPOD();
    }, [API_KEY]);

    if (loading) {
        return <SkeletonLoader />;
    }

    if (!apod) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl">No APOD found.</p>
            </div>
        );
    }

    return (
        // Outer fixed container that covers the full viewport
        <div className="relative inset-0 flex flex-col">
            <StarryBackground />
            {/* Header */}
            <h1 className="text-4xl text-white font-bold -mt-16 mb-4 text-center">
                NASA Astronomy Picture of the Day
            </h1>

            {/* Main content container: fixed, centered, with a consistent size */}
            <div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-[92vw] h-[79vh] max-h-screen rounded-lg overflow-hidden flex  bg-black/20" style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                        {/* Left Side - Photo / Video */}
                        <div className="w-1/2 flex items-center justify-center">
                            {apod.media_type === "image" ? (
                                <img
                                    src={apod.url}
                                    alt={apod.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            ) : (
                                <div className="w-full aspect-video">
                                    <iframe
                                        src={apod.url}
                                        title={apod.title}
                                        frameBorder="0"
                                        allow="encrypted-media"
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Right Side - Text */}
                        <div className="w-2/3 p-6">
                            <p className="text-base mb-1 text-left text-white font-semibold">
                                Date : {" "}
                                {new Date(apod.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </p>

                            {apod.copyright && (
                                <p className="text-lg mb-2">
                                    <span className="text-sm mb-1 text-left text-white font-semibold">Captured By : {" "}</span> 
                                    <span className='text-base mb-1 text-left text-white font-semibold'>{apod.copyright}</span>

                                </p>
                            )}

                            <h2 className="text-2xl text-white font-bold mb-2">{apod.title}</h2>
                            <p>
                                <span className="font-bold text-white">Explanation: </span>
                                <span className='text-white mt-2'>{apod.explanation}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Search Button */}
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-12">
                <Link to="/search">
                    <button
                        className="w-32 px-4 py-2 bg-transparent hover:bg-white/10 text-white border border-zinc-400 rounded">
                        Search
                    </button>
                </Link>
                {/* Randomize Button */}
                <button onClick={() => window.location.reload()}
                    className="w-32 px-4 py-2 bg-transparent hover:bg-white/10 text-white border border-zinc-400 rounded">
                    Randomize
                </button>
            </div>

        </div>
    );

}

export default HomePage;
