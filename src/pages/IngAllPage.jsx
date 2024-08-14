import React, { useEffect, useState } from 'react';
import GradientCover from '../components/CatCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function IngAllPage() {
    const [elems, setElems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getIngredients() {
            const URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
            try {
                const res = await axios.get(URL);
                setElems(res.data.meals);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
                setLoading(false);
            }
        }
        getIngredients();
    }, []);

    return (
        <div className='flex flex-col items-center'>
            <div className="lg:py-10 md:py-8 sm:py-7 py-7 font-semibold text-2xl md:text-3xl lg:text-4xl text-orange-700">All Ingredients</div>
            <div className='flex flex-wrap gap-10 justify-center pb-5'>
                {loading ? (
                    <CircularProgress />
                ) : (
                    elems.map((elem) => (
                        <Link key={elem.idIngredient} to={`/${elem.strIngredient}`}>
                            <GradientCover 
                                title={elem.strIngredient}
                                imgSrc={`https://www.themealdb.com/images/ingredients/${elem.strIngredient}.png`} 
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default IngAllPage;
