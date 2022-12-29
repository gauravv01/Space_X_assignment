import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    history: [],
    payloads: [],
    currentPage: 1,
    totalPages: 10,
    loading: false,
    error: null,
  }
const DataSlice=createSlice({
    name:'DataFetchSlice',
    initialState:initialState,
      reducers:{
        Fetchdata(state){
            state.loading=true
        },
        HistoryFetched(state,action){
        state.history= action.payload;
        state.currentPage=action.currentPage;
        state.totalPages= action.totalPages;
        state.loading= false;
        state.error= null;
        },
        DataError(state,action){
            state.loading=false;
            state.error=action.payload
        },
        PayloadFetched(state,action){
            state.payloads= action.payload;
            let i= 0;
           while(i<state.payloads.length){
            state.payloads[i]=({...state.payloads[i],id:i+1});
            i++;
           }
            state.currentPage=action.currentPage;
            state.totalPages= action.totalPages;
            state.loading= false;
            state.error= null;
            },
      },
})

export const DataActions=DataSlice.actions;
  
 export default DataSlice