import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CountryDetails(props) {

    const { countryId } = useParams();
    const [ country, setCountry ] = useState(null);

    useEffect(() => {
        if ( countryId ) {
            axios.get(`https://ih-countries-api.herokuapp.com/countries/${ countryId }`)
                .then(response => setCountry(response.data));
        }
    }, [countryId]);

    return (
        <>
            { !countryId && <p>No country selected.</p>}
            { country && 
                <div class="container">
                    <div class="row p-3 border-bottom">
                        <div class="col-md-8"><h2>{ country.name.common }</h2></div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Capital</div>
                        <div class="col-md-6 ms-auto">{ country.capital[0] }</div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Area</div>
                        <div class="col-md-6 ms-auto">{ country.area }</div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Border</div>
                        <div class="col-md-6 ms-auto"><ul>{ country.borders.map(border => <li key={ border }>{ border }</li>)}</ul></div>
                    </div>
                </div>
            }
        </>
    )
}

export default CountryDetails;