import React, { useEffect, useState } from 'react';
import GradientCover from '../components/CatCard';
import axios from 'axios';
import { Link } from 'react-router-dom';

function IngAllPage() {
    const [elems, setElems] = useState([]);

    useEffect(() => {
        async function getIngredients() {
            const URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
            try {
                const res = await axios.get(URL);
                setElems(res.data.meals);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        }
        getIngredients();
    }, []);

    return (
        <div className='flex flex-col'>
            <div className="pl-32 py-5 font-semibold text-3xl flex flex-row text-orange-700">All Ingredients</div>
            <div className='flex flex-row flex-wrap gap-10 justify-center'>
                {elems.map((elem) => (
                    <Link key={elem.idIngredient} to={`/${elem.strIngredient}`}>
                        <GradientCover 
                            title={elem.strIngredient}
                            imgSrc={`https://www.themealdb.com/images/ingredients/${elem.strIngredient}.png`} 
                        />
                    </Link>
                ))} 
            </div>
        </div>
    );
}

export default IngAllPage;
