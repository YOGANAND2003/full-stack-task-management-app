import React from 'react';
import { Pagination, Box } from '@mui/material';

function TaskPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(e, page) => onPageChange(page)}
        color="primary"
      />
    </Box>
  );
}

export default TaskPagination