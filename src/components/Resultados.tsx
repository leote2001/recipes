/*eslint-disable*/
import Link from 'next/link';
import React, { Dispatch, SetStateAction, useState } from 'react'
import Pagination from './Pagination';
interface ResultadosProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    array: any[];
    error: string;
    loading: boolean;
}
export default function Resultados({currentPage, setCurrentPage, array, error, loading }: ResultadosProps) {
    const recipesPerPage = 8;
    const indexOfLastRecipe = currentPage * recipesPerPage; 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = array.slice(indexOfFirstRecipe, indexOfLastRecipe); 
    const totalPages = Math.ceil(array.length / recipesPerPage) ;
    if (loading) {
        return <p className='lead' role="alert">Loading...</p>
    }
    if (error) {
        return <p className='lead text-danger' role="alert">{error}</p>
    }
    return (
        <>
{array.length > 0 && 
<div className='mt-4'>
    <h2>Results</h2>
    <h3 role='alert'>{array.length} recipes - page {currentPage} - {totalPages}</h3>
<ul className='list-group'>
{currentRecipes.map((receta, index) => (
    <li key={index} className='list-group-item'><Link href={`/recipe/${receta.idMeal}`}><img src={receta.strMealThumb+"/preview"} alt={receta.strMeal}/><p>{receta.strMeal}</p></Link></li>
))}
</ul>
<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
</div>
}
<hr />
        </>
    );
}
