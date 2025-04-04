import countryFacts from "../api/countryData.json"
//ye arrays ke form me agyahai ab , map method se loop chla denge ek ek krke ajayega
//map me key pass krna hota hai yad rkhna, woh id hoga always uniqu aur different hoga


export const About = () => {
    return (
      <section className="section-about container">
        <h2 className="container-title">
          Here are the Interesting Facts
          <br />
          we’re proud of
        </h2>
  
        <div className="gradient-cards">
          {countryFacts.map((country) => {
            const { id, countryName, capital, population, interestingFact } =
              country;
            return (
              <div className="card" key={id}>
                <div className="container-card bg-blue-box">
                  <p className="card-title">{countryName}</p>
                  <p>
                    <span className="card-description">Capital:</span>
                    {capital}
                  </p>
                  <p>
                    <span className="card-description">Population:</span>
                    {population}
                  </p>
                  <p>
                    <span className="card-description">Interesting Fact:</span>
                    {interestingFact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };