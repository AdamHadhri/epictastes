import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IngImg from './IngImg';
import '../index.css';

function Meal({ id }) {
    const [meal, setMeal] = useState(null);
    const [love, setLove] = useState(false);
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
                if (fetchedMeal) {
                    setIns(fetchedMeal.strInstructions.split('\r\n').filter(line => line.trim()));
                }
            } catch (error) {
                console.error('Error fetching meal:', error);
            }
        }
        if (id) {
            getMeal();
        }
    }, [id]);

    useEffect(() => {
        if (meal) {
            const ingredients = [];
            const measures = [];
            for (let i = 1; i <= 20; i++) {
                let ingredient = meal[`strIngredient${i}`]?.trim();
                let measure = meal[`strMeasure${i}`]?.trim();
                if (ingredient) {
                    ingredients.push(ingredient);
                }
                if (measure) {
                    measures.push(measure);
                }
            }
            setIngs(ingredients);
            setNbings(measures);
        }
    }, [meal]);

    useEffect(() => {
        async function checkStatus() {
            try {
                const res = await axios.get(`https://epictastes.vercel.app/status/${id}`);
                const status = res.data.loved;
                setLove(status);  
            } catch (error) {
                console.error('Error checking status:', error);
            }
        }

        if (id)  {
            checkStatus();
        }
    }, [id]);

    async function addToWishlist() {
        try {
            if (!love) {
                await axios.post('https://epictastes.vercel.app/ajouter', {
                    id: meal.idMeal,
                    name: meal.strMeal,
                    src: meal.strMealThumb
                });
            } else {
                await axios.get(`https://epictastes.vercel.app/supprimer/${meal.idMeal}`);
            }
            setLove(!love);
        } catch (error) {
            console.error('Error adding to/removing from wishlist:', error);
        }
    }

    return (
        <div className='flex flex-col justify-center gap-5 py-3'>
            <div>
                <p className='flex justify-center text-4xl font-bold mt-5 text-orange-500'>{meal ? meal.strMeal : 'Loading...'}</p>
                <div className='flex justify-center text-2xl ml-3 my-2 font-normal gap-3'>
                    <p className='font-semibold text-orange-700'>Category: </p> {meal ? meal.strCategory : '***'}
                    <p className='font-semibold text-orange-700'>Area: </p> {meal ? meal.strArea : '***'}
                </div>
            </div>
            <div className='flex justify-center'>
                <button style={{ color: love ? "white" : "#ea580c" ,  backgroundColor: love ? "#ea580c" : "white" }} className='flex text-white font-medium gap-2 border-orange-600 border-2 bg-orange-600 h-14 w-44 items-center justify-center rounded-xl text-2xl' onClick={addToWishlist}>
                    <img className='h-6' src={ love ? `${process.env.PUBLIC_URL}/saved.svg` : `${process.env.PUBLIC_URL}/unsaved.svg` } alt="<3" />
                    {love ? 'Saved' : 'Save'}
                </button>
            </div>
            <div className='flex flex-col items-center'>
                {meal && (
                    <img
                        src={meal.strMealThumb}
                        className='flex justify-center object-cover w-[500px] h-[300px] rounded-2xl'
                        alt={meal.strMeal}
                    />
                )}
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
                <ul className="px-60 list-disc text-xl mb-5">
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
                            alt="No video available"
                        />
                    )
                ) : null}
            </div>
        </div>
    );
}

export default Meal;
