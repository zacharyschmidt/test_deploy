import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import SeriesList from '../SeriesList';
import { toggleRowAction, fetchCategoriesAction } from '../redux/actions/eia/actions';
import { IStore } from '../types';




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CatRowContainer(props: any) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state: IStore) => state.eia)

  let row_ids: Array<number> = []
  for (const [key, value] of Object.entries(state.rowCards)) {
    row_ids = row_ids.concat(Number(key))
  }

  return (
    <div className={classes.root}>
        
                    {row_ids.map((id: any) => {
                    
                      return (
                      <Accordion expanded={state.rowCards[id].isOpen ? true : false} onChange={() => {
                          // make a new action, if state.isOpen is false, 
                          // do fetch cat action
                          if(!state.rowCards[id].isOpen) {
                              fetchCategoriesAction(
                                dispatch,
                                state.searchTerm,
                                id,
                                state.filters,
                                1,
                                5
                            )}
                          toggleRowAction(id, dispatch)
                          
                          }
                      }
                      key={id}
                      title={state.rowCards[id].name}
                     
                      >
                          
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{state.rowCards[id].name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'span'}>
             {state.treeLoading ? 'Loading'
              : <SeriesList
                        
                        categories={state.rowCards[id].categories}
                        toggleSelectAction={props.toggleSelectAction}
                        selected={props.selected}
                        name={state.rowCards[id].name}
                        id={id} /> }
          </Typography>
        </AccordionDetails>
      </Accordion>)}).sort((a: any, b: any) => {
                      if (a.props.title > b.props.title) {
                        return 1
                      }
                      return -1
                    })
                }
                </div> 
  );
}