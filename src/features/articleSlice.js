import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchArticles,
  addArticle,
  deleteArticle,
  editArticle,
  fetchArticleById,
  getArticleByscat
} from "../services/articleservice";




/* createAsyncThunk est une fonction utilitaire puissante fournie par Redux Toolkit pour simplifier la gestion des actions asynchrones dans Redux. Elle permet de créer des actions asynchrones de manière propre et efficace, en simplifiant la syntaxe et en gérant automatiquement plusieurs états d'une action asynchrone (comme en cours, réussie ou échouée).   */
export const getArticles = createAsyncThunk(
  "article/getArticles", //Type d'action unique:"article/getArticles" est une chaîne de caractères utilisée comme type d'action unique. Dans Redux, chaque action doit avoir un type unique qui décrit le type d'action effectuée. Cette chaîne est généralement décomposée en deux parties :La première partie, ici "article", représente la catégorie ou le domaine auquel cette action est associée. Dans ce cas, il peut s'agir d'actions liées aux articles dans une application. La seconde partie, ici "getArticles", décrit spécifiquement l'action qui est déclenchée. Dans ce cas, il s'agit probablement d'une action pour récupérer des articles à afficher dans l'application.
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI; //thunkAPI : C'est un objet fourni par Redux Toolkit qui contient des utilitaires pour gérer les actions asynchrones, tels que dispatch, getState, rejectWithValue, etc.
    try {
      const res = await fetchArticles();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await addArticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delArticle = createAsyncThunk(
  "article/delArticle",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await deleteArticle(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async (article, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await editArticle(article);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const findArticleByID = createAsyncThunk(
  "article/findArticleByID",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await fetchArticleById(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const findArticleByscat = createAsyncThunk(
  "article/findArticleByscat",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await getArticleByscat(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);












//-----------------------------------------------------

/*  createSlice est une fonction de Redux Toolkit qui permet de définir un slice du state Redux avec des reducers et des actions associées.
L'objet passé à createSlice définit le nom du slice (name), l'état initial (initialState), et les reducers associés.  */

export const articleSlice = createSlice({
  // Un slice est une partie du state Redux qui contient à la fois des reducers et des actions.
  name: "article", //nom du slice
  initialState: {
    articles: [],
    article: {},
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
      .addCase(getArticles.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articles = action.payload;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.log("impossible de se connecter au serveur");
      })
      //insertion article
      .addCase(createArticle.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.articles = [action.payload, ...state.articles];
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      })
      //Modification article
      .addCase(updateArticle.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
        state.isLoading = false;
        state.error = null;
        state.success = action.payload;
      })
      //Delete article
      .addCase(delArticle.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delArticle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articles = state.articles.filter((item) => item._id !== action.payload
        );
      })
      .addCase(delArticle.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //Fectch article
      .addCase(findArticleByID.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findArticleByID.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.article = action.payload;
      })
      .addCase(findArticleByID.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })


      .addCase(findArticleByscat.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(findArticleByscat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articles = action.payload; // Assurez-vous que la mise à jour est correcte
      })
            .addCase(findArticleByscat.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });


  },
});
export default articleSlice.reducer;
