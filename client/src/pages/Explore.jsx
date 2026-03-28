import { Link } from "react-router-dom";
import { useTravel } from "../context/TravelContext";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import "../CSS/explore.css";
export default function Explore() {
  const { publicTrips } = useTravel();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");
  const [selectedRegion, setSelectedRegion] = useState("all");

  const countries = [...new Set(publicTrips.map(t => t.country))];
  const regions =
    selectedCountry === "all"
      ? [...new Set(publicTrips.map(t => t.region))]
      : [...new Set(publicTrips.filter(t => t.country === selectedCountry).map(t => t.region))];

  const filteredTrips = publicTrips.filter(trip => {
    if (selectedCountry !== "all" && trip.country !== selectedCountry) return false;
    if (selectedRegion !== "all" && trip.region !== selectedRegion) return false;
    if (searchQuery && !trip.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
  <div className="explore-page">

    {/* HEADER */}
    <div className="explore-header">
      <h1>Explore Travel Stories</h1>
      <p>Discover amazing journeys from travelers around the world</p>
    </div>

    {/* SEARCH BOX */}
    <div className="explore-search">
      <div className="search-input">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search trips..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <select
        value={selectedCountry}
        onChange={(e) => {
          setSelectedCountry(e.target.value);
          setSelectedRegion("all");
        }}
      >
        <option value="all">All Countries</option>
        {countries.map(c => <option key={c}>{c}</option>)}
      </select>

      <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        <option value="all">All Regions</option>
        {regions.map(r => <option key={r}>{r}</option>)}
      </select>
    </div>

    {/* ✅ THIS IS THE CORRECT PLACE */}
    <div className="explore-info">
      <span>
        Showing {filteredTrips.length} {filteredTrips.length === 1 ? "trip" : "trips"}
      </span>

      {(searchQuery || selectedCountry !== "all" || selectedRegion !== "all") && (
        <button
          className="clear-btn"
          onClick={() => {
            setSearchQuery("");
            setSelectedCountry("all");
            setSelectedRegion("all");
          }}
        >
          Clear Filters
        </button>
      )}
    </div>

    {/* GRID */}
    <div className="trip-grid">
      {filteredTrips.map(trip => (
        <Link to={`/trip/${trip.id}`} key={trip.id} className="trip-card">

          <div className="card-image">
            <img src={trip.coverImage} alt={trip.title} />
            <div className="overlay"></div>

            <div className="card-content">
              <div className="location">
                <MapPin size={14} />
                <span>{trip.region}, {trip.country}</span>
              </div>

              <h3>{trip.title}</h3>

              <p className="date">
                {new Date(trip.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          <div className="card-footer">
            <span>{trip.images.length} photos</span>
            <span className="read">Read Story →</span>
          </div>

        </Link>
      ))}
    </div>

  </div>
);
}