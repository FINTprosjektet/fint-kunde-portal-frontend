import React from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const LegalContactConfirmationDialog = (props) => {
    const {openLegalDialog, handleLegalDialogClose, contact, setLegalContact} = props;

    return (
        <div>
            <Dialog
                open={openLegalDialog}
                onClose={handleLegalDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Endre juridisk kontaktperson?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Du endrer nå juridisk kontaktperson til {contact.firstName + " " + contact.lastName}. Ønsker du dette?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLegalDialogClose} color="primary">
                        Nei
                    </Button>
                    <Button onClick={() => setLegalContact(contact)} color="primary" autoFocus>
                        Ja
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default LegalContactConfirmationDialog;