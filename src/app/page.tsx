
"use client"

import RandomRecipe from "../components/RandomRecipe";
import RecetasDestacadas from "../components/RecetasDestacadas";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "next-share";
import Search_Filter from "../components/Search_Filter";

export default function Home() {
    return (
        <>
            <Search_Filter />
            <RandomRecipe />
            <h2>Featured</h2>
            <RecetasDestacadas />
            <div className="d-flex flex-column align-items-center mt-3">
                <h2>Share</h2>
                <div className=" d-flex justify-content-between">
                    <FacebookShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    title="Recipes"
                    quote="Recipes from all over the world"
                    hashtag={"#webapp"}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    title="Recipes from all over the world"
                    hashtags={["recipes", "nextjs", "food", "recetas"]}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                    url="https://recipes-ten-mauve.vercel.app/"
                    title="Recipes from all over the world"
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    title="Recipes from all over the world"
                    separator=" - "
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
    
        </>
    );
}