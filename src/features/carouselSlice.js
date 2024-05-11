import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {addCarousel,deleteCarousel,editCarousel,fetchCarousel,fetchCarouselById } from '../services/carouselservice'
import { Action } from '@remix-run/router'

export const getCarousel =createAsyncThunk(
'carousel/getCarousel',
async(_, thunkAPI)=>{
const {rejectWithValue}=thunkAPI
try {
    const res = await fetchCarousel()
    return res.data
     
} catch (error) {
    return rejectWithValue(error.message)
}
})

export const createCarousel= createAsyncThunk(
    'carousel/createCarousel',
    async(carousel,thunkAPI)=>{
        const{rejectWithValue}=thunkAPI;
        try {
       const res = await addCarousel(carousel)
           return res.data 
        } catch (error) {
            return rejectWithValue(error.message)
        }
    });

    export const updateCarousel=createAsyncThunk(
        'carousel/updateCarousel',
        async(carousel,thunkAPI)=>{
    const{rejectWithValue}=thunkAPI
    try {
       const res = await editCarousel(carousel)
        return res.data
    } catch (error) {
       return  rejectWithValue(error.message)
    }
})
export const delCarousel=createAsyncThunk(
    'carousel/delCarousel',
    async(id,thunkAPI)=>{
        const {rejectWithValue}=thunkAPI
try {
 const res =   await deleteCarousel(id)
    return id

} catch (error) {
    return rejectWithValue (error.message)
}
    }
)

export const getCarouselById=createAsyncThunk(
    'carousel/getCarouselById',
async(id,thunkAPI)=>{
    const {rejectWithValue}=(thunkAPI)
    try {
        const res= await fetchCarouselById(id)
        return res.data
         
    } catch (error) {
        return rejectWithValue(error.message)
    }

})

export const carouselSlice=createSlice({
    name:'carousel',
initialState:{
carousels:[],
carousel:{},
isLoading: false,
success:null,
error:null,

},

extraReducers:(builder)=>{
    builder
.addCase(getCarousel.pending,(state,Action)=>{
    state.isLoading=true;
    state.error=null;
    
})
.addCase(getCarousel.fulfilled,(state,Action)=>{
state.isLoading=false,
state.error=null,
state.carousels=Action.payload
})

.addCase(getCarousel.rejected,(state,action)=>{
    state.isLoading=false,
    state.error=true,
    state.carousels=action.payload
    console.log("impossible de se connecter au serveur")

})
.addCase(createCarousel.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
    state.success = null;
  })
  .addCase(createCarousel.fulfilled, (state, action) => {
    state.carousels.push(action.payload);
    state.isLoading = false;
    state.error = null;
    state.success = action.payload;
  })
  .addCase(createCarousel.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = null;
  })
  //Modification scategorie
  .addCase(updateCarousel.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
    state.success = null;
  })
  .addCase(updateCarousel.fulfilled, (state, action) => {
    state.carousels = state.carousels.map((item) =>
      item._id === action.payload._id ? action.payload : item
    );
    state.isLoading = false;
    state.error = null;
    state.success = action.payload;
  })
  //Delete scategorie
  .addCase(delCarousel.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(delCarousel.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.carousels = state.carousels.filter(
      (item) => item._id !== action.payload
    );
  })
  .addCase(delCarousel.rejected, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  })
  //Fectch scategorie
  .addCase(getCarouselById.pending, (state, action) => {
    state.isLoading = true;
    state.error = null;
  })
  .addCase(getCarouselById.fulfilled, (state, action) => {
    state.isLoading = false;
    state.error = null;
    state.carousel = action.payload;
});
},
});


export default carouselSlice.reducer











