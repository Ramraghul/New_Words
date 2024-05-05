import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tableContainer: {
        maxWidth: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 300,
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: '#f5f5f5',
    },
});

function VocabularyTable() {
    const classes = useStyles();
    const [vocabularyList, setVocabularyList] = useState([]);

    useEffect(() => {
        fetch('https://new-words-server-one.vercel.app/api/v1/getVocabularyList')
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setVocabularyList(data.data);
                } else {
                    console.error('Failed to fetch vocabulary list');
                }
            })
            .catch(error => {
                console.error('Error fetching vocabulary list:', error);
            });
    }, []);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderCell}>Word</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Meaning</TableCell>
                        <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vocabularyList.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell>{item.word}</TableCell>
                            <TableCell>{item.meaning}</TableCell>
                            <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default VocabularyTable;
