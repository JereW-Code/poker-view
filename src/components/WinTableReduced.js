import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const NUM = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']


const WinTableReduced = (props) => {

    //init labels
    let xLabels = new Array(13).fill(0).map((_, i) => NUM[i])
    let yLabels = new Array(13).fill(0).map((_, i) => `${NUM[i]}sANY`)
    if(props.flush.length === 1 || props.flush[0] === props.flush[1]){
        yLabels = new Array(13).fill(0).map((_, i) => `${NUM[i]}s${props.flush[0]}`)
    } else if(props.flush.length === 2) {
        yLabels = new Array(13).fill(0).map((_, i) => `${NUM[i]}s${props.flush[0]}/${props.flush[1]}`)
    }

    //default data
    let data = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length)
                .fill(0)
                .map(() => 0)
        )
    let dataForCompare = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length)
                .fill(0)
                .map(() => 0)
        )

    //convert win table to the desired data form
    let winTable
    try{
        winTable = props.table.reduced(props.flush).table
    } catch (e){
        console.log('failed to refreash win table')
    }
    data = winTable === undefined ? data : new Array(yLabels.length)
        .fill(0)
        .map((_, row) =>
            new Array(xLabels.length)
                .fill(0)
                .map((_, col) => {
                    let cell =  winTable[row][col]
                    return (99 * cell[0] / (cell[0] + cell[1])).toFixed(0)
                })
        )

    let prevWinTable
    try{
        prevWinTable = props.pTable.reduced(props.pFlush).table
    } catch (e){
        console.log('failed to refreash win table')
    }
    dataForCompare = prevWinTable === undefined ? dataForCompare : new Array(yLabels.length)
        .fill(0)
        .map((_, row) =>
            new Array(xLabels.length)
                .fill(0)
                .map((_, col) => {
                    let pCell =  prevWinTable[row][col]
                    let cell = data[row][col]
                    let difference = cell - (99 * pCell[0] / (pCell[0] + pCell[1])).toFixed(0)
                    // difference = Math.abs(difference) <= 7 ? 0 : difference
                    return difference
                })
        )

    return (


        <HeatMapGrid
            data={props.compare ? dataForCompare : data}
            xLabels={xLabels}
            yLabels={yLabels}
            // Reder cell with tooltip
            cellRender={(x, y, value) => (
                <div title={`Pos(${x}, ${y}) = ${value}`}>{Math.abs(value)}</div>
            )}
            xLabelsStyle={(index) => ({
                color: '#777',
                fontSize: '.5rem'
            })}
            yLabelsStyle={() => ({
                fontSize: '.7rem',
                color: '#777'
            })}
            cellStyle={(x, y, ratio) => (props.compare ? {
                background: `rgba(${128 - dataForCompare[x][y] * 12}, ${128 + dataForCompare[x][y] * 12}, 0, ${Math.abs(dataForCompare[x][y]) * 0.01})`,
                fontSize: '.4rem',
                color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
            } : {
                background: `rgba(10, 100, 255, ${Math.abs(data[x][y]) * 0.01})`,
                fontSize: '.4rem',
                color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
            })}
            cellHeight='1rem'
            xLabelsPos='bottom'
            onClick={(x, y) => alert(`${NUM[Math.min(x, y)]}, ${NUM[Math.max(x, y)]}`)}
            yLabelsPos='right'
            square
        />


    )
}

export default WinTableReduced
