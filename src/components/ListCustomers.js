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
    { field: 'firstname', sortable: true, filter: true },
    { field: 'lastname', sortable: true, filter: true },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true },
    { field: 'city', sortable: true, filter: true },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
]

    return (
        <div style={{marginTop: 20}}>
            <div className="ag-theme-material" style={{ marginTop: 20, height: 600, width: '90%', margin: 'auto' }}>
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
