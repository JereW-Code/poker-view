import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
const lang = require('../lang.json');

export default function Help(props) {

    let language = props.language

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <div>
            <Button onClick={handleToggle}>{lang["help"][language]}</Button>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <div>
                    <h3>How to enter a code</h3>
                    <p>format: &lt;P&gt; &lt;H1&gt; &lt;H2&gt; &lt;C1&gt; &lt;C2&gt; ... &lt;C5&gt;</p>
                    <p>*P: player number, H: your hand, C: revealed card</p>
                    <p>eg1: 6 players, your hand is H6 and C7, the cards revealed are HJ, D8, DT -> enter 6 H6 C7 HJ D8 DT</p>
                    <p>eg2: 3 players, your hand is D9 and CT, there are no cards revealed yet -> enter 3 D9 CT</p>
                    <p>*all the elements in a code is optional, but they should always come in order</p>
                    <p>*a card should be &lt;type&gt;&lt;value&gt; eg1: 6 of Club -> C6 eg2: 10 of Diamond -> DT eg3: Ace of Heart -> HA **case does not matter</p>

                    <h3>How to read the table</h3>
                    <p>if you have two cards of the same kind as specified on the y-label of the plot, read your lower card from y-axis and higher card from x-axis</p>
                    <p>otherwise, read your lower card from x-axis and higher card from y-axis</p>

                    <h3>Voice input</h3>
                    <p>still working on...</p>
                </div>
            </Backdrop>
        </div>
    );
}