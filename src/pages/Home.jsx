import React, { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import CategoriePage from './CategoriePage';
import countryCodes from '../countryCodes';
import AreaPage from './AreaPage';
import Default from './Default';
import IngPage from './IngPage';
import IngAllPage from './IngAllPage';
import Meal from '../components/Meal';
import Search from '../components/search';
import { Link } from 'react-router-dom';

export const CategoriesContext = createContext();

function Home() {
  const [categories, setCategories] = useState([]);
  const areas = countryCodes
  const [elems, setElems] = useState([]);
  const [ings, setIngs] = useState([]);
  const [allings, setAllings] = useState([]);
  const URL = "https://www.themealdb.com/api/json/v1/1/categories.php";
  const URL2 = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";

  useEffect(() => { 
    getCategories();
    getIngredients();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      getAllMeals();
    }
  }, [categories]);

  // useEffect(() => {
  //   if (ings.length > 0) {
  //     getAllIngs();
  //   }
  // }, [ings]);
  
  async function getCategories() {
    try {
      const res = await axios.get(URL);
      setCategories(res.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  async function getIngredients() {
    try {
      const res = await axios.get(URL2);
      setIngs(res.data.meals.slice(0, 24));
      setAllings(res.data.meals)
    } catch (error) {
      console.error('Error fetching ingredients:', error);
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

//   async function getAllIngs() {
//     const allIngs = [];

//     for (const ing of ings) {
//         const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing.strMeal}`;
//         try {
//             const res = await axios.get(URL);
//             allIngs.push(...res.data.meals);
//         } catch (error) {
//             console.error('Error fetching categories:', error);
//         }
//     }
//     console.log(allIngs)
//     setAllings(allIngs);
// }

  return (
    <div>
      <CategoriesContext.Provider value={{ categories, areas, ings }}>
        <BrowserRouter>
          <div className='flex items-center justify-between w-full h-28 bg-orange-500'>
            <Link to="/">
              <img src="logo.svg" className='px-5 h-16' alt="epic tastes" />
            </Link>
            <Search/>
            <button className='hover:bg-orange-700 rounded-xl mx-5'>
              <img src="heart.svg" className='mx-5 my-3 h-12' alt="wishlist" />
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
            <Route path='/Ingradients' element={<IngAllPage/>} />
          </Routes>
        </BrowserRouter>
      </CategoriesContext.Provider>
    </div>
  );
}

export default Home;
