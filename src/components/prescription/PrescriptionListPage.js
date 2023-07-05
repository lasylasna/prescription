import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useNavigate } from "react-router-dom";
import { searchPrescriptions } from "../../redux/prescriptionActions";
import Header from "../Header/Header";
import PrescriptionHeader from "./PrescriptionHeader";

function PrescriptionListPage({ prescriptions }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const searchQuery = useSelector((state) => state.prescriptions.searchQuery);

  if (!prescriptions) {
    return <div>Loading...</div>;
  }
  const handleAddPrescription = () => {
    navigate("/add");
  };

  const handleEditPrescription = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSearch = () => {
    dispatch(searchPrescriptions(searchTerm));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    dispatch(searchPrescriptions(""));
  };

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patient.nhi.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="prescription-list-outer-container">
      <div className="prescription-list-header-search-container">
        <div className="header-container">
          <Header />
        </div>

        <div className="search-container">
          <input
            className="search-field"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="clear-btn" onClick={handleSearch}>
            Search
          </button>
          <button className="clear-btn" onClick={handleClearSearch}>
            Clear
          </button>
        </div>
      </div>
      <div className="prescription-list-outer-container">
        <div className="prescription-list-inner-container">
          <div className="prescription-list-table">
            <table>
              <thead>
                <PrescriptionHeader />
              </thead>
              {filteredPrescriptions.map((prescription, i) => (
                <tbody key={prescription.id}>
                  <tr key={prescription.id}>
                    <td>{prescription.patient.name}</td>

                    <td>{prescription.patient.nhi}</td>
                    <td>{prescription.date}</td>
                    <td>{prescription.medications[0].dosage}</td>
                    <td>
                      <button
                        className="action-btn"
                        onClick={() => handleEditPrescription(prescription.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </div>

      {/*   {filteredPrescriptions.map((prescription) => (
          <div className="prescriptiond prescriptiond-sm mb-3" key={prescription.id}>
            <h5 className="prescriptiond-title">{prescription.patient.name}</h5>
            <p className="prescriptiond-text">NHI: {prescription.patient.nhi}</p>
            <p className="prescriptiond-text">Date: {prescription.date}</p>
            <p className="prescriptiond-text">
              Medication: {prescription.medications[0].dosage}
            </p>

            <button
              className="btn btn-primary mr-2"
              onClick={() => handleEditPrescription(prescription.id)}
            >
              Edit
            </button>
          </div>
        ))}

         */}
    </div>
  );
}

export default PrescriptionListPage;
