"use client"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "next-share";
export default function HomeShareButtons() {
    const currentUrl = typeof window !== "undefined" ? window.location.href : ""; 
  return (
    <div className="d-flex flex-column align-items-center mt-3">
                <h2>Share</h2>
                <div className=" d-flex justify-content-between">
                    <FacebookShareButton 
                    url={currentUrl}
                    quote="Recipes from all over the world"
                    hashtag={"#recipes"}
                    aria-label="Share Facebook"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={currentUrl}
                    title="Recipes from all over the world"
                    hashtags={["recipes", "nextjs", "food", "recetas"]}
                    aria-label="Share Twitter"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                    url={currentUrl}
                    title="Recipes from all over the world"
                    summary="Recipes app"
                    source="Recipes"
                    aria-label="Share Linkedin"
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton 
                    url={currentUrl}
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
