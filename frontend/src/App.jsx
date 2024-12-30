import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector } from 'react-redux';
import TaskList from './components/Tasks/TaskList';
import TaskForm from './components/Tasks/TaskForm';
import TaskFilters from './components/Tasks/TaskFilters';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import { Container, Typography, CssBaseline, Box, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function AppContent() {
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1
  });

  const { user } = useSelector(state => state.auth);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key !== 'page' ? 1 : value
    }));
  };

  if (!user) {
    return showRegister ? (
      <RegisterForm onToggleForm={() => setShowRegister(false)} />
    ) : (
      <LoginForm onToggleForm={() => setShowRegister(true)} />
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Task Manager
        </Typography>
        <TaskForm taskToEdit={taskToEdit} onCancelEdit={() => setTaskToEdit(null)} />
        <TaskFilters filters={filters} onFilterChange={handleFilterChange} />
        <TaskList
          onEditTask={setTaskToEdit}
          filters={filters}
          onPageChange={(page) => handleFilterChange('page', page)}
        />
      </Box>
    </Container>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;