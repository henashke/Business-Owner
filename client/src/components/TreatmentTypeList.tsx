import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/StoreContext';
import SearchBar from './SearchBar';
import FloatingActionButton from './FloatingActionButton';
import { TreatmentTypeFormDialog } from './TreatmentTypeFormDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { TreatmentTypeDTO } from '../services/treatmentTypeApi';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TreatmentTypeList = observer(() => {
    const { treatmentTypeStore } = useStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        treatmentTypeStore.fetchTreatmentTypes();
    }, [treatmentTypeStore]);

    const filteredTypes = useMemo(() => {
        if (!searchQuery.trim()) {
            return treatmentTypeStore.treatmentTypes;
        }
        const query = searchQuery.toLowerCase();
        return treatmentTypeStore.treatmentTypes.filter((t) =>
            t.name.toLowerCase().includes(query)
        );
    }, [treatmentTypeStore.treatmentTypes, searchQuery]);

    const handleOpenForm = (t?: TreatmentTypeDTO) => {
        treatmentTypeStore.openForm(t);
    };

    const handleCloseForm = () => {
        treatmentTypeStore.closeForm();
    };

    const handleSave = async (data: Omit<TreatmentTypeDTO, 'id'>) => {
        if (treatmentTypeStore.editingTreatmentType?.id) {
            await treatmentTypeStore.updateTreatmentType(treatmentTypeStore.editingTreatmentType.id, data as TreatmentTypeDTO);
        } else {
            await treatmentTypeStore.createTreatmentType(data);
        }
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirmId !== null) {
            setDeletingId(deleteConfirmId);
            try {
                await treatmentTypeStore.deleteTreatmentType(deleteConfirmId);
                setDeleteConfirmId(null);
            } finally {
                setDeletingId(null);
            }
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, paddingX: 2, paddingBottom: 2 }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <TableContainer component={Paper} sx={{ flex: 1, overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>שם הטיפול</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>מחיר (₪)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>משך זמן (דקות)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', width: '120px' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTypes.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        לא נמצאו סוגי טיפול.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredTypes.map((t) => (
                                <TableRow key={t.id} hover>
                                    <TableCell>{t.name}</TableCell>
                                    <TableCell>{t.price}</TableCell>
                                    <TableCell>{t.durationMinutes}</TableCell>
                                    <TableCell align="left">
                                        <Tooltip title="ערוך">
                                            <IconButton size="small" onClick={() => handleOpenForm(t)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="מחק">
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => setDeleteConfirmId(t.id || null)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <FloatingActionButton onClick={() => handleOpenForm()} />

            <TreatmentTypeFormDialog
                open={treatmentTypeStore.showForm}
                onClose={handleCloseForm}
                onSave={handleSave}
                treatmentType={treatmentTypeStore.editingTreatmentType}
            />

            <DeleteConfirmDialog
                open={deleteConfirmId !== null}
                onClose={() => setDeleteConfirmId(null)}
                onConfirm={handleDeleteConfirm}
                deleting={deletingId !== null}
            />
        </Box>
    );
});

export default TreatmentTypeList;
