import React from 'react';
import './index.scss';

import { Collection } from './Collection';

const CATEGORYS = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {

  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [categoryActive, setCategoryActive] = React.useState(0);
  const [page, setPage] = React.useState(1);

  const category = categoryActive ? `category=${categoryActive}`: 0;

  React.useEffect(()=>{
    setIsLoading(true);
    fetch(`https://64a3a005c3b509573b565443.mockapi.io/api/collection_task?page=${page}&limit=3&${category}`)
      .then(res => res.json())
      .then(json=> {setCollections(json);})
      .catch(err=>{console.warn(err);alert("Error connection")})
      .finally(()=>setIsLoading(false));
      console.log(`https://64a3a005c3b509573b565443.mockapi.io/api/collection_task?page=${page}&limit=3&category=${category}`);},
      [categoryActive,page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            CATEGORYS.map((obj,i) => <li
              onClick={()=>setCategoryActive(i)}
              className = {categoryActive=== i ? 'active' : ''} 
              key={obj.name}>
                 {obj.name} </li>)
          }
        </ul>
        <input 
          value = {searchValue}
          onChange={e=>setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? <h2>Loading...</h2> :
        collections.filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase())).map((obj,i) => (
          <Collection
            key = {i}
            name={obj.name}
            images={obj.photos}
          />
        ))
        }
      </div>
      <ul className="pagination">
        {
        [...Array(3)].map((_, i) =>(
          <li
          key={i}
          onClick={() => setPage(i+1)}
          className={page ===i+1? 'active' : ''}
          >{i+1}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
