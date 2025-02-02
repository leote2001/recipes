/*eslint-disable*/
"use client"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from 'next-share';
import Head from 'next/head';
import { apiBaseUrl } from '../../../utils/constants';
import VideoYt from '../../../components/VideoYt';
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';
import getVideoId from 'get-video-id';
export type RecetaType = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strInstructions: string;
  strMealThumb: string;
  strArea: string;
}
export default function RecipePage() {
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
    <Head>
      <title>{receta ? `${receta.strMeal}` : "Recipe not found"}</title>
      <meta name='description' content='Check this recipe'/>
      <meta property='og:title' content={receta ? `${receta.strMeal}` : "Recipe not found"}/>
      <meta property='og:description' content='Check this recipe'/>
      <meta property='og:url' content={receta ? `https://recipes-ten-mauve.vercel.app/recipe/${receta.idMeal}` : ""}/>
    </Head>
      {receta &&
        <div className='container text-center'>
          <h2>{receta.strMeal}</h2>
          <figure>
            <img className='w-100' src={receta.strMealThumb} alt={receta.strMeal} />
            <figcaption>Recipe image</figcaption>
          </figure>
          <p>Area: {receta.strArea}</p>
          <p>Category: {receta.strCategory}</p>
          <VideoYt vidUrl={videoYt}/>
          <h3>Instructions</h3>
          <p>{receta.strInstructions}</p>
          <div className="d-flex flex-column align-items-center mt-3">
                <h3>Share</h3>
                <div className=" d-flex justify-content-between">
                    <FacebookShareButton 
                    url={currentUrl}
                    hashtag={"#recipe"}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={currentUrl}
                    title={receta.strMeal}
                    hashtags={["recipes", "nextjs", "food", "recetas"]}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                    url={currentUrl}
                    title={`Check ${receta.strMeal}`}
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton 
                    url={currentUrl}
                    title={`Check ${receta.strMeal}`}
                    separator=" - "
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
          <Link className='btn btn-primary' href="/">Back</Link>
        </div>
      }
    </>
  );
}
