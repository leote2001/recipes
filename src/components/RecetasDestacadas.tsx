/*eslint-disable*/
"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { apiBaseUrl } from "../utils/constants";

export default function RecetasDestacadas() {
    const [recetasDestacadas, setRecetasDestacadas] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    useEffect(() => {
        const getRecetas = async () => {
            const total = 5;
            const recetasSet = new Set();
            const recetas = [];
            try {
                setError("");
                setLoading(true);
                while (recetas.length < total) {
                    const response = await fetch(apiBaseUrl + "random.php");
                    if (!response.ok) {
                        setError("Getting recipes error")
                        return;
                    }
                    const data = await response.json();
                    const receta = data.meals[0];
                    if (!recetasSet.has(receta.idMeal)) {
                        recetasSet.add(receta.idMeal);
                        recetas.push(receta);
                    }
                }
                setRecetasDestacadas(recetas);
            } catch (err: any) {
                setError("Unexpected error");
            } finally {
                setLoading(false);
            }
        }
        getRecetas();
    }, []);
    if (loading) {
        return <p className="lead" role="alert">Loading...</p>
    }
    if (error) {
        return <p className=" text-danger lead" role="alert">{error}</p>
    }
    return (
        <>
            {recetasDestacadas.length > 0 &&
                <div className="container d-flex flex-column g-2 align-items-center">
                    {recetasDestacadas.map(receta => (
                        <div key={receta.idMeal} className="card" style={{ width: "18rem" }}>
                            <img src={receta.strMealThumb} className="card-img-top" alt={receta.strMeal}/>
                            <div className="card-body">
                                <h5 className="card-title">{receta.strMeal}</h5>
                                <p className="card-text">Area: {receta.strArea}</p>
                                <p className="card-text">Category: {receta.strCategory}</p>
                                <Link href={`/recipe/${receta.idMeal}`} className="btn btn-primary">See recipe</Link>
                            </div>
                        </div>
                    ))}
                </div>
            }
            <hr />
        </>
    );
}