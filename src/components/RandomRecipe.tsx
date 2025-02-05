/*eslint-disable*/
"use client"
import Link from 'next/link';
import { apiBaseUrl } from '../utils/constants'
import { RecetaType } from './Recipe';
import React, { useState } from 'react';

export default function RandomRecipe() {
    const [recipe, setRecipe] = useState<RecetaType | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const getRandom = async () => {
        try {
            setError("");
            setLoading(true);
            const response = await fetch(apiBaseUrl + "random.php");
            const data = await response.json();
            const receta = data.meals[0];
            setRecipe(receta);
        } catch (err: any) {
            setError("Unexpected error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <h2>Random recipe</h2>
            <button onClick={getRandom} className='btn-primary'>Get random recipe</button>
            {loading && <p className='lead' role="alert">Loading...</p>}
            {error && <p className='lead text-danger' role="alert">{error}</p>}
            {recipe &&
                <div className="card" style={{ width: "18rem" }}>
                    <img src={recipe.strMealThumb} className="card-img-top" alt={recipe.strMeal} />
                    <div className="card-body">
                        <h5 className="card-title">{recipe.strMeal}</h5>
                        <p className="card-text">Area: {recipe.strArea}</p>
                        <p className="card-text">Category: {recipe.strCategory}</p>
                        <Link href={`/recipe/${recipe.idMeal}`} className="btn btn-primary">See recipe</Link>
                    </div>
                </div>
            }
        </>
    );
}
