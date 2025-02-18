import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import StarryBackground from "../components/StarryBackground";

const APODDetails = () => {
    const { date } = useParams(); // Get date from URL
    const location = useLocation();
    const navigate = useNavigate();
    const apodData = location.state?.data; // Get passed data
    // const apodData = JSON.parse(localStorage.getItem("apodDetails"));


    if (!apodData) {
        return <p className="text-white text-center">No data available.</p>;
    }

    return (
        <div className="relative inset-0 flex flex-col">
            <StarryBackground />

            {/* Header */}
            <h1 className="text-4xl text-white font-bold -mt-16 mb-4 text-center">
                NASA Astronomy Picture of the Day
            </h1>

            <div className="w-[92vw] h-[79vh] max-h-screen rounded-lg overflow-hidden flex  bg-black/20" style={{ boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.2)" }}>
                {/* Left Side: Image */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src={apodData.hdurl || apodData.url}
                        alt={apodData.title}
                        className="w-full h-auto rounded-lg"
                    />
                </div>

                {/* Right Side: Details */}
                <div className="md:w-1/2 p-6 text-white">
                    <p className="text-sm mb-0 text-left text-white font-semibold">
                        <span className="font-semibold">Date:</span> {new Date(apodData.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                    </p>

                    {apodData.copyright && (
                        <p className="text-lg mb-6">
                            <span className="font-semibold">Captured By:</span> {apodData.copyright}
                        </p>
                    )}
                    
                    <h2 className="text-2xl text-white font-bold">{apodData.title}</h2>
                    <p className="mt-2">{apodData.explanation}</p>


                </div>
            </div>
            {/* Buttons */}
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-12">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="w-32 px-4 py-2 bg-transparent hover:bg-white/10 text-white border border-zinc-400 rounded">

                    Back
                </button>

                {/* Home Button */}
                {/* <Link
                    to="/"
                    className="w-32 px-10 py-2 bg-transparent hover:bg-white/10 text-white border border-zinc-400 rounded">
                    Home
                </Link> */}
            </div>
        </div>
    );
};

export default APODDetails;
