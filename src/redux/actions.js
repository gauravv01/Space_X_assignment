import { DataActions } from "./DataSlice";
import axios from '../data/API/Instance'

export const fetchHistory = () => {
  return async (dispatch) => {
    dispatch(DataActions.Fetchdata());
    try {
      const response =await axios.get('/history');
      const data = response.data;
      dispatch(DataActions.HistoryFetched(data));
      dispatch(DataActions.Givehistory(5))
    } catch (error) {
      dispatch(DataActions.DataError(error));
    }
  };
};



export const fetchPayloads = () => {
  return async (dispatch) => {
    dispatch(DataActions.Fetchdata());
    try {
      const response = await axios.get('/payloads');
      const data =response.data;
      dispatch(DataActions.PayloadFetched(data));
      dispatch(DataActions.Givepayload(5));
    } catch (error) {
      dispatch(DataActions.DataError(error));
    }
  };
};
