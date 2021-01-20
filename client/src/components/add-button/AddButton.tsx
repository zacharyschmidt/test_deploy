import React, { FC, CSSProperties } from 'react';
import { Button, Typography } from '@material-ui/core';
import DownloadLink from 'react-download-link';

//import testRIS from '../../..public/files/test.ris';

// move this to a new file--need to figure out type declarations for typescript
let testRIS = `TY  - DATA
DA  - 2014///
ID  - temp_id_379229159811
LB  - temp_id_379229159811
N1  - The Annual Energy Outlook (AEO) from EIA.gov provides long term foreca
 sts (25 years) of U.S. energy production, consumption, and trade for 
t he United Stated of electricity, petroleum, natural gas, coal, nucle
ar , and renewable sources.
PB  - U.S. Energy Information Administration
TI  - Annual Energy Outlook 2014
UR  - http://api.eia.gov/bulk/AEO2014.zip
ER  - `;

interface Props {
  style?: CSSProperties;
  onClick?: any; //() => void;
  text: string;
  filename: string;
  dispatch?: any;
}

const AddButton: FC<Props> = ({
  style = {},
  onClick,
  text,
  filename = '',
  dispatch
}) => {
  console.log(onClick);
  return (
    <Button
      type="submit"
      onClick={() => onClick(dispatch, text)}
      style={{
        color: 'white',
        padding: '1rem',
        fontSize: '1rem',
        fontWeight: 500,
        ...style
      }}
    >
      {/* <DownloadLink label={text} filename={filename} exportFile={() => new_workbook}>
        <Typography>Download RIS</Typography>
      </DownloadLink> */}
      {text}
    </Button>
  );
};

export default AddButton;
