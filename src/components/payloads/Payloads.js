import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayloads } from '../../redux/actions';
import { SearchComponent,MatchData , DisplayButton } from '../common/Common';
import constants from '../../data/constants';
import styles from '../history/History.module.css';

const PayloadsTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DataFetchSlice);
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  let filteredPayloads = data.payloads.filter((item) =>
  item.payload_id.toLowerCase().includes(search.toLowerCase()));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const totalRows = data.payloads.length;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };


  useEffect(() => {
    dispatch(fetchPayloads());
  }, []);


  return (
    <>
     <SearchComponent search={search} handleChange={handleChange}/>
      <div className={styles.div_a}>
        <table className={styles.table}>
          <thead>
            <tr>
            {constants.PAYLOAD_HEADING.map(item=>{
              return <th key={item} className={styles.th}>{item}</th>
            })}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
           { MatchData(data.loading,filteredPayloads,page,rowsPerPage)}
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

export default PayloadsTable;
