import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import StarryBackground from "../components/StarryBackground";
import SearchSkeletonLoader from "../components/SearchSkeletonLoader";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState(""); // Keyword search input
  const [pickDate, setPickDate] = useState(null); // Start date filter
  const [startDate, setStartDate] = useState(null); // Start date filter
  const [endDate, setEndDate] = useState(null); // End date filter
  const [results, setResults] = useState([]); // APOD search results
  const [loading, setLoading] = useState(false); // New loading state

  const API_KEY = import.meta.env.VITE_NASA_API_KEY; // NASA API Key

  // Function to fetch APOD data based on search query and date range
  const fetchData = async () => {
    setLoading(true); // Start loading before fetching

    let url = "";
    // If no search criteria is provided, fetch recent images (last 10 days)
    if (pickDate) {
      // If a specific date is picked, fetch the APOD for that date
      url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${formatDate(pickDate)}`;
    } else if (startDate && endDate) {
      // If a date range is provided, fetch images for that range
      url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formatDate(startDate)}&end_date=${formatDate(endDate)}`;
    } else if (query) {
      // If only a keyword is provided, use your backend for keyword search
      url = `https://nasa-apod-vglf.onrender.com/search?query=${query}`;
    } else {
      // If no search criteria is provided, fetch recent images (last 10 days)
      const today = new Date();
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(today.getDate() - 11); // Last 10 days including today
      url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${formatDate(tenDaysAgo)}&end_date=${formatDate(today)}&thumbs=true`;
    }


    try {
      const response = await fetch(url);
      const data = await response.json();
      setResults(
        Array.isArray(data)
          ? data.sort((a, b) => new Date(b.date) - new Date(a.date))
          : [data]
      ); // Ensure it's an array and sort descending by date
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  // Format date to YYYY-MM-DD for API
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  // Real-time search effect with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchData();
    }, 500); // Debounce API calls to prevent excessive requests

    return () => clearTimeout(delayDebounceFn);
  }, [query, startDate, endDate, pickDate]);

  return (
    <div className="min-h-screen p-8">
      <StarryBackground />

      {/* Home Button */}
      <div className="mb-4 text-right">
        <Link
          to="/"
          className="px-4 py-2 bg-transparent border border-zinc-400 text-white rounded hover:bg-white/10"
        >
          Home
        </Link>
      </div>

      {/* Container with fixed width */}
      <div className="max-w-7xl mx-auto">

        {/* Search Bar */}
        <h1 className="text-4xl text-white font-bold mb-4 text-left">Search</h1>
        <div className="flex items-center space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search by keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-3 border bg-transparent text-white border-zinc-400 rounded-md"
            style={{ width: "1250px" }}
          />

          {/* Pick a single date */}
          <div style={{ width: "200px" }}>
            <DatePicker
              selected={pickDate}
              onChange={(date) => setPickDate(date)}
              className="border p-3 bg-transparent text-white border-zinc-400 rounded-md"
              placeholderText="Pick a Date"
            />
          </div>
        </div>

        {/* Date Pickers */}
        <div className="flex space-x-6 mb-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="border p-2 bg-transparent text-white border-zinc-400 rounded-md w-72"
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="border p-2 bg-transparent text-white border-zinc-400 rounded-md w-72"
            placeholderText="End Date"
          />
        </div>

        {/* Results Grid or Skeleton Loader */}
        {loading ? (
          <SearchSkeletonLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
            {results.length > 0 ? (
              results.map((item, index) => (
                <div key={index} className="border p-4 border-zinc-400 rounded-lg shadow bg-transparent">
                  <img
                    src={item.thumbnail_url || item.url}
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <p className="mt-2 text-white font-bold">
                    Date:{" "}
                    {new Date(item.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-white">
                    Captured By: {item.copyright || "NASA"}
                  </p>
                  <Link
                    to={`/details/${item.date}`}
                    state={{ data: item }}
                    className="text-blue-500 text-sm mt-2 block"
                  >
                    More Info
                  </Link>

                </div>
              ))
            ) : (
              <p className="text-gray-500">No results found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
