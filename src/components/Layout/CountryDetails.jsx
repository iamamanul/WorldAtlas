import { useEffect, useState, useTransition } from "react";
import { NavLink, useParams } from "react-router-dom"
import { getCountryIndData } from "../../api/postApi";
import { Loader } from "../UI/Loader";

export const CountryDetails = () => {
    //we will use a parameter hook to get parameters
    const params = useParams();


    const [isPending, startTransition] = useTransition();
    //is pending se loader gol gol ghumega usme help krega aur startTransition ke andr hmara code hoga sara
    const [country, setCountry] = useState(null); // Store API data
    const [error, setError] = useState(null);

    useEffect(() => {
        startTransition(async () => {
            try {
                const res = await getCountryIndData(params.id);
                if (res.status === 200) {
                    setCountry(res.data[0]);
                    setError(null);
                }
            } catch (error) {
                console.error("Error fetching country details:", error);
                setError("Failed to load country details. Please try again later.");
                setCountry(null);
            }
        });
    }, [params.id]);

    if (isPending) return <Loader />;

    if (error) {
        return (
            <section className="card country-details-card container">
                <div className="container-card bg-white-box">
                    <div className="error-container">
                        <h2>Error</h2>
                        <p>{error}</p>
                        <NavLink to="/country" className="backBtn">
                            <button className="retry-btn">Go Back</button>
                        </NavLink>
                    </div>
                </div>
            </section>
        );
    }

    if (!country) {
        return (
            <section className="card country-details-card container">
                <div className="container-card bg-white-box">
                    <div className="error-container">
                        <h2>Country Not Found</h2>
                        <p>The requested country could not be found.</p>
                        <NavLink to="/country" className="backBtn">
                            <button className="retry-btn">Go Back</button>
                        </NavLink>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="card country-details-card container">
            <div className="container-card bg-white-box">
                <div className="country-image grid grid-two-cols">
                    <img
                        src={country.flags.svg}
                        alt={country.flags.alt || `Flag of ${country.name.common}`}
                        className="flag"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/placeholder-flag.svg";
                        }}
                    />
                    <div className="country-content">
                        <p className="card-title">{country.name.official}</p>

                        <div className="infoContainer">
                            {country.name.nativeName && Object.keys(country.name.nativeName).length > 0 && (
                                <p>
                                    <span className="card-description">Native Names:</span>
                                    {Object.keys(country.name.nativeName)
                                        .map((key) => country.name.nativeName[key].common)
                                        .join(", ")}
                                </p>
                            )}
                            <p>
                                <span className="card-description">Population:</span>
                                {country.population.toLocaleString()}
                            </p>
                            <p>
                                <span className="card-description">Region:</span>
                                {country.region || "Unknown"}
                            </p>
                            {country.subregion && (
                                <p>
                                    <span className="card-description">Sub Region:</span>
                                    {country.subregion}
                                </p>
                            )}
                            {country.capital && country.capital.length > 0 && (
                                <p>
                                    <span className="card-description">Capital:</span>
                                    {country.capital.join(", ")}
                                </p>
                            )}
                            {country.tld && country.tld.length > 0 && (
                                <p>
                                    <span className="card-description">Top Level Domain:</span>
                                    {country.tld.join(", ")}
                                </p>
                            )}
                            {country.currencies && Object.keys(country.currencies).length > 0 && (
                                <p>
                                    <span className="card-description">Currencies:</span>
                                    {Object.keys(country.currencies)
                                        .map((curElem) => country.currencies[curElem].name)
                                        .join(", ")}
                                </p>
                            )}
                            {country.languages && Object.keys(country.languages).length > 0 && (
                                <p>
                                    <span className="card-description">Languages:</span>
                                    {Object.keys(country.languages)
                                        .map((key) => country.languages[key])
                                        .join(", ")}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="country-card-backBtn">
                    <NavLink to="/country" className="backBtn">
                        <button>Go Back</button>
                    </NavLink>
                </div>
            </div>
        </section>
    );
}


