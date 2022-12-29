import { useNavigate } from 'react-router-dom';
import {  useState } from 'react';
import constants from '../../data/constants';
import styles from './Navigation.module.css'


const Navigation = () => {
  const navigate = useNavigate();
  const [Icon,setIcon]= useState(false);
  const [Options,setOptions]= useState(true);

  const placeIcon=()=>{
if(window.innerWidth<='640'){
  setIcon(true)
  setOptions(false)
}
else if(window.innerWidth>'640'){
  setIcon(false)
  setOptions(true)
}
  }
  window.addEventListener('load',placeIcon);
  window.addEventListener('resize',placeIcon);

  const homepage = (e) => {
    navigate(constants.HOME_PAGE);
  };
  const payloadpage = (e) => {
    navigate(constants.PAYLOAD_PAGE);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.outer_div}>
<div className={styles.logo}>{constants.SPACEX}</div>
{Options && <div className={styles.options}>
<button onClick={homepage}>{constants.HISTORY}</button>
<button  onClick={payloadpage} >{constants.PAYLOADS}</button>
</div>}
</div>
{Icon && <div className={styles.hamburger} onClick={()=>setOptions(option=>!option)}>{constants.HAMBURGER.map(itm=>{return <span key={itm} className={styles.span}></span>})}</div>}
{/* {Options && <div className={styles.options}>
<button onClick={homepage}>{constants.HISTORY}</button>
<button  onClick={payloadpage} >{constants.PAYLOADS}</button>
</div>} */}

    </div>
  );
};

export default Navigation;
