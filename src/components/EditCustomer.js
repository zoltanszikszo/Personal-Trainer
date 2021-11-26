import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

const EditCustomer = (props) => {
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
    console.log(props.row)
    setCustomer({
      firstname: props.row.data.firstname,
      lastname: props.row.data.lastname,
      streetaddress: props.row.data.streetaddress,
      postcode: props.row.data.postcode,
      city: props.row.data.city,
      email: props.row.data.email,
      phone: props.row.data.phone,
    })
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleInputChange = event => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const handleSave = () => {
    props.editCustomer(props.row.value, customer)
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
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
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

export default EditCustomer