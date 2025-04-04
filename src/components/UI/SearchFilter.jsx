export const SearchFilter = ({
    search,
    setSearch,
    filter,
    setFilter,
    countries,
    setCountries,
  }) => {
    const handleInputChange = (event) => {
      event.preventDefault();
      setSearch(event.target.value);
    };
  
    const handleSelectChange = (event) => {
      event.preventDefault();
      setFilter(event.target.value);
    };
  
    const sortCountries = (value) => {
      const sortCountry = [...countries].sort((a, b) => {
        return value === "asc"
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      });
      setCountries(sortCountry);
    };
  
    return (
      <section className="section-searchFilter">
        <div className="search-container">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={handleInputChange}
              className="search-input"
            />
          </div>
  
          <div className="filter-container">
            <select
              className="filter-select"
              value={filter}
              onChange={handleSelectChange}
            >
              <option value="all">All Regions</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>
            
            <div className="sort-buttons">
              <button 
                className="sort-btn" 
                onClick={() => sortCountries("asc")}
                title="Sort A-Z"
              >
                A-Z
              </button>
              <button 
                className="sort-btn" 
                onClick={() => sortCountries("des")}
                title="Sort Z-A"
              >
                Z-A
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };