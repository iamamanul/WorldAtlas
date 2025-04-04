import axios from "axios";
import fallbackData from "./countryData.json";

// Create axios instance with base URL and timeout
const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 15000, // Increased timeout to 15 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add response interceptor to handle errors globally
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error);
    // Return a rejected promise to allow component-level error handling
    return Promise.reject(error);
  }
);

// Helper function to convert fallback data to match API response format
const convertFallbackData = (data) => {
  return data.map(country => ({
    name: {
      common: country.countryName,
      official: country.countryName
    },
    population: typeof country.population === 'number' ? country.population : 0,
    region: "Unknown",
    capital: [country.capital],
    flags: {
      svg: "/images/placeholder-flag.svg",
      alt: `Flag of ${country.countryName}`
    },
    // Additional fields for detailed view
    subregion: "Unknown",
    tld: ["N/A"],
    currencies: { USD: { name: "US Dollar" } },
    languages: { eng: "English" },
    borders: []
  }));
};

// HTTP GET METHOD for all countries
export const getCountryData = async () => {
  try {
    return await api.get("/all?fields=name,population,region,capital,flags");
  } catch (error) {
    console.error("Error fetching countries:", error);
    console.log("Using fallback data instead");
    
    // Return a response-like object with fallback data
    return {
      data: convertFallbackData(fallbackData),
      status: 200,
      statusText: "OK (Fallback Data)"
    };
  }
};

// HTTP GET METHOD for individual country by name
export const getCountryIndData = async (name) => {
  try {
    return await api.get(
      `/name/${name}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
    );
  } catch (error) {
    console.error(`Error fetching country data for ${name}:`, error);
    console.log("Using fallback data instead");
    
    // Find the country in fallback data
    const fallbackCountry = fallbackData.find(
      country => country.countryName.toLowerCase() === name.toLowerCase()
    );
    
    if (fallbackCountry) {
      // Return a response-like object with the matching fallback country
      return {
        data: [{
          name: {
            common: fallbackCountry.countryName,
            official: fallbackCountry.countryName,
            nativeName: { eng: { common: fallbackCountry.countryName } }
          },
          population: typeof fallbackCountry.population === 'number' ? fallbackCountry.population : 0,
          region: "Unknown",
          subregion: "Unknown",
          capital: [fallbackCountry.capital],
          tld: ["N/A"],
          currencies: { USD: { name: "US Dollar" } },
          languages: { eng: "English" },
          borders: [],
          flags: {
            svg: "/images/placeholder-flag.svg",
            alt: `Flag of ${fallbackCountry.countryName}`
          }
        }],
        status: 200,
        statusText: "OK (Fallback Data)"
      };
    } else {
      // If no matching country found in fallback data, throw error
      throw new Error(`Country "${name}" not found in fallback data`);
    }
  }
};