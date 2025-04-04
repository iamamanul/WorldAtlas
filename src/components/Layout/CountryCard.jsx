import { memo } from "react";
import { NavLink } from "react-router-dom";

export const CountryCard = memo(({ country }) => {
    const { flags, name, population, region, capital } = country;
    const capitalName = capital?.[0] ?? "N/A";
    const countryName = name.common;
    const displayName = countryName.length > 25 ? `${countryName.slice(0, 25)}...` : countryName;
    
    return (
        <li className="country-card" role="article">
            <div className="container-card">
                <div className="image-container">
                    <img 
                        src={flags.svg} 
                        alt={`Flag of ${countryName}`}
                        loading="lazy"
                        width="100%"
                        height="100%"
                    />
                </div>
                <div className="countryInfo">
                    <h3 className="card-title" title={countryName}>
                        {displayName}
                    </h3>
                    <p>
                        <span className="card-description">Population:</span>
                        <span>{population.toLocaleString()}</span>
                    </p>
                    <p>
                        <span className="card-description">Region:</span>
                        <span>{region}</span>
                    </p>
                    <p>
                        <span className="card-description">Capital:</span>
                        <span>{capitalName}</span>
                    </p>
                    <NavLink 
                        to={`/country/${countryName}`}
                        className="card-link"
                        aria-label={`Read more about ${countryName}`}
                    >
                        <button>Read More</button>
                    </NavLink>
                </div>
            </div>
        </li>
    );
});

