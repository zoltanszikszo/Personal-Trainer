import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import dayjs from 'dayjs'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const ListTrainings = () => {
    const [trainings, setTrainings] = useState([]);

useEffect(() => {
    fetchTrainings();
}, []);

const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(res => res.json())
    .then(data => setTrainings(data.content))
    .catch(err => console.error(err))
}

const columns = [
    { field: 'date', sortable: true, filter: true,
        cellRenderer: (data) => {
            return data.value ? dayjs(data.value).format('MM/DD/YYYY HH:mm') : "No date";
        }
    },
    { field: 'duration', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
]

    return (
        <div style= {{ marginTop: 80 }}>
            <div className="ag-theme-material" style={{ height: 800, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={trainings}
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

export default ListTrainings
