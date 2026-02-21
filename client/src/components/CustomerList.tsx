import {useEffect, useMemo, useState} from 'react';
import {observer} from 'mobx-react-lite';
import {useStore} from '../context/StoreContext';
import SearchBar from './SearchBar';
import FloatingActionButton from './FloatingActionButton';
import {EmptyCustomerList} from './EmptyCustomerList';
import {FullCustomerList} from './FullCustomerList';
import {CustomerFormDialog} from './CustomerFormDialog';
import {CustomerDTO} from '../services/customerApi';
import {Box, Paper} from "@mui/material";

export const CustomerList = observer(() => {
    const {customerStore} = useStore();

    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState<CustomerDTO | null>(null);

    useEffect(() => {
        customerStore.fetchCustomers();
    }, []);

    const filteredCustomers = useMemo(() => {
        if (!searchQuery.trim()) {
            return customerStore.customers;
        }

        const query = searchQuery.toLowerCase();
        return customerStore.customers.filter(
            (customer) =>
                customer.firstName.toLowerCase().includes(query) ||
                customer.lastName.toLowerCase().includes(query) ||
                (customer.phoneNumber && customer.phoneNumber.includes(query))
        );
    }, [customerStore.customers, searchQuery]);

    const handleOpenForm = (customer?: CustomerDTO) => {
        setEditingCustomer(customer || null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingCustomer(null);
    };

    const handleSave = async (customer: any) => {
        if (editingCustomer?.id) {
            await customerStore.updateCustomer(editingCustomer.id, customer);
        } else {
            await customerStore.createCustomer(customer);
        }
        handleCloseForm();
    };

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            overflow: "scroll",
            paddingX: 2,
            paddingBottom: 2
        }}>
            <SearchBar value={searchQuery} onChange={setSearchQuery}/>

            <Paper sx={{
                display: 'flex',
                padding: 2,
                flexDirection: 'column',
                gap: 1,
                overflow: 'scroll',
                flex: 1
            }}>
                {customerStore.customers.length === 0 ?
                    <EmptyCustomerList searchQuery={searchQuery} onAddClick={() => handleOpenForm()}/>
                    :
                    <FullCustomerList
                        customers={filteredCustomers}
                        onEditClick={(id) => {
                            const customer = customerStore.customers.find((c) => c.id === id);
                            handleOpenForm(customer);
                        }}
                    />
                }
            </Paper>

            <FloatingActionButton onClick={() => handleOpenForm()}/>

            <CustomerFormDialog
                open={showForm}
                onClose={handleCloseForm}
                onSave={handleSave}
                customer={editingCustomer}
            />
        </Box>
    );
});

export default CustomerList;

