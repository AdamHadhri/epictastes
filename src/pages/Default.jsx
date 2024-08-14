import React from 'react'
import Areas from '../components/Areas';
import Categories from '../components/Categories';
import Ingrediants from '../components/Ingrediants';
import Latest from '../components/Latest';

function Default() {
  return (
    <div>
      <div className='flex flex-col gap-8  py-5'>
          <Latest/>
          <Categories/>
          <Areas/>
          <Ingrediants/>
      </div>
    </div>
  )
}

export default Default