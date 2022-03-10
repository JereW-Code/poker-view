import React from 'react'
import { HeatMapGrid } from 'react-grid-heatmap'

const Constants = require('../game/Constants.json');
const TYPE = Constants.TYPE
const NUM = Constants.NUM

let xLabels = new Array(52).fill(0).map((_, i) => TYPE[Math.floor(i / 13)] + NUM[i % 13])
let yLabels = new Array(52).fill(0).map((_, i) => TYPE[Math.floor(i / 13)] + NUM[i % 13])
let data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
        new Array(xLabels.length)
            .fill(0)
            .map(() => 99)
    )

export default function WinTable(props) {
    console.log('win table refreashed')
    data = props.table === undefined ? data : new Array(yLabels.length)
        .fill(0)
        .map((_, row) =>
            new Array(xLabels.length)
                .fill(0)
                .map((_, col) => {
                    let cell =  props.table.table[row][col]
                    return (100 * cell[0] / (cell[0] + cell[1])).toFixed(0)
                })
        )
    return (
        <div
            style={{
                width: '100%'
            }}
        >
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
                    textTransform: 'uppercase',
                    color: '#777'
                })}
                cellStyle={(_x, _y, ratio) => ({
                    background: `rgb(12, 160, 44, ${ratio})`,
                    fontSize: '.6rem',
                    color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
                })}
                cellHeight='1rem'
                xLabelsPos='bottom'
                onClick={(x, y) => alert(`Clicked (${x}, ${y})`)}
                yLabelsPos='right'
                square
            />
        </div>
    )
}