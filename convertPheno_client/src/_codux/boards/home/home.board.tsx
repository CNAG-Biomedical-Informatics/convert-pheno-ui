import React from 'react';
import { createBoard } from '@wixc3/react-board';
import Home from '../../../code/home/Home';

export default createBoard({
    name: 'Home',
    Board: () => <Home key={null} />
});
