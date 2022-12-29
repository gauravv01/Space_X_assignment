import constants from '../../data/constants';
import styles from './Common.module.css';

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

const tableRow=(row)=>{
    const {id,title,details,customers,payload_id} = row || {};
    return (
        <tr 
        className={styles.tr}
        key={id}
      >
        <td className={tdstyles}>{id}</td>
        <td className={tdstyles}>{title?title:payload_id}</td>
        <td className={tdstyles}>{details?details:customers}</td>
      </tr>
    )
}



export const MatchData=(loading,data,page,rowsPerPage)=>{

    if(!loading && data.length>=1){
      const data1 = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
      return data1.map((row1)=> tableRow(row1));
    }
    
    else if(loading){
      return <tr><td className={tdstyles}>Loading...</td></tr>
    }
    else if(!loading && data.length===0){
      return <tr><td className={tdstyles}>No Match Found.</td></tr>
    }
  }

  export const DisplayButton=({setPage,page,totalRows,rowsPerPage})=>{
    return  <div>
    <button
      className={styles.button}
      onClick={() => setPage(page - 1)}
      disabled={page === 0}
    >
      {constants.PREVIOUS}
    </button>
    <span className={styles.span}>{page + 1}</span>
    <button
      className={styles.button}
      onClick={() => setPage(page + 1)}
      disabled={page >= totalRows / rowsPerPage - 1}
    >
      {constants.NEXT}
    </button>
  </div>
  }
