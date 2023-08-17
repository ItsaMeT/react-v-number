import React, { useState } from "react";
import { Link } from "react-scroll";
import "../css/Content.css";

interface contentData {
  id: number;
  number: String;
  series: String;
  digit: number;
  price: number;
  new: boolean;
}

interface setFilterValues {
  numberFilter: string;
  digitFilter: number | undefined;
  priceFloorFilter: number;
  priceCeilingFilter: number;
  regionFilter: string | undefined;
}

interface ContentProps {
  contentData: contentData[];
  setFilterValues: setFilterValues;
}

const ContentPagination = (props: ContentProps) => {
  const itemPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  // Filter Here
  const dataAfterFilter = props.contentData.filter((val) => {
    if (
      props.setFilterValues.numberFilter == undefined &&
      props.setFilterValues.digitFilter == undefined &&
      props.setFilterValues.priceFloorFilter == undefined &&
      props.setFilterValues.priceCeilingFilter == undefined &&
      props.setFilterValues.regionFilter == undefined
    ) {
      return val;
    } else {
      if (
        (val.number
          .toUpperCase()
          .includes(props.setFilterValues.numberFilter.toUpperCase()) ||
          props.setFilterValues.numberFilter == undefined) &&
        (val.digit == props.setFilterValues.digitFilter ||
          props.setFilterValues.digitFilter == undefined) &&
        (val.series == props.setFilterValues.regionFilter ||
          props.setFilterValues.regionFilter == undefined) &&
        ((val.price >= props.setFilterValues.priceFloorFilter &&
          val.price <= props.setFilterValues.priceCeilingFilter) ||
          props.setFilterValues.priceFloorFilter == undefined ||
          props.setFilterValues.priceCeilingFilter == undefined)
      ) {
        return val;
      }
    }
  });

  const totalPages = Math.ceil(dataAfterFilter.length / itemPerPage);
  const startIndex = (currentPage - 1) * itemPerPage;
  const endIndex = startIndex + itemPerPage;
  const currentItems = dataAfterFilter.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageButtons = () => {
    const pageButtons = [];
    const leftArrowButton = (
      <>
        <Link
          className="col-1 arrow left"
          onClick={handlePreviousPage}
          to={"content"}
          smooth={true}
          duration={80}
        >
          <i className="bi bi-chevron-left" />
        </Link>
      </>
    );
    const rightArrowButton = (
      <Link
        className="col-1 arrow right"
        onClick={handleNextPage}
        to={"content"}
        smooth={true}
        duration={80}
      >
        <i className="bi bi-chevron-right" />
      </Link>
    );

    // For before current page
    if (currentPage > 1) {
      if (currentPage > 2) {
        for (let page = 1; page <= 2; page++) {
          pageButtons.push(
            <Link
              key={page}
              onClick={() => handlePageChange(page)}
              disabled={currentPage === page}
              to={"content"}
              smooth={true}
              duration={80}
            >
              {page}
            </Link>
          );
        }
      } else {
        pageButtons.push(
          <Link
            key={1}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            to={"content"}
            smooth={true}
            duration={80}
          >
            {1}
          </Link>
        );
      }
    }

    if (currentPage > 5) {
      pageButtons.push(<a>...</a>);
    }

    if (currentPage > 4) {
      for (let page = currentPage - 2; page < currentPage; page++) {
        pageButtons.push(
          <Link
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            to={"content"}
            smooth={true}
            duration={80}
          >
            {page}
          </Link>
        );
      }
    } else if (currentPage > 3) {
      pageButtons.push(
        <Link
          key={currentPage - 1}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === currentPage - 1}
          to={"content"}
          smooth={true}
          duration={80}
        >
          {currentPage - 1}
        </Link>
      );
    }

    // For after current page
    for (let page = currentPage; page <= totalPages; page++) {
      if (
        page == currentPage + 3 &&
        page != totalPages &&
        page != totalPages - 1
      ) {
        pageButtons.push(<a>...</a>);
      } else if (page <= currentPage + 2 || totalPages - page < 2) {
        pageButtons.push(
          <Link
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            to={"content"}
            smooth={true}
            duration={80}
          >
            {page}
          </Link>
        );
      }
    }

    const buttons = (
      <div>
        {leftArrowButton}
        {pageButtons}
        {rightArrowButton}
      </div>
    );

    return buttons;
  };

  const cards = (
    <div className="row">
      {currentItems.map((dataAfterFilter, index) => {
        return (
          <div className="col-3">
            <div className="card">
              <div className="carplate-number d-flex align-items-center justify-content-center ">
                <h1>{dataAfterFilter.number}</h1>
              </div>
              {dataAfterFilter.new ? (
                <div className="new-tag">
                  <p>NEW</p>
                </div>
              ) : null}
              <div className="card-body">
                <p>{dataAfterFilter.digit} DIGIT NUMBER SERIES</p>
                <h3 className="card-text">
                  RM {dataAfterFilter.price.toLocaleString()}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div id="content" className="container">
      {cards}
      <div className="page-button">{getPageButtons()}</div>
    </div>
  );
};

export default ContentPagination;
