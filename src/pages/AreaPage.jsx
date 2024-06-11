import React, { useEffect, useState } from 'react';
import GradientCover from '../components/CatCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AreaPage({ area }) {
    const [elems, setElems] = useState([]);
    useEffect(() => {
        async function getElems() {
            const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
            try {
                const res = await axios.get(URL);
                setElems(res.data.meals);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        getElems();
    }, [area]);



    return (
        <div>
            <div className=" pl-24 pt-10 font-semibold text-4xl flex flex-row text-orange-700">{area} Meals:</div>
            <div className='flex flex-row flex-wrap gap-10 my-10 justify-center'>
                {elems.map((elem) => (
                    <Link key={elem.idMeal} to={`/${elem.idMeal}`}>
                        <GradientCover
                        key={elem.idMeal} 
                        title={elem.strMeal} 
                        imgSrc={elem.strMealThumb} />
                    </Link>
                ))}
            </div>
        </div>   
    );
}

export default AreaPage;
