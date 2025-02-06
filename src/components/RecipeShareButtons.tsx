"use client"
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from "next-share";
type Props = {
    url: string;
    title: string;
    description: string;
}
export default function RecipeShareButtons({url, title, description}: Props) {
  return (
    <div className="d-flex flex-column align-items-center mt-3">
                <h2>Share recipe</h2>
                <div className=" d-flex justify-content-between">
                    <FacebookShareButton 
                    url={url}
                    quote={description}
                    hashtag={"#recipe"}
                    aria-label="Share Facebook"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton 
                    url={url}
                    title={description}
                    hashtags={["recipe", "nextjs", "food", "receta"]}
                    aria-label="Share Twitter"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton 
                    url={url}
                    title={title}
                    summary={description}
                    source="Recipes"
                    aria-label="Share Linkedin"
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <WhatsappShareButton 
                    url={url}
                    title={description}
                    separator=" - "
                    aria-label="Share Whatsapp"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                </div>
            </div>
  );
}
