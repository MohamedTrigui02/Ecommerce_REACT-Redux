import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {fetchCategories,addCategorie,deleteCategorie,editCategorie,fetchCategorieById  } from '../services/categorieservice'
import { Action } from '@remix-run/router'
export const getCategories =createAsyncThunk(
'categorie/getCategorie',
async(_, thunkAPI)=>{
const {rejectWithValue}=thunkAPI
try {
    const res = await fetchCategories()
    return res.data
     
} catch (error) {
    return rejectWithValue(error.message)
}
})

export const createCategorie= createAsyncThunk(
    'categorie/createCategorie',
    async(categorie,thunkAPI)=>{
        const{rejectWithValue}=thunkAPI;
        try {
       const res = await addCategorie(categorie)
           return res.data 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

    export const updateCategorie=createAsyncThunk(
     'categorie/updateCategorie',   
async(categorie,thunkAPI)=>{
    const{rejectWithValue}=thunkAPI
    try {
       const res = await editCategorie(categorie)
        return res.data
    } catch (error) {
       return  rejectWithValue(error.message)
    }
})
export const delCategorie=createAsyncThunk(
    'categorie/deleteCategorie',
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI
try {
 const res =   await deleteCategorie(id)
    return id;

} catch (error) {
    return rejectWithValue (error.message)
}
    }
)

export const getCategorieById=createAsyncThunk(
   ' categorie/getCategorieById',
async(id,thunkAPI)=>{
    const {rejectWithValue}=(thunkAPI)
    try {
        const res= await fetchCategorieById(id)
        return res.data
         
    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const categorieSlice=createSlice({
    name:'categorie',
initialState:{
categories:[],
categorie:{},
isLoading: false,
success:null,
error:null,

},

extraReducers:(builder)=>{
    builder
.addCase(getCategories.pending,(state,Action)=>{
    state.isLoading=true;
    state.error=null;
    
})
.addCase(getCategories.fulfilled,(state,Action)=>{
state.isLoading=false,
state.error=null,
state.categories=Action.payload
})

.addCase(getCategories.rejected,(state,action)=>{
    state.isLoading=false,
    state.error=true,
    state.categories=Action.payload
    console.log("impossible de se connecter au serveur")

})
.addCase(createCategorie.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
    state.success = null;
  })
  .addCase(createCategorie.fulfilled, (state, action) => {
    state.categories=[action.payload,...state.categories];
    state.isLoading = false;
    state.error = null;
    state.success = action.payload;
  })
  .addCase(createCategorie.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = null;
  })
  //Modification scategorie
  .addCase(updateCategorie.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
    state.success = null;
  })
  .addCase(updateCategorie.fulfilled, (state, action) => {
    state.categories = state.categories.map((item) =>
      item._id === action.payload._id ? action.payload : item
    );
    state.isLoading = false;
    state.error = null;
    state.success = action.payload;
  })
  //Delete scategorie
  .addCase(delCategorie.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(delCategorie.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.categories = state.categories.filter(
      (item) => item._id !== action.payload
    );
  })
  .addCase(delCategorie.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  })
  //Fectch scategorie
  .addCase(getCategorieById.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(getCategorieById.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.categorie = action.payload;
});
},
});


export default categorieSlice.reducer











