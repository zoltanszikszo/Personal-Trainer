import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import EditCustomer from './EditCustomer'
import AddCustomer from './AddCustomer'

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState([]);
    const [msg, setMsg] = useState([]);

useEffect(() => {
    fetchCustomers();
}, []);

const handleClose = () => {
    setOpen(false);
}

const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(res => res.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const addCustomer = customer => {
    fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(customer)
      })
        .then(response => {
          if (response.ok) {
            setMsg('Customer added')
            setOpen(true)
            fetchCustomers()
          } else {
            alert('Error')
          }
        })
        .catch(error => console.error(error))
}

const editCustomer = customer => {
    fetch('https://customerrest.herokuapp.com/api/customers/{id}', {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (response.ok){
            setMsg('Customer edited');
            setOpen(true);
            fetchCustomers();
        } else {
        alert('Error');
        }
    })
    .catch(error => console.error(error));
}

const deleteCustomer = () => {
    if (window.confirm('Confirm delete?')) {
      fetch('https://customerrest.herokuapp.com/api/customers/{id}', { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            setMsg('Customer deleted')
            setOpen(true)
            fetchCustomers()
          } else {
            alert('Error')
          }
        })
        .catch(error => console.error(error))
    }
  }

const columns = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 200 },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 200 },
    { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, width: 200 },
    { field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 200 },
    { field: 'city', headerName: 'City', sortable: true, filter: true, width: 200 },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, width: 200 },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true, width: 200 },
    {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: '_links.self.href',
        cellRendererFramework: (params) => <EditCustomer row={params} editCustomer={editCustomer} />
      },
      {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: '_links.self.href',
        cellRendererFramework: (params) => (
          <Button
            color='error'
            onClick={() => deleteCustomer(params.value)}>Delete</Button>
        )
    },
]

    return (
        <div style={{ marginTop: 80 }}>
            <AddCustomer addCustomer={addCustomer} stlye={{ marginTop: 20, marginBottom: 20 }} />
            <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                suppressCellSelection={true}
            >
            </AgGridReact>
            </div>
            <Snackbar
            open={open}
            message={msg}
            autoHideDuration={4000}
            onClose={handleClose}
            />
        </div>
    )
}

export default ListCustomers
