import React from 'react';
import './App.css';
import StarWarsProvider from './context/starWarsProvider';
import Table from './components/table';
import Filter from './components/filter';

function App() {
  return (
    <StarWarsProvider>
      <Filter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
