/*eslint-disable*/
import Recipe from "../../../components/Recipe";
import type { Metadata } from "next";
import { apiBaseUrl } from "../../../utils/constants";
export async function generateMetadata({ params}: {params: Promise<{id: string}>} ): Promise<Metadata> {
  try {
    const id = (await params).id;
    const response = await fetch(apiBaseUrl + "lookup.php?i=" + id);
    const data = await response.json();
    if (!response.ok) {
      throw new Error("Error fetching recipe");
    }
    const receta = data.meals[0];
    return {
      metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string), 
      title: receta.strMeal,
      description: `Learn how to prepare ${receta.strMeal}`,
      openGraph: {
        url: `/recipe/${id}`,
        title: receta.strMeal,
        description: `Learn how to prepare ${receta.strMeal}`,
        images: [{url: receta.strMealThumb}] 
      }
    }
  } catch (err: any) {
    return {
      title: "Recipe",
      description: "Learn how to prepare this recipe"
    }
  }
}

export default function RecipePage() {
  return (
    <Recipe/>
  );
}