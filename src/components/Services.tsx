import "../css/Services.css";

interface servicesData {
  serviceNumber: String;
  icon: string;
  text: String;
}

interface ServicesProps {
  servicesData: servicesData[];
}

function Services(props: ServicesProps) {
  const cards = (
    <div id="services-cards">
      <div className="title">
        <h1>OUR SERVICES</h1>
        <img
          src="./assets/ServicesTitleMain.svg"
          className="title-main shadow-filter"
        />
        <img src="./assets/ServicesTitleLeft.svg" className="title-left" />
        <img src="./assets/ServicesTitleRight.svg" className="title-right" />
      </div>
      <div className="card-list row">
        {props.servicesData.map((servicesData, index) => (
          <div className="card" key={index}>
            <div className="number-badge">
              <h2>{servicesData.serviceNumber}</h2>
            </div>
            <img src={servicesData.icon} alt="Image description"></img>
            <div className="card-body">
              <h5 className="card-title">{servicesData.text}</h5>
            </div>
          </div>
        ))}
      </div>

      {/* For SVG Image drop shadow */}
      <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <filter id="drop-shadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feOffset dx="0" dy="4" result="offsetblur" />
          <feFlood floodColor="#707070" result="color" />
          <feComposite in2="offsetblur" operator="in" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </svg>
    </div>
  );

  return (
    <>
      <div id="services">{cards}</div>
    </>
  );
}

export default Services;
