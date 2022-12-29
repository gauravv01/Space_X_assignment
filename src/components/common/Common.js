import constants from '../../data/constants';
import styles from './Common.module.css';
import { DataActions } from '../../redux/DataSlice';
import { useDispatch,useSelector } from 'react-redux';

const tdstyles=styles.td;


export const SearchComponent=({search,handleChange})=>{

   return <div className={styles.input_div}><input
    placeholder={constants.SEARCH}
    value={search}
    onChange={handleChange}
    className={styles.input}
  />
  </div>
}

const shortenName=(name)=>{
  const newName=name.split('');
  let updatedName;
  if(newName.length>=80){
   updatedName=newName.slice(0,100);
  updatedName.push('...')
  }
  else{
    updatedName=newName;
  }
  return updatedName.join('');
}

const tableRow=(row)=>{
    const {id,title,details,customers,payload_id} = row || {};
    return (
        <tr 
        className={styles.tr}
        key={id}
      >
        <td className={tdstyles}>{id}</td>
        <td className={tdstyles}>{title?title:payload_id}</td>
        <td className={tdstyles}>{details?shortenName(details):customers}</td>
      </tr>
    )
}



export const MatchData=(loading,data)=>{
const slicedrow=useSelector(state=>state.DataFetchSlice.slicedrows);
    if(!loading && data.length>=1){
      return slicedrow.map((row1)=> tableRow(row1));
    }
    
    else if(loading){
      return <tr><td className={tdstyles}>Loading...</td></tr>
    }
    else if(!loading && data.length===0){
      return <tr><td className={tdstyles}>No Match Found.</td></tr>
    }
  }

  export const DisplayButton=({totalRows,type})=>{
 const dispatch=useDispatch();
 const data=useSelector(state=>state.DataFetchSlice);
 
 function slicedrow(){
  if(type===constants.HISTORY){
  dispatch(DataActions.Givehistory(data.RowsPerPage));
  }
  else if(type===constants.PAYLOADS){
  dispatch(DataActions.Givepayload(data.RowsPerPage));
  }
 }
 
 const pageIncrement=()=>{
  dispatch(DataActions.PageInc());
  slicedrow();
};
 const pageDecrement=()=>{
  dispatch(DataActions.PageDec())
  slicedrow();
};
    return  <div>
    <button
      className={styles.button}
      onClick={pageDecrement}
      disabled={data.currentPage<=1}
    >
      {constants.PREVIOUS}
    </button>
    <span className={styles.span}>{data.currentPage}</span>
    <button
      className={styles.button}
      onClick={pageIncrement}
      disabled={data.currentPage >= Math.ceil(totalRows/data.RowsPerPage)}
    >
      {constants.NEXT}
    </button>
  </div>
  }
