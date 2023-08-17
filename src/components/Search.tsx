import "../css/Search.css";
import "../css/Filter.css";
import React, { useState } from "react";

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
  regionCode: string;
  region: string;
  text: string;
}

interface contentData {
  id: number;
  number: String;
  series: String;
  digit: number;
  price: number;
  new: boolean;
}

interface returnFilterValues {
  numberFilter: string;
  digitFilter: number | undefined;
  priceFloorFilter: number | undefined;
  priceCeilingFilter: number | undefined;
  regionFilter: string | undefined;
}

interface FilterProps {
  digitfilterdata: digitFilterData[];
  priceFilterData: priceFilterData[];
  regionFilterData: regionFilterData[];
  contentData: contentData[];
  onReturn: (value: returnFilterValues) => void;
}

function Search(props: FilterProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const [clickedDigitButton, setClickedDigitButton] = useState<any | null>(
    null
  );
  const [selectedDigit, setSelectedDigit] = useState<number | undefined>();

  const [clickedPriceButton, setClickedPriceButton] = useState<any | null>(
    null
  );
  const [selectedFloorPrice, setSelectedFloorPrice] = useState<
    number | undefined
  >();
  const [selectedCeilingPrice, setSelectedCeilingPrice] = useState<
    number | undefined
  >();

  const [clickedRegionButton, setClickedRegionButton] = useState<any | null>(
    null
  );
  const [selectedRegion, setSelectedRegion] = useState<string | undefined>();

  const regionFilterContainer = document.getElementById("region");

  function regionScrollLeft() {
    regionFilterContainer?.scrollBy(-100, 0);
  }

  function regionScrollRight() {
    regionFilterContainer?.scrollBy(100, 0);
  }

  const handleSearchButtonClick = () => {
    let searchValue = document.getElementById(
      "searchfield"
    ) as HTMLInputElement | null;
    if (searchValue != null) {
      setSearchTerm(searchValue.value);
    }
    const filterValues: returnFilterValues = {
      numberFilter: searchTerm,
      digitFilter: selectedDigit,
      priceFloorFilter: selectedFloorPrice,
      priceCeilingFilter: selectedCeilingPrice,
      regionFilter: selectedRegion,
    };
    props.onReturn(filterValues);
  };

  const handleResetDigitClick = () => {
    setSelectedDigit(undefined);
    setClickedDigitButton(undefined);
  };

  const handleResetPriceClick = () => {
    setSelectedFloorPrice(undefined);
    setSelectedCeilingPrice(undefined);
    setClickedPriceButton(undefined);
  };

  const handleResetRegionClick = () => {
    setSelectedRegion(undefined);
    setClickedRegionButton(undefined);
  };

  const handleResetButtonClick = () => {
    handleResetDigitClick();
    handleResetPriceClick();
    handleResetRegionClick();
    setSearchTerm("");

    const resetFilterValues: returnFilterValues = {
      numberFilter: "",
      digitFilter: undefined,
      priceFloorFilter: undefined,
      priceCeilingFilter: undefined,
      regionFilter: undefined,
    };
    props.onReturn(resetFilterValues);
  };

  const handleDigitClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let digitValue = parseInt(event.currentTarget.value, 10);
    setSelectedDigit(digitValue);
    setClickedDigitButton(digitValue);
  };

  const handlePriceClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let priceValue = JSON.parse(event.currentTarget.value);
    let priceFloorValue = parseInt(priceValue[0], 10);
    let priceCeilingValue = parseInt(priceValue[1], 10);
    setSelectedFloorPrice(priceFloorValue);
    setSelectedCeilingPrice(priceCeilingValue);
    setClickedPriceButton(priceCeilingValue);
  };

  const handleRegionClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    let regionValue = event.currentTarget.value;
    setSelectedRegion(regionValue);
    setClickedRegionButton(regionValue);
  };

  const handleSearchInputChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

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
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Enter your preferred number. Eg: VAC1"
          aria-label="Search"
        />
        <button
          id="search-button"
          className="btn btn-primary"
          type="button"
          onClick={handleSearchButtonClick}
        >
          <p>Search</p>
        </button>
      </div>
    </div>
  );

  const digitFilter = (
    <div id="search-digit" className="row">
      {props.digitfilterdata.map((digitfilterdata, index) => (
        <div
          key={index}
          className="card col"
          style={{ backgroundImage: `url(${digitfilterdata.background})` }}
        >
          <button
            className="card-body digit-filter"
            value={digitfilterdata.digit}
            onClick={handleDigitClick}
            disabled={clickedDigitButton === digitfilterdata.digit}
          >
            <h5 className="card-title">{digitfilterdata.text}</h5>
          </button>
        </div>
      ))}
    </div>
  );

  const priceFilter = (
    <div id="search-price" className="row">
      {props.priceFilterData.map((priceFilterData, index) => (
        <div key={index} className="col">
          <button
            className="card-body price-filter"
            value={JSON.stringify([
              priceFilterData.floorPrice,
              priceFilterData.ceilingPrice,
            ])}
            onClick={handlePriceClick}
            disabled={clickedPriceButton === priceFilterData.ceilingPrice}
          >
            <p>{priceFilterData.text}</p>
          </button>
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
          <div key={index} className="col region">
            <button
              className="card-body region-filter"
              value={regionFilterData.regionCode}
              onClick={handleRegionClick}
              disabled={clickedRegionButton === regionFilterData.regionCode}
            >
              <p>{regionFilterData.text}</p>
            </button>
          </div>
        ))}
      </div>
      <button className="col-1 arrow right" onClick={regionScrollRight}>
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  );

  const filterCriterias = (
    <div id="filter_by" className="container">
      <div className="row">
        <button
          id="reset_filter"
          className="btn d-flex align-items-center justify-content-center col-1"
          onClick={handleResetButtonClick}
        >
          <i className="bi bi-arrow-counterclockwise"></i>
          <a>Reset</a>
        </button>
        {/* Filter Criteria */}
        {selectedDigit != undefined ? (
          <button
            className="btn d-flex align-items-center justify-content-center col-1 filter-by-criteria"
            onClick={handleResetDigitClick}
          >
            <a>{selectedDigit} Digit Number</a>
            <i className="bi bi-x"></i>
          </button>
        ) : null}

        {selectedCeilingPrice != undefined ? (
          <button
            className="btn d-flex align-items-center justify-content-center col-1 filter-by-criteria"
            onClick={handleResetPriceClick}
          >
            {selectedFloorPrice ? (
              <>
                <a>
                  RM {(selectedFloorPrice - 1)?.toLocaleString()} - RM{" "}
                  {selectedCeilingPrice?.toLocaleString()}
                </a>
                <i className="bi bi-x"></i>
              </>
            ) : (
              <>
                <a>Under RM {selectedCeilingPrice?.toLocaleString()}</a>
                <i className="bi bi-x"></i>
              </>
            )}
          </button>
        ) : null}

        {selectedRegion != undefined ? (
          <button
            className="btn d-flex align-items-center justify-content-center col-1 filter-by-criteria"
            onClick={handleResetRegionClick}
          >
            <a>{selectedRegion}</a>
            <i className="bi bi-x"></i>
          </button>
        ) : null}
      </div>
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
      {filterCriterias}
    </>
  );
}
export default Search;
