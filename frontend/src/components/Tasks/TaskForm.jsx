import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../../store/taskSlice';
import {
  TextField,
  Button,
  Box,
  Paper
} from '@mui/material';

function TaskForm({ taskToEdit, onCancelEdit }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || ''
      });
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (taskToEdit) {
      dispatch(updateTask({
        id: taskToEdit._id,
        task: { ...taskToEdit, ...formData }
      }));
      onCancelEdit();
    } else {
      dispatch(addTask(formData));
    }

    setFormData({ title: '', description: '' });
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          multiline
          rows={2}
          margin="normal"
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" sx={{ mr: 1 }}>
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </Button>
          {taskToEdit && (
            <Button onClick={onCancelEdit} variant="outlined">
              Cancel
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

export default TaskForm