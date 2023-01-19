import { NavLink } from 'react-router-dom';

function CountriesList(props) {

    const { countries } = props;

    return (
        <ul id="countries-list" className="list-group overflow-auto">
            { countries
            ? countries.map(country => <NavLink key={ country.alpha3Code } to={ `/${country.alpha3Code}` } className={ ( { isActive } ) => isActive ? "list-group-item active" : "list-group-item" }>{ country.alpha2Code } { country.name.common }</NavLink> )
            : ""}
        </ul>
    )
}

export default CountriesList;