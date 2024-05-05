import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    makeStyles,
    Grow,
} from '@material-ui/core';
import DataSaverOnSharpIcon from '@mui/icons-material/DataSaverOnSharp';
import axios from 'axios';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 300,
        margin: 'auto',
        marginTop: theme.spacing(4),
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Updated shadow effect
        backgroundColor: '#ffffff', // Color effect
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
    addButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    addButton: {
        marginTop: theme.spacing(2),
    },
    errorText: {
        color: 'red',
    },
}));

const AddWordCard = () => {
    const classes = useStyles();
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState('');
    const [wordError, setWordError] = useState(false);
    const [meaningError, setMeaningError] = useState(false);

    const handleAdd = async () => {
        if (word.trim() === '') {
            setWordError(true);
        } else {
            setWordError(false);
        }
        if (meaning.trim() === '') {
            setMeaningError(true);
        } else {
            setMeaningError(false);
        }

        if (word.trim() !== '' && meaning.trim() !== '') {
            const data = {
                word: word,
                meaning: meaning
            }

            try {
                const createNewWord = await axios.post('http://localhost:8080/api/v1/createVocabulary', data)
                if (createNewWord.data.success) {
                    setWord('');
                    setMeaning('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Word added successfully!',
                        position: 'top-end',
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000
                    });
                } else {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Oops...',
                        text: 'Failed to add word!',
                        position: 'top-end',
                        toast: true,
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Sorry',
                    text: error.response.data.error,
                    position: 'top-end',
                    toast: true,
                    showConfirmButton: false,
                    timer: 3000
                });
            }
        }
    };

    return (
        <Grow in={true} timeout={500}>
            <Box display="flex" justifyContent="center">
                <Card className={classes.card}>
                    <CardContent>
                        <TextField
                            className={classes.textField}
                            label="Word"
                            variant="outlined"
                            fullWidth
                            value={word}
                            onChange={(e) => setWord(e.target.value)}
                            error={wordError}
                            helperText={wordError && 'Word is required'}
                        />
                        <TextField
                            className={classes.textField}
                            label="Meaning"
                            variant="outlined"
                            fullWidth
                            value={meaning}
                            onChange={(e) => setMeaning(e.target.value)}
                            error={meaningError}
                            helperText={meaningError && 'Meaning is required'}
                        />
                        <Box className={classes.addButtonContainer}>
                            <Button
                                className={classes.addButton}
                                variant="contained"
                                color="primary"
                                onClick={handleAdd}
                                startIcon={<DataSaverOnSharpIcon />}
                            >
                                Add
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Grow>
    );
};

export default AddWordCard;
