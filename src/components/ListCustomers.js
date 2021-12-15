import React, { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import { AgGridReact } from 'ag-grid-react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import EditCustomer from './EditCustomer'
import AddCustomer from './AddCustomer'
import AddTraining from './AddTraining'

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

const addTraining = training => {
  fetch('https://customerrest.herokuapp.com/api/trainings', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(training)
  })
    .then(res => {
      if(res.ok) {
        setMsg('Training added')
        setOpen(true)
      } else {
        alert('Error')
      }
    })  
    .catch(error => console.error(error))
}

const editCustomer = (url, updateCustomer) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(updateCustomer)
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

const deleteCustomer = (url) => {
    if (window.confirm('Confirm delete?')) {
      fetch(url, { method: 'DELETE' })
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
      width: 200,
      field: 'links',
      cellRendererFramework: (params) => <AddTraining row={params} addTraining={addTraining} />
    },
    {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: 'links',
        cellRendererFramework: (params) => <EditCustomer row={params} editCustomer={editCustomer} />
      },
      {
        headerName: '',
        sortable: false,
        filter: false,
        width: 120,
        field: 'links',
        cellRendererFramework: (params) => (
          <Button
            color='error'
            variant='contained'
            size='medium'
            onClick={() => deleteCustomer(params.data.links[0].href)}>Delete</Button>
        )
    },
]

    const headers = columns.map(column => column.field)
    headers.splice(7, 9)

    return (
        <div style={{ marginTop: 80 }}>
            <AddCustomer addCustomer={addCustomer} stlye={{ marginTop: 20, marginBottom: 20 }} />
            <Button variant="contained" size="medium" >
              <CSVLink data={customers} filename="customerlist" headers={headers} style={{ textDecoration: 'none', color: '#FFFFFF' }}>
                Download Customers
              </CSVLink>
            </Button>
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
