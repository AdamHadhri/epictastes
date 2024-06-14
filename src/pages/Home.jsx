import React, { useEffect, useState, createContext } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CategoriePage from './CategoriePage';
import countryCodes from '../countryCodes';
import AreaPage from './AreaPage';
import Default from './Default';
import IngPage from './IngPage';
import IngAllPage from './IngAllPage';
import Meal from '../components/Meal';
import SearchPage from './SearchPage';
import Wishlist from './Wishlist';

export const CategoriesContext = createContext();

function Home() {
  const [categories, setCategories] = useState([]);
  const areas = countryCodes;
  const [elems, setElems] = useState([]);
  const [ings, setIngs] = useState([]);
  const [allings, setAllings] = useState([]);
  const [search, setSearch] = useState();

  const navigate = useNavigate();

  const CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const INGREDIENTS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesRes, ingredientsRes] = await Promise.all([
          axios.get(CATEGORIES_URL),
          axios.get(INGREDIENTS_URL),
        ]);

        setCategories(categoriesRes.data.categories);
        setIngs(ingredientsRes.data.meals.slice(0, 24));
        setAllings(ingredientsRes.data.meals);

        const allMeals = [];
        for (const category of categoriesRes.data.categories) {
          const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`;
          const res = await axios.get(URL);
          allMeals.push(...res.data.meals);
        }
        setElems(allMeals);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputValue = event.target.value;
      setSearch(inputValue);
      navigate('/SearchResult');
    }
  };

  return (
    <div>
      <CategoriesContext.Provider value={{ categories, areas, ings, search }}>
        <div className='flex items-center px-3 justify-between w-full lg:h-28 sm:h-20 h-20 bg-orange-500'>
        <Link to="/" className='flex flex-row items-center justify-between gap-3 ml-5'>
          <img src={`${process.env.PUBLIC_URL}/logo1.svg`} className='h-16' alt="epic tastes" />
          <img src={`${process.env.PUBLIC_URL}/logo2.svg`} className='hidden sm:hidden md:flex lg:flex h-6' alt="epic tastes" />
        </Link>
          <form className="form w-[40%] relative" onSubmit={(e) => e.preventDefault()}>
            <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1">
              <img src={`${process.env.PUBLIC_URL}/search.svg`} alt='search' />
            </button>
            <input
              onKeyDown={handleKeyDown}
              className="input rounded-full lg:h-14 sm:h-10 h-10 px-8 py-3 w-full flex border-2 border-transparent focus:outline-none focus:border-orange placeholder-gray-400 transition-all duration-300 shadow-md"
              placeholder="Search..."
              required
              type="text"
            />
          </form>
          <Link to="./Wishlist" className='hover:bg-orange-700 rounded-xl px-4 py-4 gap-3 flex justify-center items-center'>
            <img src={`${process.env.PUBLIC_URL}/saved.svg`} className='h-7' alt="wishlist" />
            <img src={`${process.env.PUBLIC_URL}/heart2.svg`} className='hidden sm:hidden md:flex lg:flex h-6' alt="wishlist" />
          </Link>
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
          <Route path='/Wishlist' element={<Wishlist />} />
        </Routes>
      </CategoriesContext.Provider>
    </div>
  );
}

export default Home;
