import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    history: [],
    payloads: [],
    currentPage: 1,
    RowsPerPage:5,
    slicedrows:[],
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
            state.loading= false;
            state.error= null;
            },
            PageInc(state){
              state.currentPage=state.currentPage+1
            },
            PageDec(state){
              state.currentPage=state.currentPage-1
            },
            Givehistory(state,action){
              const rowsPerpage=action.payload;
              const factor=(state.currentPage-1)*rowsPerpage;
              const newfactor=(state.currentPage)*rowsPerpage;
              state.slicedrows=state.history.slice(factor,newfactor)
              console.log(state.slicedrows,factor,rowsPerpage)

            },
            Givepayload(state,action){
              const rowsPerpage=action.payload;
              const factor=(state.currentPage-1)*rowsPerpage;
              const newfactor=(state.currentPage)*rowsPerpage;
              state.slicedrows=state.payloads.slice(factor,newfactor)
            },
            SetPage(state){
              state.currentPage=1;
            },
            SetRowsPerPage(state,action){
              state.RowsPerPage=action.payload
            }

      },
})

export const DataActions=DataSlice.actions;
  
 export default DataSlice