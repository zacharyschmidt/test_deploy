import React, { useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IStore } from '../../types';
import { setLimitAction } from '../../redux/actions/eia/actions';
import {
 
 
  FormGroup,
  FormControl,
  InputLabel,
  FormHelperText,
  Input, 
  MenuItem,
  Select,

} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);


export default function RecordsPerPage(): JSX.Element {
  
  const state = useSelector((state: IStore) => state.eia);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <div>
      <div className="d-flex align-items-center justify-content-end">
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">
            Records Per Page
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={state.limit}
            onChange={(e: any) =>
              setLimitAction(dispatch, parseInt(e.target.value))
            }
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

