import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import XLSX from 'xlsx';

import ResizableFrame from 'components/ResizableFrame';

import styles from './App.module.scss';

const cx = classNames.bind(styles);

function App() {
  const [tableHTML, setTableHTML] = useState('');
  const [pagesAmount, setPagesAmount] = useState(1);
  const [pageHeight, setPageHeight] = useState(100);
  let pageRef = useRef();

  const handleChange = (oEvent) => {
    var file = oEvent.target.files[0];
    var reader = new FileReader();

    reader.onload = function (e) {
      var data = e.target.result;
      var workbook = XLSX.read(data, {
        type: 'binary',
        cellStyles: true,
      });

      workbook.SheetNames.forEach(function (sheetName) {
        var HTML_row_object = XLSX.utils.sheet_to_html(workbook.Sheets[sheetName]);
        var trimmedHTML = HTML_row_object.replace(/<head[^>]*>([^]*)<\/head>/, '').replace(
          /<body>|<\/body>|<html>|<\/html>/gi,
          ''
        );

        setTableHTML(trimmedHTML);
      });
    };

    reader.onerror = function (err) {
      console.error(err);
    };

    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    setPageHeight(pageRef.current?.offsetHeight || 1);
  }, []);

  return (
    <div className={cx('root')}>
      <form>
        <label htmlFor="formFileSm" className={cx('form-label')}>
          Select XML file
        </label>
        <input className={cx('form-control')} id="formFileSm" type="file" onChange={handleChange} />
      </form>

      <div className={cx('page-frame')} id="page-frame" ref={pageRef}>
        <ResizableFrame setPagesAmount={setPagesAmount} pageHeight={pageHeight}>
          <div className={cx('frame-content')} dangerouslySetInnerHTML={{ __html: tableHTML }} />
        </ResizableFrame>

        {[...Array(pagesAmount)].map((e) => (
          <div className={cx('page-element')} />
        ))}
      </div>
    </div>
  );
}

export default App;
