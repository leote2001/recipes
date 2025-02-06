"use client"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "next-share";
export default function HomeShareButtons() {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
                <h2>Share</h2>
                <div className=" d-flex justify-content-between">
                    <FacebookShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    quote="Recipes from all over the world"
                    hashtag={"#recipes"}
                    aria-label="Share Facebook"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    title="Recipes from all over the world"
                    hashtags={["recipes", "nextjs", "food", "recetas"]}
                    aria-label="Share Twitter"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                    url="https://recipes-ten-mauve.vercel.app/"
                    title="Recipes from all over the world"
                    summary="Recipes app"
                    source="Recipes"
                    aria-label="Share Linkedin"
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton 
                    url={"https://recipes-ten-mauve.vercel.app/"}
                    title="Recipes from all over the world"
                    separator=" - "
                    aria-label="Share Whatsapp"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
  );
}
