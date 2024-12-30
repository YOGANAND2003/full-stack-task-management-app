import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../../store/taskSlice';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
  Paper,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TaskList({ onEditTask }) {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  const status = useSelector(state => state.tasks.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleToggleStatus = (task) => {
    dispatch(updateTask({
      id: task._id,
      task: { ...task, status: !task.status }
    }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  if (status === 'loading') {
    return <Typography>Loading tasks...</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ mt: 2, p: 2 }}>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task._id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => onEditTask(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(task._id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <Checkbox
              checked={task.status}
              onChange={() => handleToggleStatus(task)}
            />
            <ListItemText
              primary={task.title}
              secondary={task.description}
              sx={{
                textDecoration: task.status ? 'line-through' : 'none'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default TaskList