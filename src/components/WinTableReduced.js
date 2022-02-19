import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const NUM = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']
const TYPE = ['S', 'D', 'H', 'C']




const WinTableReduced = (props) => {
    console.log(props)
    let xLabels = new Array(13).fill(0).map((_, i) => NUM[i])
    let yLabels = new Array(13).fill(0).map((_, i) => NUM[i] + 's' + 'ANY')
    if(props.flush.length === 1 || props.flush[0] === props.flush[1]){
        yLabels = new Array(13).fill(0).map((_, i) => NUM[i] + 's' + props.flush[0])
    } else if(props.flush.length === 2) {
        yLabels = new Array(13).fill(0).map((_, i) => NUM[i] + 's' + props.flush[0] + '/' + props.flush[1])
    }
    let data = new Array(yLabels.length)
        .fill(0)
        .map(() =>
            new Array(xLabels.length)
                .fill(0)
                .map(() => 0)
        )
    let winTable
    try{
        winTable = props.table.reduced(props.flush).table
    } catch (e){
        console.log(props)
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
    return (
        <HeatMapGrid
            data={data}
            xLabels={xLabels}
            yLabels={yLabels}
            // Reder cell with tooltip
            cellRender={(x, y, value) => (
                <div title={`Pos(${x}, ${y}) = ${value}`}>{value}</div>
            )}
            xLabelsStyle={(index) => ({
                color: '#777',
                fontSize: '.5rem'
            })}
            yLabelsStyle={() => ({
                fontSize: '.7rem',
                color: '#777'
            })}
            cellStyle={(_x, _y, ratio) => ({
                background: `rgb(10, 100, 255, ${ratio})`,
                fontSize: '.6rem',
                color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
            })}
            cellHeight='1rem'
            xLabelsPos='bottom'
            onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
            yLabelsPos='right'
            square
        />
    )
}

export default WinTableReduced
