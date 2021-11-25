import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);

useEffect(() => {
    fetchCustomers();
}, []);

const fetchCustomers = () => {
    fetch('https://customerrest.herokuapp.com/api/customers')
    .then(res => res.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
}

const columns = [
    { field: 'firstname', headerName: 'First Name', sortable: true, filter: true, width: 200 },
    { field: 'lastname', headerName: 'Last Name', sortable: true, filter: true, width: 200 },
    { field: 'streetaddress', headerName: 'Street Address', sortable: true, filter: true, width: 200 },
    { field: 'postcode', headerName: 'Post Code', sortable: true, filter: true, width: 200 },
    { field: 'city', headerName: 'City', sortable: true, filter: true, width: 200 },
    { field: 'email', headerName: 'Email', sortable: true, filter: true, width: 200 },
    { field: 'phone', headerName: 'Phone', sortable: true, filter: true, width: 200 },
]

    return (
        <div style={{ marginTop: 80 }}>
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
        </div>
    )
}

export default ListCustomers
