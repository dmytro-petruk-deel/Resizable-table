import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { node, func, number } from 'prop-types';
import { Rnd } from 'react-rnd';

import styles from './ResizableFrame.module.scss';

const cx = classNames.bind(styles);

const ResizableFrame = ({ children, setPagesAmount, pageHeight }) => {
  const [minWidth, setMinWidth] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  let resizableRef = useRef();
  let childRef = useRef();

  const setMinSizes = (parentRef, childRef) => {
    const { offsetWidth: parentWidth, offsetHeight: parentHeight } = parentRef || {};
    const { offsetWidth: childWidth, offsetHeight: childHeight } = childRef?.current || {};

    if (parentWidth < childWidth) {
      setMinWidth(childWidth);
    }

    if (parentHeight < childHeight) {
      setMinHeight(childHeight);
    }
  };

  const handleResize = (e, direction, ref) => {
    const { offsetHeight: contentHeight } = ref || {};
    const pages = Math.ceil(contentHeight / pageHeight);
    
    setPagesAmount(pages);
    setMinSizes(ref, childRef);
  };

  return (
    <Rnd
      ref={resizableRef}
      onResize={handleResize}
      className={cx('resizable')}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="#page-frame"
    >
      <div ref={childRef} className={cx('content')}>
        {children}
      </div>
    </Rnd>
  );
};

ResizableFrame.propTypes = {
  setPagesAmount: func.isRequired,
  pageHeight: number.isRequired,
  children: node.isRequired,
};

export default ResizableFrame;
