import { useEffect, useState, useTransition } from "react";
import { getCountryData } from "../api/postApi";
import { Loader } from "../components/UI/Loader";
import { CountryCard } from "../components/Layout/CountryCard";
import { SearchFilter } from "../components/UI/SearchFilter";

export const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await getCountryData();
        setCountries(res.data);
        setError(null);
        
        // Check if we're using fallback data
        if (res.statusText && res.statusText.includes("Fallback")) {
          setIsUsingFallback(true);
        } else {
          setIsUsingFallback(false);
        }
      } catch (err) {
        console.error("Error fetching countries:", err);
        setError("Failed to load countries. Please try again later.");
        // Set empty array to prevent rendering errors
        setCountries([]);
        setIsUsingFallback(false);
      }
    });
  }, []);

  if (isPending) return <Loader />;

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Retry
        </button>
      </div>
    );
  }

  const searchCountry = (country) => {
    if (search) {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  };

  const filterRegion = (country) => {
    if (filter === "all") return true;
    return country.region === filter;
  };

  // Filter countries based on search and filter
  const filterCountries = countries.filter(
    (country) => searchCountry(country) && filterRegion(country)
  );

  return (
    <section className="country-section">
      {isUsingFallback && (
        <div className="fallback-notice">
          <p>Using offline data due to connection issues. Some information may be limited.</p>
        </div>
      )}
      
      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        countries={countries}
        setCountries={setCountries}
      />

      {filterCountries.length === 0 ? (
        <div className="no-results">
          <h3>No countries found</h3>
          <p>Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid">
          {filterCountries.map((curCountry, index) => {
            return <CountryCard country={curCountry} key={index} />;
          })}
        </div>
      )}
    </section>
  );
};