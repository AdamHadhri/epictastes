import React from 'react'
import Areas from '../components/Areas';
import Categories from '../components/Categories';
import Ingrediants from '../components/Ingrediants';

function Default() {
  return (
    <div>
      <div className='flex flex-col gap-10 py-10'>
          <Categories/>
          <Areas/>
          <Ingrediants/>
      </div>
    </div>
  )
}

export default Default