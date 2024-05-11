import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchArticlePromoById,
  addArticlePromo,
  deleteArticlePromo,
  editArticlePromo,
  fetchArticlesPromo,
} from "../services/articlepromoservice";
/* createAsyncThunk est une fonction utilitaire puissante fournie par Redux Toolkit pour simplifier la gestion des actions asynchrones dans Redux. Elle permet de créer des actions asynchrones de manière propre et efficace, en simplifiant la syntaxe et en gérant automatiquement plusieurs états d'une action asynchrone (comme en cours, réussie ou échouée).   */
export const getArticlesPromo = createAsyncThunk(
  "articlepromo/getArticlesPromo", //Type d'action unique:"article/getArticles" est une chaîne de caractères utilisée comme type d'action unique. Dans Redux, chaque action doit avoir un type unique qui décrit le type d'action effectuée. Cette chaîne est généralement décomposée en deux parties :La première partie, ici "article", représente la catégorie ou le domaine auquel cette action est associée. Dans ce cas, il peut s'agir d'actions liées aux articles dans une application. La seconde partie, ici "getArticles", décrit spécifiquement l'action qui est déclenchée. Dans ce cas, il s'agit probablement d'une action pour récupérer des articles à afficher dans l'application.
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI; //thunkAPI : C'est un objet fourni par Redux Toolkit qui contient des utilitaires pour gérer les actions asynchrones, tels que dispatch, getState, rejectWithValue, etc.
    try {
      const res = await fetchArticlesPromo();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticlePromo = createAsyncThunk(
  "articlepromo/createArticlePromo",
  async (articlepromo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addArticlePromo(articlepromo);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delArticlePromo = createAsyncThunk(
  "articlepromo/delArticlePromo",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await deleteArticlePromo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateArticlePromo = createAsyncThunk(
  "articlepromo/updateArticlePromo",
  async (articlepromo, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await editArticlePromo(articlepromo);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const findArticlePromoByID = createAsyncThunk(
  "articlepromo/findArticlePromoByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchArticlePromoById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
//-----------------------------------------------------

/*  createSlice est une fonction de Redux Toolkit qui permet de définir un slice du state Redux avec des reducers et des actions associées.
L'objet passé à createSlice définit le nom du slice (name), l'état initial (initialState), et les reducers associés.  */

export const articlepromoSlice = createSlice({
  // Un slice est une partie du state Redux qui contient à la fois des reducers et des actions.
  name: "articlepromo", //nom du slice
  initialState: {
    articlespromo: [],
    articlepromo: {},
    isLoading: false,
    success: null,
    error: null,
  },

  extraReducers: (builder) => {
    /* le builder est un outil utilisé pour structurer la logique de réduction dans Redux Toolkit. Il permet de définir les réponses à différentes actions, en séparant la gestion de l'état pour chaque type d'action, ce qui rend la gestion des reducers plus modulaire, lisible et facile à entretenir */
    //get articles
    builder
      //chaque addCase dans extraReducers est un reducer associé à une action asynchrone spécifique
      //(par exemple, getArticles.pending, getArticles.fulfilled, getArticles.rejected)
      .addCase(getArticlesPromo.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getArticlesPromo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articlespromo = action.payload;
      })
      .addCase(getArticlesPromo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("impossible de se connecter au serveur");
      })
      //insertion article
      .addCase(createArticlePromo.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createArticlePromo.fulfilled, (state, action) => {
        state.articlespromo = [action.payload, ...state.articlespromo];
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createArticlePromo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      })
      //Modification article
      .addCase(updateArticlePromo.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateArticlePromo.fulfilled, (state, action) => {
        state.articlespromo = state.articlespromo.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      //Delete article
      .addCase(delArticlePromo.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delArticlePromo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articlespromo = state.articlespromo.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(delArticlePromo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })



      
      //Fectch article
      .addCase(findArticlePromoByID.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findArticlePromoByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articlepromo = action.payload;
      })
      .addCase(findArticlePromoByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default articlepromoSlice.reducer;
