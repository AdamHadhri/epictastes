import React, { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';

function Meal({ id }) {
    const [meal, setMeal] = useState(null);
    const [ins, setIns] = useState([]);
    const [ings, setIngs] = useState([]);
    const [nbings, setNbings] = useState([]);

    useEffect(() => {
        getMeal();
    }, [id]);

    useEffect(() => {
        if (meal) {
            getIngs();
            getNbIngs();
        }
    }, [meal]);

    function getIngs() {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            if (ingredient) {
                ingredients.push(ingredient);
            }
        }
        setIngs(ingredients);
    }

    function getNbIngs() {
        const measures = [];
        for (let i = 1; i <= 20; i++) {
            let measure = meal[`strMeasure${i}`];
            if (measure) {
                measures.push(measure);
            }
        }
        setNbings(measures);
    }

    async function getMeal() {
        const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        try {
            const res = await axios.get(URL);
            const fetchedMeal = res.data.meals[0];
            setMeal(fetchedMeal);
            console.log(fetchedMeal)
            setIns(fetchedMeal.strInstructions.split('\r\n').filter(function(element) {
                return isNaN(element);
            }));
        } catch (error) {
            console.error('Error fetching meal:', error);
        }
    }

    return (
        <div className='pl-5'>
            <p className='text-4xl font-bold mt-5 text-orange-500'>{meal ? meal.strMeal : 'Loading...'}</p>
            <p className='text-2xl ml-3 my-2 font-medium'>
                <b className='text-orange-700'>Category:</b> {meal ? meal.strCategory : '***'} , <b className='text-orange-700'>Area:</b> {meal ? meal.strArea : '***'}
            </p>
            <div className='flex flex-col'>
                <div className='flex lg:flex-row sm:flex-col justify-between my-5'>
                    <div>
                        <p className='text-2xl ml-4 mb-2 font-bold text-orange-400'>Ingredients</p>
                        <ul className="list-disc ml-10 text-xl">
                            {ings.map((ingredient, index) => (
                                <li key={index}>{nbings[index]} * {ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                    {meal && meal.strYoutube !== "" ? (
                            <iframe
                                style={{ borderRadius: '1rem' }}
                                width="685"
                                height="385"
                                src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}?rel=0`}
                                title={meal.strMeal}
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <img src="error.jpg" style={{height:"385px", borderRadius: '1rem' }} alt="no video" />
                        )}
                    <p className='text-2xl ml-3 my-2 font-semibold flex justify-center text-orange-700'>Youtube Tutorial</p></div>
                    <div>{meal && (
                        <img
                            src={meal.strMealThumb}
                            className='size-96 rounded-2xl mr-20'
                            alt={meal.strMeal}
                        />
                    )}<p className='text-2xl ml-3 my-2 font-semibold flex justify-center text-orange-700'>Meal Image</p></div>
                </div>
                <p className='text-2xl ml-4 mb-2 font-bold text-orange-400'>Instructions</p>
                <ul className="list-decimal px-10 text-xl mb-5">
                    {ins.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Meal;
