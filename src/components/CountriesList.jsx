import { NavLink } from 'react-router-dom';

function CountriesList(props) {

    const { countries } = props;

    return (
        <ul id="countries-list" className="list-group overflow-auto text-center">
            { countries
            ? countries.map(country => {
                return <NavLink key={ country.alpha3Code } to={ `/${country.alpha3Code}` } className={ ( { isActive } ) => isActive ? "list-group-item p-4 active" : "list-group-item p-4" }>
                            <img src={ `https://flagpedia.net/data/flags/icon/72x54/${ country.alpha2Code.toLowerCase() }.png` } alt={ `flag_${ country.alpha2Code }` } style={ { height: "30px" } } className={ 'mb-2' } /><br/>
                            { country.name.common }
                        </NavLink> 
            })
            : ""}
        </ul>
    )
}

export default CountriesList;