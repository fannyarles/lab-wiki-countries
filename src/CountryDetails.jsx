import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function CountryDetails(props) {

    const { countryId } = useParams();
    const { countries } = props;
    const [ country, setCountry ] = useState(null);

    useEffect(() => {
        if ( countryId ) {

            axios.get(`https://ih-countries-api.herokuapp.com/countries/${ countryId }`)
                .then(response =>  { 
                    let countryBordersData = [];
                    if (response.data.borders.length) {
                        const borders = [];
                        response.data.borders.forEach(el => {
                            const borderInfos = countries.find(i => i.alpha3Code === el)
                            borders.push({ name: borderInfos.name.common, id: borderInfos.alpha3Code })
                        })
                        countryBordersData = response.data;
                        countryBordersData.borders = borders;
                    } else { countryBordersData = response.data; }
                    setCountry(countryBordersData)
                });

        }
    }, [countryId]);

    return (
        <>
            { !countryId && <p>No country selected.</p>}
            { country && 
                <div class="container">
                    <div class="row p-3 border-bottom">
                        <div class="col-md-8">
                            <img src={ `https://flagpedia.net/data/flags/icon/72x54/${ country.alpha2Code.toLowerCase() }.png` } alt={ `flag_${ country.alpha2Code }` } style={ { height: "50px" } } className={ 'mb-4' } />
                            <h2>{ country.name.common }</h2>
                        </div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Capital</div>
                        <div class="col-md-6 ms-auto">{ country.capital[0] }</div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Area</div>
                        <div class="col-md-6 ms-auto">{ country.area } km²</div>
                    </div>
                    <div class="row p-3 border-bottom">
                        <div class="col-md-2 fw-bold">Borders</div>
                        <div class="col-md-6 ms-auto"><ul>{ country.borders.map(border => <li key={ border.id }><Link to={ `/${ border.id }`}>{ border.name }</Link></li>)}</ul></div>
                    </div>
                </div>
            }
        </>
    )
}

export default CountryDetails;