import RandomRecipe from "../components/RandomRecipe";
import RecetasDestacadas from "../components/RecetasDestacadas";
import Search_Filter from "../components/Search_Filter";
import HomeShareButtons from "../components/HomeShareButtons";
export default function Home() {
    return (
        <>
            <Search_Filter />
            <RandomRecipe />
            <h2>Featured</h2>
            <RecetasDestacadas />
            <HomeShareButtons/>
        </>
    );
}