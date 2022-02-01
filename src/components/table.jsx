import React, { useContext } from 'react';

import StarWarsContext from '../context/starWarsContext';

const filtros = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

function Table() {
  const {
    data,
    filters: { filterNames, filterValues },
    clicked,
  } = useContext(StarWarsContext);
  const { name } = filterNames;
  const filtersValues = filterValues[filterValues.length - 1];
  const { column, comparison, value } = filtersValues;

  return (
    <table>
      <tbody>
        <tr>
          {filtros.map((header, index) => (
            <th key={ index }>
              {header}
            </th>))}
        </tr>
      </tbody>

      <tbody>
        {data.filter((planet) => planet.name.includes(name))
          .filter((planet) => {
            if (clicked && comparison === 'maior que') {
              return Number(planet[column]) > value;
            }
            if (clicked && comparison === 'menor que') {
              return Number(planet[column] < value)
              || planet[column] === 'unknown';
            }
            if (clicked && comparison === 'igual a') {
              return Number(planet[column] === value);
            }
            return data;
          })
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Table;
