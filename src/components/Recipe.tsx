/*eslint-disable*/
"use client"
import { apiBaseUrl } from '../utils/constants';
import VideoYt from "./VideoYt";
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';
import getVideoId from 'get-video-id';
import RecipeShareButtons from './RecipeShareButtons';
export type RecetaType = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strArea: string;
}
export default function Recipe() {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const { id } = useParams();
  const [receta, setReceta] = useState<RecetaType | null>(null);
  const [videoYt, setVideoYt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const getReceta = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(apiBaseUrl + "lookup.php?i=" + id);
        if (!response.ok) {
          setError("Getting recipe error");
          setLoading(false);
          return;
        }
        const data = await response.json();
        const receta = data.meals[0];
        const vidId = getVideoId(receta.strYoutube).id;
        setVideoYt("https://www.youtube.com/embed/" + vidId);
        setReceta(receta);

      } catch (err: any) {
        setError("Getting recipe error");
      } finally {
        setLoading(false);
      }
    }
    getReceta();
  }, [id]);
  console.log(videoYt);
  if (loading) {
    return <p className='lead' role="alert">Loading...</p>
  }
  if (error) {
    return <p className='lead text-danger' role="alert">{error}</p>
  }
  return (
    <>

      {receta &&
        <div className='container text-center'>
          <h2>{receta.strMeal}</h2>
          <figure>
            <img className='w-100' src={receta.strMealThumb} alt={receta.strMeal} />
            <figcaption>Recipe image</figcaption>
          </figure>
          <p>Area: {receta.strArea}</p>
          <p>Category: {receta.strCategory}</p>
          <VideoYt vidUrl={videoYt} />
          <h3>Instructions</h3>
          <p>{receta.strInstructions}</p>
          <hr />
          <RecipeShareButtons url={currentUrl} title={receta.strMeal} description={`Learn how to prepare ${receta.strMeal}`}/>
          <Link className='btn btn-primary' href="/">Back</Link>
        </div>
      }
    </>
  );
}
