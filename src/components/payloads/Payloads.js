import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayloads } from '../../redux/actions';
import { SearchComponent,MatchData , DisplayButton } from '../common/Common';
import constants from '../../data/constants';
import styles from '../history/History.module.css';
import { DataActions } from '../../redux/DataSlice';

const PayloadsTable = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.DataFetchSlice);
  const [search, setSearch] = useState('');

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  let filteredPayloads = data.payloads.filter((item) =>
  item.payload_id.toLowerCase().includes(search.toLowerCase()));

  const totalRows = filteredPayloads.length;

  const handleChangedata = (event) => {
    dispatch(DataActions.SetRowsPerPage(event.target.value))
    dispatch(DataActions.SetPage());
    dispatch(DataActions.Givepayload(event.target.value))
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
           { MatchData(data.loading,filteredPayloads,data.RowsPerPage)}
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
      <DisplayButton   totalRows={totalRows} type={constants.PAYLOADS} />
      </div>
    </>
  );
};

export default PayloadsTable;
