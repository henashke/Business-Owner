import {useEffect, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {
    Box,
    Chip,
    Fab,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useStore} from '../context/StoreContext';
import {DeleteConfirmDialog} from './DeleteConfirmDialog';
import {CustomerFormDialog} from './CustomerFormDialog';
import {useThemeMode} from "../context/ThemeContext.tsx";

export const CustomerList = observer(() => {
    const {customerStore} = useStore();
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const theme = useThemeMode();

    useEffect(() => {
        customerStore.fetchCustomers();
    }, []);

    const handleDelete = async (id: number) => {
        setDeletingId(id);
        try {
            await customerStore.deleteCustomer(id);
            setDeleteConfirmId(null);
        } finally {
            setDeletingId(null);
        }
    };

    const handleSave = async (customer: any) => {
        if (customerStore.editingCustomer?.id) {
            await customerStore.updateCustomer(customerStore.editingCustomer.id, customer);
        } else {
            await customerStore.createCustomer(customer);
        }
    };

    console.log(customerStore.customers.map((customer) => customer.firstName));
    return (
        <>
            <Box sx={{mb: 2, display: 'flex', justifyContent: 'flex-start'}}>
                <Fab
                    size={"small"}
                    color={"primary"}
                    onClick={() => customerStore.openForm()}
                >
                    <AddIcon/>
                </Fab>
            </Box>

            <TableContainer
                sx={{
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow sx={{backgroundColor: '#34495e'}}>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'}}>שם פרטי</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'}}>שם משפחה</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'}}>אימייל</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'}}>טלפון</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold'}}>סטטוס</TableCell>
                            <TableCell sx={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                                פעולות
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customerStore.customers.map((customer) => (
                            <TableRow sx={{backgroundColor: theme.mode === "dark" ? '#253242' : "white"}}
                                      key={customer.id}>
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
                                <TableCell sx={{textAlign: 'center'}}>
                                    <Box sx={{display: 'flex', gap: 1, justifyContent: 'center'}}>
                                        <IconButton
                                            size="small"
                                            onClick={() => customerStore.openForm(customer)}
                                            color={"primary"}
                                            title="ערוך לקוח"
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => setDeleteConfirmId(customer.id!)}
                                            color={"error"}
                                            title="מחק לקוח"
                                        >
                                            <DeleteIcon fontSize="small"/>
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <DeleteConfirmDialog
                open={deleteConfirmId !== null}
                onClose={() => setDeleteConfirmId(null)}
                onConfirm={() => deleteConfirmId && handleDelete(deleteConfirmId)}
                deleting={deletingId !== null}
            />

            <CustomerFormDialog
                open={customerStore.showForm}
                onClose={() => customerStore.closeForm()}
                onSave={handleSave}
                customer={customerStore.editingCustomer}
            />
        </>
    );
});

export default CustomerList;

