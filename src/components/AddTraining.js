import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const AddTraining = (props) => {
  const [open, setOpen] = useState(false)
  const [training, setTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: "",
  })

  const handleClickOpen = () => {
    setTraining({ ...training, customer: props.row.value[1].href })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = event => {
    setTraining({ ...training, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    props.addTraining(training);
    handleClose();
    };

  return (
    <div>
      <Button size='medium' variant="contained" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Training</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            name='date'
            value={training.date}
            onChange={handleInputChange}
            label='Date'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            name='duration'
            value={training.duration}
            onChange={handleInputChange}
            label='Duration (Mins)'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            name='activity'
            value={training.activity}
            onChange={handleInputChange}
            label='Activity'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddTraining