import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPrescription,
  fetchPrescriptions,
  editPrescription,
  searchPrescriptions,
  fetchPrescriptionById, // Add this import statement
} from './redux/prescriptionActions';
import AddEditPrescriptionPage from './components/prescription/AddEditPrescriptionPage';
import PrescriptionListPage from './components/prescription/PrescriptionListPage'; 

function App() {
  const dispatch = useDispatch();
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions);

  useEffect(() => {
    dispatch(fetchPrescriptions());
  }, [dispatch]);

  return (
    <Router> 
      <Routes>
        
        <Route path="/" element={<PrescriptionListPage prescriptions={prescriptions} />} />
        <Route path="/add" element={<AddEditPrescriptionPage addMode={true} />} />
        <Route path="/edit/:id" element={<AddEditPrescriptionPage addMode={false} />} />
      </Routes>
    </Router> 
  );
}

export default App;
