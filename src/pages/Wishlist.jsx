import React, { useEffect, useState } from 'react';
import GradientCover from '../components/CatCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

function Wishlist() {
    const [elems, setElems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function getWishlist() {
        const URL = "https://epictastes.vercel.app/lister";
        try {
          const res = await axios.get(URL);
          setElems(res.data.itemList);
          setLoading(false);
          console.log(res.data.itemList);
        } catch (error) {
          console.error('Error fetching ingredients:', error);
          setLoading(false);
        }
      }
      getWishlist();
    }, []);

    return (
        <div className='flex items-center flex-col'>
            <div className="flex justify-center lg:py-10 md:py-8 sm:py-7 py-7 font-semibold text-2xl md:text-3xl lg:text-4xl text-orange-700">Wishlist</div>
            <div className='flex justify-center flex-wrap flex-row gap-7 pb-5'>
                { loading ? (
                    <CircularProgress />
                ) : (
                    elems.map((elem, key) => (
                        <Link key={key} to={`/${elem.id}`}>
                            <GradientCover title={elem.name} imgSrc={elem.src} />
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default Wishlist;
