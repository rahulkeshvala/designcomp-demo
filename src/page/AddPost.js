import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

const AddPost = (props) => {
    const { open, onClose, mainFunction, setFetchData } = props;
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            let data = {
                body: values.description,
                id: Date.now().toString(36) + Math.random().toString(36),
                title: values.title,
                userId: Date.now().toString(36) + Math.random().toString(36),
            };
            const AllData = JSON.parse(localStorage.getItem('data'));
            let tmpdata = [data, ...AllData];
            localStorage.setItem('data', JSON.stringify(tmpdata));
            mainFunction();
            setFetchData(tmpdata);
            onClose(false);
            resetForm();
        },
    });

    const hasError = (fieldName) =>
        formik.touched[fieldName] && Boolean(formik.errors[fieldName]);

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={() => onClose(false)}
        >
            <Box component={'form'} onSubmit={formik.handleSubmit}>
                <DialogTitle>Add Post</DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Title
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="title"
                                placeholder="please enter title"
                                error={hasError('title')}
                                helperText={
                                    hasError('title')
                                        ? formik.errors.title
                                        : null
                                }
                                type="text"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title || ''}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputLabel>
                                <Typography color={'ButtonFace'}>
                                    Description
                                </Typography>
                            </InputLabel>
                            <TextField
                                variant="outlined"
                                color="info"
                                fullWidth
                                name="description"
                                error={hasError('description')}
                                helperText={
                                    hasError('description')
                                        ? formik.errors.description
                                        : null
                                }
                                type="text"
                                placeholder="please enter description"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.description || ''}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'center'} spacing={3}>
                        <Grid item>
                            <Button
                                type="submit"
                                variant="contained"
                                color="info"
                            >
                                Add Post
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    onClose(false);
                                    formik.resetForm();
                                }}
                            >
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Box>
        </Dialog>
    );
};

export default AddPost;
