import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Theme } from '@material-ui/core';
import TodosTable from '../containers/TodosTable';
import AddButton from '../components/add-button/AddButton';
import githubForkRibbon from '../assets/github-corner-right.svg';
import { IStore } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import * as todoActions from '../redux/actions/todo/actions';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    whiteSpace: 'nowrap'
  },
  form: {
    width: '100%',
    height: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column'
  },
  formWrapper: {
    marginBottom: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  demoWrapper: {
    height: 'calc(100vh - 80px)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.rem',
    fontWeight: 'bold',
    paddingTop: '80px'
  },
  todoListWrapper: {
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: ' 90%'
    }
  },

  userLabel: {
    height: '100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    fontSize: '2rem'
  }
}));

const header = [
  { id: 'todo', label: 'Todo', minWidth: 320 },
  { id: 'createdOn', label: 'Created On', minWidth: 150 },
  { id: 'completed', label: 'Completed', minWidth: 100 }
];

const Demo = () => {
  const [newTodo, setNewTodo] = useState<string>('');

  const classes = useStyles();

  const dispatch = useDispatch();
  const todoState = useSelector((state: IStore) => state.todo);
  const authState = useSelector((state: IStore) => state.auth);

  useEffect(() => {
    dispatch(todoActions.getAllTodos());
    return () => {
      dispatch(todoActions.resetTodos());
    };
  }, [authState.isFakeData, authState.isLoggedIn]);

  const onDeleteTodo = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    return (todoId: string) => {
      dispatch(todoActions.deleteTodo(todoId));
    };
  };

  const onAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      dispatch(todoActions.addTodo(newTodo));
      setNewTodo('');
    }
  };

  const onCompleteTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    return (checked: boolean) => {
      return (id: string) => {
        dispatch(todoActions.completeTodo(id, checked));
      };
    };
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const content = e.target.value;
    setNewTodo(content);
  };

  return (
    <>
      <div className={classes.demoWrapper}>
        <div className={classes.todoListWrapper}>
          <div className={classes.userLabel}>
            {`Hi, ${authState.currentUser?.email || 'Stranger'}`}
          </div>
          <div className={classes.title}>Your Todo List</div>
          <div className={classes.formWrapper}>
            <form className={classes.form} onSubmit={onAddTodo}>
              <TextField
                variant="outlined"
                style={{ marginBottom: '1rem' }}
                value={newTodo}
                onChange={onChange}
              />
              <AddButton />
            </form>
          </div>

          <TodosTable
            isLoading={todoState.isLoading}
            /**
             *
             */
            header={header}
            /**
             *
             */
            data={todoState.todos}
            /**
             *
             */
            stickyHeader={true}
            /**
             *
             */
            placeHolder="Nothing to do"
            /**
             *
             */
            headerStyle={{
              background: 'rgba(0,0,0,0.8)'
            }}
            /**
             *
             */
            rowStyle={{ color: 'black', fontSize: '1.5rem' }}
            /**
             *
             */
            onDeleteTodo={(e, todoId) => onDeleteTodo(e)(todoId)}
            /**
             *
             */
            onCompleteTodo={(e, checked, todoId) =>
              onCompleteTodo(e)(checked)(todoId)
            }
          />
        </div>
      </div>
    </>
  );
};

export default Demo;
