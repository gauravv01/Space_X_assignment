import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {SearchComponent , DisplayButton, MatchData } from '../common/Common';
import { fetchHistory } from '../../redux/actions';
import constants from '../../data/constants';
import styles from './History.module.css';

const History = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DataFetchSlice);
  
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  

  const filteredHistory = data.history.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const rows = filteredHistory;
  const totalRows = rows.length;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);

  // useEffect(()=>{
  //   MatchData(data.loading,rows,page,rowsPerPage)
  // },[data.loading,rows])

 
  return (
    <>
     <SearchComponent search={search} handleChange={handleChange}/>
      <div className={styles.div_a}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
            {constants.HISTORY_HEADINGS.map(item=>{
              return <th key={item} className={styles.th}>{item}</th>
            })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
           {MatchData(data.loading,rows,page,rowsPerPage)}
          </tbody>
        </table>
        <div className={styles.div_b}>
          <label>
            {constants.ROWS_PER_PAGE}
            <select value={rowsPerPage} className={styles.select} onChange={handleChangeRowsPerPage}>
              {constants.OPTIONS.map((no)=>{
                return <option key={no} value={no}>{no}</option>
              })}
            </select>
          </label>
        </div>
        <DisplayButton setPage={setPage} page={page} totalRows={totalRows} rowsPerPage={rowsPerPage}/>
      </div>
    </>
  );
};
export default History;
