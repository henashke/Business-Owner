import {useState} from 'react';
import {Box} from '@mui/material';
import {useStore} from '../context/StoreContext';
import CustomerCard from './CustomerCard';
import {DeleteConfirmDialog} from './DeleteConfirmDialog';
import {CustomerDTO} from "../services/customerApi.ts";

interface FullCustomerListProps {
    customers: CustomerDTO[];
    onEditClick?: (id: number) => void;
}

export const FullCustomerList = ({
                                     customers,
                                     onEditClick,
                                 }: FullCustomerListProps) => {
    const {customerStore} = useStore();
    const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDeleteConfirm = async () => {
        if (deleteConfirmId !== null) {
            setDeletingId(deleteConfirmId);
            try {
                await customerStore.deleteCustomer(deleteConfirmId);
                setDeleteConfirmId(null);
            } finally {
                setDeletingId(null);
            }
        }
    };

    const handleCardDelete = (id: number) => {
        setDeleteConfirmId(id);
    };

    const handleCardEdit = (id: number) => {
        onEditClick?.(id);
    };

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                {customers.map((customer) => (
                    <>
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                        <CustomerCard
                            key={customer.id}
                            id={customer.id ?? -1}
                            firstName={customer.firstName}
                            lastName={customer.lastName}
                            phoneNumber={customer.phoneNumber}
                            active={customer.active}
                            onEdit={handleCardEdit}
                            onDelete={handleCardDelete}
                        />
                    </>
                ))}
            </Box>

            <DeleteConfirmDialog
                open={deleteConfirmId !== null}
                onClose={() => setDeleteConfirmId(null)}
                onConfirm={handleDeleteConfirm}
                deleting={deletingId !== null}
            />
        </>
    );
};