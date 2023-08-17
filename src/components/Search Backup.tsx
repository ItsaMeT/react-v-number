import "../css/Search.css";

interface digitFilterData {
  digit: number;
  text: String;
  background: String;
}

interface priceFilterData {
  floorPrice: number;
  ceilingPrice: number;
  text: String;
}

interface regionFilterData {
  regionCode: String;
  region: String;
  text: String;
}

interface FilterProps {
  digitfilterdata: digitFilterData[];
  priceFilterData: priceFilterData[];
  regionFilterData: regionFilterData[];
}

function Search(props: FilterProps) {
  const searchBar = (
    <div>
      <h1 className="search-title">Search a Car Plate &gt;</h1>
      <div className="input-group">
        <div className="input-group-prepend">
          <span id="search-icon" className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
        </div>
        <input
          type="text"
          id="searchfield"
          className="form-control"
          placeholder="Enter your preferred number. Eg: VAC1"
          aria-label="Search"
        />
        <button id="search-button" className="btn btn-primary" type="button">
          <p>Search</p>
        </button>
      </div>
    </div>
  );

  const digitFilter = (
    <div id="search-digit" className="row">
      {props.digitfilterdata.map((digitfilterdata, index) => (
        <div
          className="card col"
          style={{ backgroundImage: `url(${digitfilterdata.background})` }}
        >
          <div className="card-body">
            <h5 className="card-title">{digitfilterdata.text}</h5>
          </div>
        </div>
      ))}
    </div>
  );

  const priceFilter = (
    <div id="search-price" className="row">
      {props.priceFilterData.map((priceFilterData, index) => (
        <div className="col">
          <p>{priceFilterData.text}</p>
        </div>
      ))}
    </div>
  );

  const regionFilter = (
    <div id="search-region" className="row">
      <button className="col-1 arrow left" onClick={regionScrollLeft}>
        <i className="bi bi-chevron-left" />
      </button>
      <div id="region" className="col row">
        {props.regionFilterData.map((regionFilterData, index) => (
          <div className="col region">
            <p>{regionFilterData.text}</p>
          </div>
        ))}
      </div>
      <button className="col-1 arrow right" onClick={regionScrollRight}>
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  );

  return (
    <>
      <div className="container">
        <div id="search" className="box">
          {searchBar}
          {digitFilter}
          {priceFilter}
          {regionFilter}
        </div>
      </div>
    </>
  );
}

const regionFilterContainer = document.getElementById("region");

function regionScrollLeft() {
  regionFilterContainer?.scrollBy(-100, 0);
}

function regionScrollRight() {
  regionFilterContainer?.scrollBy(100, 0);
}

export default Search;
