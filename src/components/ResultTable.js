import * as React from 'react';
import Table from '@mui/material/Table';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgba(48,132,241,0.39)',
        // fontSize: 3,
        padding: 1,
        color: 'rgb(42,42,42)',

    },
    [`&.${tableCellClasses.body}`]: {
        // fontSize: 5,
        padding: 1,

    },
}));

function createData(code, playerNum, hand, winRate, cardsRevealed) {
    hand = hand.reduce((a, b) => a + ',' + b)
    hand = hand === '/,/' ? '-' : hand
    if(cardsRevealed.length > 1){
        cardsRevealed = cardsRevealed.reduce((a, b) => a + ',' + b)
    } else if (cardsRevealed.length === 0){
        cardsRevealed = '-'
    }
    return { code, playerNum, hand, winRate, cardsRevealed };
}

let rows = [
    createData(0, 6, ['/', '/'], 0, [])
];

export default function ResultTable(props) {
    rows = [createData(props.code, props.playerNum, props.hand, props.winRate, props.cardsRevealed)]
    return (
        <TableContainer component={Paper}>
            <Table aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Pl. Num</StyledTableCell>
                        <StyledTableCell align="center">Hand</StyledTableCell>
                        <StyledTableCell align="center">Win rate</StyledTableCell>
                        <StyledTableCell align="center">Cards revealed</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center">{row.playerNum}</StyledTableCell>
                            <StyledTableCell align="center">{row.hand}</StyledTableCell>
                            <StyledTableCell align="center">{row.winRate}</StyledTableCell>
                            <StyledTableCell align="center">{row.cardsRevealed}</StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
