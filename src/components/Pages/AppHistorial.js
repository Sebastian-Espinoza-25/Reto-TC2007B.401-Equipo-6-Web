import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import HistoryTable from '../HistoryTable/HistoryTable';
import './AppComun.css';

function AppHistorial() {
  return (
    <div className='AppCss'>
        <div className='AppGlassNew'>
        <Sidebar/>
        <HistoryTable/>
        </div>

    </div>
  );
}

export default AppHistorial;