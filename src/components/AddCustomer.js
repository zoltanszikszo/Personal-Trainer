import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const AddCustomer = (props) => {
  const [open, setOpen] = useState(false)
  const [customer, setCustomer] = useState({
    firstname: '',
    lastname: '',
    streetaddress: '',
    postcode: '',
    city: '',
    email: '',
    phone: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = event => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    props.addCustomer(customer)
    handleClose()
    setCustomer({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: '',
    })
  }

  return (
    <div>
      <Button size='small' onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Customer</DialogTitle>
        <DialogContent>
          <TextField
            margin='dense'
            name='firstname'
            value={customer.firstname}
            onChange={handleInputChange}
            label='firstname'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            name='lastname'
            value={customer.lastname}
            onChange={handleInputChange}
            label='lastname'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            name='streetaddress'
            value={customer.streetaddress}
            onChange={handleInputChange}
            label='streetaddress'
            fullWidth
            variant='standard'
          />
          <TextField
            margin='dense'
            name='postcode'
            value={customer.postcode}
            onChange={handleInputChange}
            label='postcode'
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='city'
            value={customer.city}
            onChange={handleInputChange}
            label="city"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='email'
            value={customer.email}
            onChange={handleInputChange}
            label="email"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            name='phone'
            value={customer.phone}
            onChange={handleInputChange}
            label="phone"
            fullWidth
            variant="standard"
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

export default AddCustomer