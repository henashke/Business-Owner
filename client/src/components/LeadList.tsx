import { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/StoreContext';
import SearchBar from './SearchBar';
import FloatingActionButton from './FloatingActionButton';
import { LeadFormDialog } from './LeadFormDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { LeadDTO, LeadStatus } from '../services/leadApi';
import LeadStatusBadge from './LeadStatusBadge';
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
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const LeadList = observer(() => {
    const { leadStore } = useStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingLead, setEditingLead] = useState<LeadDTO | null>(null);

    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        if (leadStore.statusFilter === 'ALL') {
            leadStore.fetchLeads();
        } else {
            leadStore.fetchByStatus(leadStore.statusFilter);
        }
    }, [leadStore.statusFilter]);

    const filteredLeads = useMemo(() => {
        if (!searchQuery.trim()) {
            return leadStore.leads;
        }

        const query = searchQuery.toLowerCase();
        return leadStore.leads.filter(
            (lead) =>
                lead.name.toLowerCase().includes(query) ||
                lead.contactInfo.toLowerCase().includes(query) ||
                (lead.treatmentTypeName && lead.treatmentTypeName.toLowerCase().includes(query))
        );
    }, [leadStore.leads, searchQuery]);

    // Sort: overdue first, then by followUpDate, then normal
    const sortedLeads = useMemo(() => {
        return [...filteredLeads].sort((a, b) => {
            const today = new Date().toISOString().split('T')[0];

            const aOverdue = a.followUpDate && a.followUpDate < today && a.status !== 'SUCCESSFULLY_BOOKED' && a.status !== 'CANCELED' && a.status !== 'NOT_RELEVANT';
            const bOverdue = b.followUpDate && b.followUpDate < today && b.status !== 'SUCCESSFULLY_BOOKED' && b.status !== 'CANCELED' && b.status !== 'NOT_RELEVANT';

            if (aOverdue && !bOverdue) return -1;
            if (!aOverdue && bOverdue) return 1;

            if (a.followUpDate && !b.followUpDate) return -1;
            if (!a.followUpDate && b.followUpDate) return 1;

            if (a.followUpDate && b.followUpDate) {
                return a.followUpDate.localeCompare(b.followUpDate);
            }

            return 0;
        });
    }, [filteredLeads]);

    const handleOpenForm = (lead?: LeadDTO) => {
        setEditingLead(lead || null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingLead(null);
    };

    const handleSave = async (leadData: Omit<LeadDTO, 'id'>) => {
        if (editingLead?.id) {
            await leadStore.updateLead(editingLead.id, leadData as LeadDTO);
        } else {
            await leadStore.createLead(leadData);
        }
        handleCloseForm();
    };

    const handleDeleteConfirm = async () => {
        if (deleteConfirmId !== null) {
            setDeletingId(deleteConfirmId);
            try {
                await leadStore.deleteLead(deleteConfirmId);
                setDeleteConfirmId(null);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleMarkAsBooked = async (lead: LeadDTO) => {
        if (lead.id) {
            await leadStore.updateLead(lead.id, { ...lead, status: 'SUCCESSFULLY_BOOKED' });
        }
    };

    const handleStatusFilterChange = (
        _: React.MouseEvent<HTMLElement>,
        nextStatus: LeadStatus | 'ALL' | null
    ) => {
        if (nextStatus) {
            leadStore.setStatusFilter(nextStatus);
        }
    };

    const isOverdue = (date?: string | null, status?: LeadStatus) => {
        if (!date) return false;
        if (status === 'SUCCESSFULLY_BOOKED' || status === 'CANCELED' || status === 'NOT_RELEVANT') return false;

        const today = new Date().toISOString().split('T')[0];
        return date < today;
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, paddingX: 2, paddingBottom: 2 }}>
            <ToggleButtonGroup
                value={leadStore.statusFilter}
                exclusive
                onChange={handleStatusFilterChange}
                size="small"
                sx={{ direction: 'ltr', display: 'flex', flexWrap: 'wrap' }}
            >
                <ToggleButton value="ALL">הכל</ToggleButton>
                <ToggleButton value="HOT">חם</ToggleButton>
                <ToggleButton value="COLD">קר</ToggleButton>
                <ToggleButton value="WAITING_FOR_DEPOSIT">ממתין</ToggleButton>
            </ToggleButtonGroup>

            <SearchBar value={searchQuery} onChange={setSearchQuery} />

            <TableContainer component={Paper} sx={{ flex: 1, overflow: 'auto' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>שם</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>טיפול</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ת. עניין ראשוני</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>יצירת קשר</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>סטטוס</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>ת. מעקב</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', minWidth: '140px' }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedLeads.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        לא נמצאו לידים חופפים לחיפוש/סינון.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            sortedLeads.map((lead) => {
                                const overdue = isOverdue(lead.followUpDate, lead.status);
                                return (
                                    <TableRow
                                        key={lead.id}
                                        sx={{
                                            backgroundColor: overdue ? 'rgba(231, 76, 60, 0.08)' : 'inherit',
                                            '&:hover': {
                                                backgroundColor: overdue ? 'rgba(231, 76, 60, 0.15)' : 'rgba(0, 0, 0, 0.04)',
                                            },
                                        }}
                                    >
                                        <TableCell>{lead.name}</TableCell>
                                        <TableCell>{lead.treatmentTypeName}</TableCell>
                                        <TableCell>{lead.initialInterestDate}</TableCell>
                                        <TableCell>{lead.contactInfo}</TableCell>
                                        <TableCell>
                                            <LeadStatusBadge status={lead.status} />
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                color: overdue ? '#c0392b' : 'inherit',
                                                fontWeight: overdue ? 'bold' : 'normal',
                                            }}
                                        >
                                            {lead.followUpDate || '-'}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Tooltip title="ערוך">
                                                <IconButton size="small" onClick={() => handleOpenForm(lead)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="מחק">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => setDeleteConfirmId(lead.id || null)}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            {lead.status !== 'SUCCESSFULLY_BOOKED' && (
                                                <Tooltip title="סמן כנקבעה פגישה">
                                                    <IconButton
                                                        size="small"
                                                        color="success"
                                                        onClick={() => handleMarkAsBooked(lead)}
                                                    >
                                                        <CheckCircleIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <FloatingActionButton onClick={() => handleOpenForm()} />

            <LeadFormDialog
                open={showForm}
                onClose={handleCloseForm}
                onSave={handleSave}
                lead={editingLead}
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

export default LeadList;
