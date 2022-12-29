import { useNavigate } from 'react-router-dom';
import constants from '../../data/constants';
import styles from './Navigation.module.css'


const Navigation = () => {
  const navigate = useNavigate();

  const homepage = (e) => {
    navigate(constants.HOME_PAGE);
  };
  const payloadpage = (e) => {
    navigate(constants.PAYLOAD_PAGE);
  };

  return (
    <div className={styles.navbar}>
<div className={styles.logo}>{constants.SPACEX}</div>
<div className={styles.options}>
<button onClick={homepage}>{constants.HISTORY}</button>
<button  onClick={payloadpage} >{constants.PAYLOADS}</button>
</div>
    </div>
  );
};

export default Navigation;
