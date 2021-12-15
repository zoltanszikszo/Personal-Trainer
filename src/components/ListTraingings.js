import React, { useState, useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'
import dayjs from 'dayjs'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Button } from '@mui/material'
import Snackbar from '@mui/material/Snackbar'

const ListTrainings = () => {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState([]);
    const [msg, setMsg] = useState([]);

useEffect(() => {
    fetchTrainings();
}, []);

const fetchTrainings = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(res => res.json())
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
}

const deleteTraining = (id) => {
    if(window.confirm('Confirm delete?')) {
        fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
        .then(res => {
            if(res.ok){
                setMsg('Training deleted')
                setOpen(true)
                fetchTrainings()
            } else {
                alert('Error')
            }
        })
        .catch(err => console.error(err))
    }
}

const handleClose = () => {
    setOpen(false);
}

const columns = [
    { field: 'date', headerName: 'Date', sortable: true, filter: true,
        cellRenderer: (data) => {
            return data.value ? dayjs(data.value).format('MM/DD/YYYY HH:mm') : "No date";
        }
    },
    { field: 'duration', headerName: 'Duration (Mins)', sortable: true, filter: true },
    { field: 'activity', headerName: 'Activity', sortable: true, filter: true },
    { headerName: 'Customer', valueGetter: ({ data })  => `${data.customer.firstname} ${data.customer.lastname}`, sortable: true, filter: true },
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
            onClick={() => deleteTraining(params.data.id)}>Delete</Button>
        )
    }
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
            <Snackbar
            open={open}
            message={msg}
            autoHideDuration={4000}
            onClose={handleClose}
            />
        </div>
    )
}

export default ListTrainings
