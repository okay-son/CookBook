import './App.css';
// import './key.js';
import Axios from "axios";
import { useState } from "react";
import RecipeTile from './RecipeTile';

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);
  const [healthLabels, sethealthLabels] = useState("vegetarian")

  const YOUR_APP_ID = "bd43a8c0";
  const YOUR_APP_KEY = "6fd89efc44b11751598cf53a42b9feb7";

  var url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&health=${healthLabels}`;
  
  async function getRecipes() {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipes();
  }

  return (
    <div className="app">
      <h1 onClick={getRecipes}>food recipies !!</h1>
      <form className="app_searchBlank" onSubmit={onSubmit}>
        <input 
          type="text" 
          className='app_input'
          placeholder="enter ingredient"
          value={query} onChange={(e) => setquery(e.target.value)} 
        />
        <select className="app_healthLabels">
          <option onClick={() => sethealthLabels("vegetarian")}>vegetarian</option>
          <option onClick={() => sethealthLabels("paleo")}>paleo</option>
          <option onClick={() => sethealthLabels("dairy-free")}>dairy-free</option>
          <option onClick={() => sethealthLabels("gluten-free")}>gluten-free</option>
          <option onClick={() => sethealthLabels("wheat-free")}>wheat-free</option>
          <option onClick={() => sethealthLabels("low-sugar")}>low-sugar</option>
          <option onClick={() => sethealthLabels("peanut-free")}>peanut-free</option>
          <option onClick={() => sethealthLabels("tree-nut-free")}>tree-nut-free</option>
          <option onClick={() => sethealthLabels("soy-free")}>soy-free</option>
          <option onClick={() => sethealthLabels("fish-free")}>fish-free</option>
          <option onClick={() => sethealthLabels("shellfish-free")}>shellfish-free</option>
        </select>
        <input className="app_submit" type="submit" value="Search" />
      
      </form>

      <div className="app_recipes">
        {recipes.map(recipe => {
          return <RecipeTile recipe={recipe}/>;
        })}
      </div>
    </div>
  );
}

export default App;
