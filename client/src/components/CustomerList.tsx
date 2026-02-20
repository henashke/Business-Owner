import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';

export const CustomerList = observer(() => {
  const { customerStore } = useStore();
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await customerStore.deleteCustomer(id);
      setDeleteConfirmId(null);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <TableContainer
        sx={{
          backgroundColor: 'white',
          borderRadius: 1,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#34495e' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>שם פרטי</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>שם משפחה</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>אימייל</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>טלפון</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>סטטוס</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                פעולות
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customerStore.customers.map((customer) => (
              <TableRow
                key={customer.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                  },
                  opacity: customer.active ? 1 : 0.7,
                }}
              >
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email || '-'}</TableCell>
                <TableCell>{customer.phoneNumber || '-'}</TableCell>
                <TableCell>
                  <Chip
                    label={customer.active ? 'פעיל' : 'לא פעיל'}
                    color={customer.active ? 'success' : 'default'}
                    size="small"
                    sx={{
                      backgroundColor: customer.active ? '#27ae60' : '#95a5a6',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  />
                </TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <IconButton
                      size="small"
                      onClick={() => customerStore.openForm(customer)}
                      sx={{
                        color: '#3498db',
                        '&:hover': {
                          backgroundColor: '#e3f2fd',
                        },
                      }}
                      title="ערוך לקוח"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => setDeleteConfirmId(customer.id!)}
                      sx={{
                        color: '#e74c3c',
                        '&:hover': {
                          backgroundColor: '#ffebee',
                        },
                      }}
                      title="מחק לקוח"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmId !== null} onClose={() => setDeleteConfirmId(null)}>
        <DialogTitle>אישור מחיקה</DialogTitle>
        <DialogContent>
          האם אתה בטוח שברצונך למחוק לקוח זה? לא ניתן לבטל פעולה זו.
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            onClick={() => setDeleteConfirmId(null)}
            disabled={deletingId !== null}
            sx={{ color: '#7f8c8d' }}
          >
            בטל
          </Button>
          <Button
            onClick={() => deleteConfirmId && handleDelete(deleteConfirmId)}
            variant="contained"
            disabled={deletingId !== null}
            sx={{
              backgroundColor: '#e74c3c',
              '&:hover': {
                backgroundColor: '#c0392b',
              },
            }}
          >
            {deletingId !== null ? 'מוחק...' : 'מחק'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default CustomerList;

