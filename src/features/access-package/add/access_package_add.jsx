import React, {useContext, useState} from "react";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {Add} from "@material-ui/icons";
import PackageNameValidationInput from "../../../common/input-validation/PackageIdValidationInput";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import AccessApi from "../../../data/api/AccessApi";
import {fetchAccess} from "../../../data/redux/dispatchers/access_package";
import AppContext from "../../../data/context/AppContext";

const useStyles = makeStyles((theme) => ({
    addButton: {
        margin: 0,
        top: 100,
        left: "auto",
        bottom: "auto",
        right: 50,
        position: "fixed"
    }
}));

const AccessPackackeAdd = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [shortDescription, setShortDescription] = useState("");
    const [name, setName] = useState("");
    const packages = useSelector(state => state.access_package.accessPackages);
    const [valid, setValid] = useState(false);
    const dispatch = useDispatch();
    const context = useContext(AppContext);

    function openAddDialog() {
        setOpen(true);
    }

    function closeAddAccessPackage() {
        setOpen(false);
    }

    function updatePackageIdValid(shortDescription) {
        setShortDescription(shortDescription);
    }

    function updateName(event) {
        setName(event.target.value);
    }

    function handleCreatePackage() {
        const access = {};
        access.name = name;
        access.collection = [];
        access.read = [];
        access.modify = [];
        //TODO: Needs to get Organisation from API.
        AccessApi.setAccess(access, context.currentOrganisation.name)
            .then(response => {
                if (response.status === 201) {
                    setOpen(false);
                    dispatch(fetchAccess(context.currentOrganisation.name));
                }
            });
    }

    function packageNameIsValid(event) {
        setValid(event);
    }

    return (
        <div>
            <Fab
                color="secondary"
                className={classes.addButton}
                onClick={openAddDialog}
            >
                <Add/>
            </Fab>
            <Dialog
                open={open}
                onClose={closeAddAccessPackage}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle id="form-dialog-title">Ny tilgangspakke</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vennligst fyll ut de obligatoriske feltene for å legge til ny
                        tilgangspakke.
                    </DialogContentText>
                    <PackageNameValidationInput
                        title="Pakke-ID"
                        name="name"
                        value={shortDescription}
                        onChange={updatePackageIdValid}
                        packageNameIsValid={packageNameIsValid}
                        packages={packages}
                    />
                    <TextField
                        name="shortDescription"
                        label="Navn"
                        required
                        fullWidth
                        value={name}
                        onChange={updateName}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={closeAddAccessPackage}
                        variant="contained"
                        color="primary"
                    >
                        Avbryt
                    </Button>
                    <Button
                        disabled={!valid}
                        onClick={handleCreatePackage}
                        variant="contained"
                        color="primary"
                    >
                        Legg til
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AccessPackackeAdd;
