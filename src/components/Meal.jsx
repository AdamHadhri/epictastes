import React, { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';
import IngImg from './IngImg';

function Meal({ id }) {
    const [meal, setMeal] = useState(null);
    const [ins, setIns] = useState([]);
    const [ings, setIngs] = useState([]);
    const [nbings, setNbings] = useState([]);

    useEffect(() => {
        async function getMeal() {
            const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
            try {
                const res = await axios.get(URL);
                const fetchedMeal = res.data.meals[0];
                setMeal(fetchedMeal);
                setIns(fetchedMeal.strInstructions.split('\r\n').filter(function (element) {
                    return isNaN(element);
                }));
            } catch (error) {
                console.error('Error fetching meal:', error);
            }
        }
        getMeal();
    }, [id]);

    useEffect(() => {
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
        if (meal) {
            getIngs();
            getNbIngs();
        }
    }, [meal]);

    return (
        <div className='flex flex-col justify-center gap-7 py-3'>
            <div>
                <p className='flex justify-center text-4xl font-bold mt-5 text-orange-500'>{meal ? meal.strMeal : 'Loading...'}</p>
                <p className='flex justify-center text-2xl ml-3 my-2 font-normal gap-3'>
                    <p className=' font-semibold text-orange-700'>Category: </p> {meal ? meal.strCategory : '***'}
                    <p className=' font-semibold text-orange-700'> Area: </p> {meal ? meal.strArea : '***'}
                </p>
            </div>
            <div className='flex flex-col items-center'>
                {meal && (<img
                    src={meal.strMealThumb}
                    className='flex justify-center object-cover w-[500px] h-[300px] rounded-2xl'
                    alt={meal.strMeal}
                />)}
                {/* <p className='text-2xl ml-3 my-2 font-semibold flex justify-center text-orange-700'>Meal Image</p> */}
            </div>
            <div className='flex flex-col justify-center'>
                <p className='flex justify-center text-3xl ml-4 mb-4 font-semibold text-orange-400'>Ingredients</p>
                <div className='flex flex-wrap gap-7 justify-center px-40'>
                    {ings.map((ingredient, index) => (
                        <IngImg key={index} img={`https://www.themealdb.com/images/ingredients/${ingredient}.png`} title={ingredient} description={nbings[index]} />
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <p className='flex justify-center text-3xl ml-4 mb-2 font-bold text-orange-400'>Instructions</p>
                <ul className=" px-60 list-disc text-xl mb-5">
                    {ins.map((line, index) => (
                        <li key={index}>{line}</li>
                    ))}
                </ul>
            </div>
            <div className='flex justify-center'>
                {meal ? (
                    meal.strYoutube !== "" ? (
                        <iframe
                            style={{ borderRadius: '1rem' }}
                            width="685"
                            height="385"
                            src={`https://www.youtube.com/embed/${meal.strYoutube.split('=')[1]}?rel=0`}
                            title={meal.strMeal}
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <img
                            src={`${process.env.PUBLIC_URL}/error.jpg`}
                            style={{ height: "385px", borderRadius: '1rem' }}
                            alt="no video"
                        />
                    )
                ) : null}
            </div>
        </div>
    );
}

export default Meal;
