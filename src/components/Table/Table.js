import classNames from 'classnames/bind';
import { string } from 'prop-types';

import styles from './Table.module.scss';

const cx = classNames.bind(styles);

const Table = ({ className }) => {
  return (
    <div className={cx('root', className)}>
      <table>
        <tr>
          <td>3124567</td>
          <td>31245678</td>
          <td>312456</td>
          <td>312456</td>
          <td>312456</td>
        </tr>
      </table>
    </div>
  );
};

Table.propTypes = {
  className: string,
};

Table.defaultProps = {
  className: null,
};

export default Table;
