import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/starWarsContext';

function Filter() {
  const comparationsFilter = [
    'maior que',
    'igual a',
    'menor que',
  ];

  const statisticsFilter = [
    'diameter',
    'population',
    'orbital_period',
    'surface_water',
    'rotation_period',
  ];

  const {
    setColumn,
    handleChange,
    setValue,
    handleButton,
    setComparison,
    clicked,
    filters: { filterValues },
  } = useContext(StarWarsContext);
  const [options, setOptions] = useState([...statisticsFilter]);
  const { column } = filterValues[0];
  // console.log(filterValues);
  // console.log(options);

  // retira a opção selecionada das colunas
  useEffect(() => {
    const contagem = statisticsFilter.indexOf(column);
    if (clicked) {
      // O método splice() altera o conteúdo de uma lista, adicionando novos elementos enquanto remove elementos antigos.
      // remove 1 elemento a partir do incide (contagem)
      statisticsFilter.splice(contagem, 1);
      setOptions(statisticsFilter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [column, clicked]);

  return (
    <>
      <label htmlFor="search-by-name">
        <input
          id="search-by-name"
          type="text"
          placeholder="Digite o nome de um Planeta"
          onChange={ handleChange }
          data-testid="name-filter"
        />
      </label>

      <label htmlFor="column-filter">
        <select
          id="column-filter"
          name="column"
          onChange={ setColumn }
          data-testid="column-filter"
        >
          {options.map((option) => (
            <option key={ option } value={ option }>{ option }</option>
          ))}
        </select>
      </label>

      <label htmlFor="value-filter">
        <input
          id="value-filter"
          name="value"
          type="number"
          placeholder="Insira um número"
          onChange={ setValue }
          data-testid="value-filter"
        />
      </label>

      <label htmlFor="comparison-filter">
        <select
          id="comparison-filter"
          name="comparison"
          onChange={ setComparison }
          data-testid="comparison-filter"
        >
          {comparationsFilter.map((option) => (
            <option key={ option } value={ option } name={ option }>{ option }</option>
          ))}
        </select>
      </label>
      <button
        type="button"
        onClick={ handleButton }
        data-testid="button-filter"
      >
        Filtrar por planetas
      </button>
    </>
  );
}

export default Filter;
