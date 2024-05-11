import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../features/articleSlice";
import articlespromoReducer from "../features/articlePromoSlice";
import cartSliceReducer from "../features/cartSlice";
import scategoriesReducer from "../features/scategorieSlice";
import categoriesReducer from "../features/categorieSlice";
import authReducer from "../features/authSlice";
import carouselReducer from "../features/carouselSlice";

//import scategoriesReducer from "../features/scategorieSlice"

/* Dans le fichier store.js, la fonction configureStore est utilisée pour créer l'instance principale du store Redux.
 Cela permet de combiner différents reducers dans une configuration unique.*/
const store = configureStore({
  reducer: {
    /*Cette ligne de code dans le fichier store.js définit la configuration du store Redux à l'aide de Redux Toolkit avec configureStore. Plus précisément, elle configure un segment du store appelé storearticles en utilisant le reducer articlesReducer        */
    storearticles: articlesReducer,
    storearticlespromo: articlespromoReducer,

    storescategories: scategoriesReducer,
    storecart: cartSliceReducer,
    storecategories: categoriesReducer,
    auth: authReducer,
    storecarousel: carouselReducer,
  },
});
export default store;
