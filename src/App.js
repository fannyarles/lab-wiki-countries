// src/App.js
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CountriesList from "./components/CountriesList";
import Navbar from "./components/Navbar";
import CountryDetails from "./CountryDetails";

function App() {
  
    const [ countries, setCountries ] = useState(null);

    useEffect(() => {
        axios.get('https://ih-countries-api.herokuapp.com/countries')
            .then(response => setCountries(response.data));
        // const countriesList = [];
        // countriesData.forEach(country => countriesList.push({ name: country.name.official, id: country.alpha3Code }));
        // setCountries(countriesList);
    }, []);

  return <div className="App">
    <Navbar />
    <div className="container text-start">
      <div className="row align-items-start gx-5">

        { !countries 
        ?   <div className="col">Loading...</div>
        :   <>
              <div className="col-4 overflow-y-auto p-0" style={ { height: "80vh" } }>
                <CountriesList countries={ countries } />
              </div>
              <div className="col-8 ps-5">
                <Routes>
                  <Route path='/' element={<CountryDetails />} />
                  <Route path='/:countryId' element={<CountryDetails countries={ countries } />} />
                </Routes>
              </div>
            </>
        }
      </div>
    </div>
  </div>;
}
export default App;