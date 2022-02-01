import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './starWarsContext';
import fetchPlanets from '../services/fetchAPI';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    filterNames: {
      name: '',
    },
    // ideia de func do meu colega Lucas!
    filterValues: [
      {
        column: '',
        comparison: '',
        value: '0',
      },
    ],
  });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    async function getPlanets() {
      const planets = await fetchPlanets();
      setData(planets);
    }
    getPlanets();
  }, []);

  function handleChange({ target }) {
    const { value } = target;
    setFilters({ ...filters, filterNames: { name: value } });
  }

  function setColumn({ target }) {
    const { name } = target;
    const { filterValues } = filters;
    const numericFilter = filterValues[filterValues.length - 1];
    const { comparison, value } = numericFilter;
    setFilters({ ...filters,
      filterValues: [{
        [name]: target.value,
        comparison,
        value,
      }] });
    setClicked(false);
  }

  function setComparison({ target }) {
    const { name } = target;
    const { filterValues } = filters;
    const numericFilter = filterValues[filterValues.length - 1];
    const { column, value } = numericFilter;
    setFilters({ ...filters,
      filterValues: [{
        column,
        [name]: target.value,
        value,
      }] });
    setClicked(false);
  }

  function setValue({ target }) {
    const { name } = target;
    const { filterValues } = filters;
    const numericFilter = filterValues[filterValues.length - 1];
    const { column, comparison } = numericFilter;
    setFilters({ ...filters,
      filterValues: [{
        column,
        comparison,
        [name]: target.value,
      }] });
    setClicked(false);
  }

  function handleButton() {
    setClicked(true);
  }

  const contextValue = {
    data,
    filters,
    clicked,
    handleChange,
    setColumn,
    setComparison,
    setValue,
    handleButton,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      { children }
    </StarWarsContext.Provider>
  );
}

// descobri o node pelas mentorias (qualquer coisa que pode ser renderizada)
StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;
