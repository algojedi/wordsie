import React, { useContext } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import axios from 'axios'
import api from '../../api/api'
import CartContext from '../../contexts/cartContext'

const useStyles = makeStyles({
    trashBtn: {
        border: 'none'
    },
    listTitle: {
        padding: 24, // the padding applied to expansion panels by default
        paddingBottom: 12,
        color: '#a3613d'
    }
})

export default function AlertDialog() {
    const [open, setOpen] = React.useState(false)
    const context = useContext(CartContext)
    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDeleteList = async () => {
        const url = `${api.url}cart`
        try {
            const result = await axios.delete(url)
            if (result.data && result.status === 200) {
                context.setCart([])
                console.log('cart items deleted')
            }
        } catch (err) {
            console.log('error trying to empty cart', err.message)
            // TODO: display error message in ui, probably in a invalid token    
        }
        setOpen(false)
    }

    return (
        <React.Fragment>
            <Button className={classes.trashBtn} onClick={handleClickOpen}>
                <DeleteOutlinedIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>
                    {'Delete Entire Word List'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        You are about to delete your entire list of words. This
                        action can not be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteList}
                        color='primary'
                        autoFocus
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}
