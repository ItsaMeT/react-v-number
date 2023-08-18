import "./App.css";
import React, { useEffect, useState } from "react";

import WhatsappIcon from "./assets/WhatsappIcon.svg";

import Header from "./components/Header";
import Search from "./components/Search";
import Content from "./components/Content";
import Services from "./components/Services";
import Contact from "./components/Contact";
import headerMenuData from "./data/HeaderMenuData.json";
import digitFilterData from "./data/DigitFilterData.json";
import priceFilterData from "./data/PriceFilterData.json";
import regionFilterData from "./data/RegionFilterData.json";
import contentData from "./data/CarplateData.json";
import servicesData from "./data/ServicesData.json";
import contactData from "./data/ContactData.json";

const App: React.FC = () => {
  const [opacity, setOpacity] = useState(0);
  const [returnedFilter, setReturnedFilter] = useState<any>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const calculatedOpacity = scrolled / (0.8 * window.innerHeight);
      setOpacity(calculatedOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFilterReturn = (value: any) => {
    setReturnedFilter(value);
  };

  return (
    <div className="app">
      <Header navItems={headerMenuData} />
      <div
        className="background-overlay"
        style={{ backgroundColor: `rgba(249, 250, 251, ${opacity})` }}
      ></div>
      <Search
        digitfilterdata={digitFilterData}
        priceFilterData={priceFilterData}
        regionFilterData={regionFilterData}
        contentData={contentData}
        onReturn={handleFilterReturn}
      />
      <Content contentData={contentData} setFilterValues={returnedFilter} />
      <Services servicesData={servicesData} />
      <Contact contactData={contactData} />
      <img id="whatsapp_icon" src={WhatsappIcon} />
    </div>
  );
};

export default App;
