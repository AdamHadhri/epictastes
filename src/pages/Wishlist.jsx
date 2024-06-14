import React, { useEffect, useState } from 'react'
import GradientCover from '../components/CatCard'
import axios from 'axios';
import { Link } from 'react-router-dom';

function Wishlist() {
    const [elems, setElems] = useState([]);
  
    useEffect(() => {
      async function getWishlist() {
        const URL = "https://epictastes.vercel.app/lister";
        try {
          const res = await axios.get(URL);
          setElems(res.data.itemList);
          console.log(res.data.itemList);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
        }
      }
      getWishlist();
    }, []);
  return (
<div className='flex items-center flex-col gap-5'>
        <div className=" py-5 font-semibold text-4xl flex justify-center text-orange-700">Wishlist</div>
        <div className='flex justify-center flex-wrap flex-row gap-5'>
            {elems.map((elem,key) => (
              <Link key={key} to={`/${elem.id}`}>
                <GradientCover title={elem.name} imgSrc={elem.src}/>
              </Link>
            ))}
        </div>
    </div>
  )
}

export default Wishlist