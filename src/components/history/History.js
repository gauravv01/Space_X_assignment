import React, { useState, useEffect } from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {SearchComponent , DisplayButton, MatchData } from '../common/Common';
import { fetchHistory } from '../../redux/actions';
import { DataActions } from '../../redux/DataSlice';
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

  const handleChangedata = (event) => {
    dispatch(DataActions.SetRowsPerPage(event.target.value));
    dispatch(DataActions.SetPage())
    dispatch(DataActions.Givehistory(event.target.value))
  };

  useEffect(() => {
    dispatch(fetchHistory());
  }, []);
 
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
           {MatchData(data.loading,filteredHistory,data.RowsPerPage)}
          </tbody>
        </table>
        <div className={styles.div_b}>
          <label>
            {constants.ROWS_PER_PAGE}
            <select value={data.RowsPerPage} className={styles.select} onChange={handleChangedata}>
              {constants.OPTIONS.map((no)=>{
                return <option key={no} value={no}>{no}</option>
              })}
            </select>
          </label>
        </div>
        <DisplayButton  totalRows={filteredHistory.length} type={constants.HISTORY} />
      </div>
    </>
  );
};
export default History;
