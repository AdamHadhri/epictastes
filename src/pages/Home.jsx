import React, { useEffect, useState, createContext } from 'react';
import { HashRouter, Router, Routes, Route, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import CategoriePage from './CategoriePage';
import countryCodes from '../countryCodes';
import AreaPage from './AreaPage';
import Default from './Default';
import IngPage from './IngPage';
import IngAllPage from './IngAllPage';
import Meal from '../components/Meal';
import { Link } from 'react-router-dom';
import SearchPage from './SearchPage';

export const CategoriesContext = createContext();

function Home() {
  const [categories, setCategories] = useState([]);
  const areas = countryCodes;
  const [elems, setElems] = useState([]);
  const [ings, setIngs] = useState([]);
  const [allings, setAllings] = useState([]);
  const [search, setSearch] = useState()

  const navigate = useNavigate();
  // const history = useHistory()

  const URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const URL2 = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  useEffect(() => {
    async function getIngredients() {
      try {
        const res = await axios.get(URL2);
        setIngs(res.data.meals.slice(0, 24));
        setAllings(res.data.meals);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    }

    async function getCategories() {
      try {
        const res = await axios.get(URL);
        setCategories(res.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    async function getAllMeals() {
      const allMeals = []; // Initialize an array to store all meals

      for (const category of categories) {
        const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
        try {
          const res = await axios.get(URL);
          allMeals.push(...res.data.meals); // Append new meals to the allMeals array
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }
      setElems(allMeals);
    }

    getCategories();
    getIngredients();
    getAllMeals();

  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = event.target.value;
      setSearch(inputValue)
      navigate('/SearchResult');
      // history.push('/SearchResult');
      // Optionally, clear the input after logging
      // event.target.value = '';
    }
  };

  return (
    <div>
      <CategoriesContext.Provider value={{ categories, areas, ings, search }}>
        {/* <HashRouter> */}
          <div className='flex items-center justify-between w-full h-28 bg-orange-500'>
            <Link to="/">
              <img src={`${process.env.PUBLIC_URL}/logo.svg`} className='px-5 h-16' alt="epic tastes" />
            </Link>
            <form className="form relative" onSubmit={(e) => e.preventDefault()}>
              <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
                <img src={`${process.env.PUBLIC_URL}/search.svg`} />
              </button>
              <input
                onKeyDown={handleKeyDown}
                className="input rounded-full px-8 py-3 lg:w-[500px]  md:w-[300px]  lg:flex md:flex xs:hidden  sm:hidden border-2 border-transparent focus:outline-none focus:border-orange placeholder-gray-400 transition-all duration-300 shadow-md"
                placeholder="Search..."
                required=""
                type="text"
              />
            </form>
            {/* <Search className=' w-[500px]' /> */}
            <button className='hover:bg-orange-700 rounded-xl mx-5'>
              <img src={`${process.env.PUBLIC_URL}/heart.svg`} className='mx-5 my-3 h-12' alt="wishlist" />
            </button>
          </div>
          <Routes>
            <Route path="/" element={<Default />} />
            {categories.map((category) => (
              <Route
                key={category.idCategory}
                path={`/${category.strCategory}`}
                element={<CategoriePage category={category.strCategory} />}
              />
            ))}
            {areas.map((area) => (
              <Route
                key={area.id}
                path={`/${area.strArea}`}
                element={<AreaPage area={area.strArea} />}
              />
            ))}
            {ings.map((ing) => (
              <Route
                key={ing.idIngredient}
                path={`/${ing.strIngredient}`}
                element={<IngPage ing={ing.strIngredient} />}
              />
            ))}
            {elems.map((elem) => (
              <Route
                key={elem.idMeal}
                path={`/${elem.idMeal}`}
                element={<Meal id={elem.idMeal} />}
              />
            ))}
            {allings.map((alling) => (
              <Route
                key={alling.idIngredient}
                path={`/${alling.strIngredient}`}
                element={<Meal id={alling.strIngredient} />}
              />
            ))}
            <Route path='/Ingradients' element={<IngAllPage />} />
            <Route path='/SearchResult' element={<SearchPage />} />
          </Routes>
        {/* </HashRouter> */}
      </CategoriesContext.Provider>
    </div>
  );
}

export default Home;