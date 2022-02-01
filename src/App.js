import { createContext, useContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './Components/Layouts/MainLayout';
import { DataContext } from './Context';
import ManageCars from './Screens/Cars/ManageCars';
import Home from './Screens/Home';
import ManageSalesPeople from './Screens/People/ManageSalesPeople';
import SalesPerson from './Screens/People/SalesPerson';
import Records from './Screens/Records';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="sales-people">
              <Route path=":personId" element={<SalesPerson />} />
              <Route index element={<ManageSalesPeople />} />
            </Route>
            <Route path="cars" element={<ManageCars />} />
            <Route path="records" element={<Records />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
