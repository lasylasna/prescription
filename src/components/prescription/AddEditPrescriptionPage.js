import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Button } from "reactstrap";
import {
  addPrescription,
  editPrescription,
  fetchPrescriptionById,
} from "../../redux/prescriptionActions";
import "./style.css";

function AddEditPrescriptionPage({ addMode }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const prescription = useSelector((state) =>
    state.prescriptions.prescriptions.filter((item) => item.id == id)
  );
  const [header, setHeader] = useState("");
  const [btnText, setBtnText] = useState("");
  const [patientName, setPatientName] = useState("");
  const [nhi, setNhi] = useState("");
  const [date, setDate] = useState("");
  const [medication, setMedication] = useState("");

  useEffect(() => {
    setIsLoading(true);
    if (!addMode && id) {
      dispatch(fetchPrescriptionById(id));
      setHeader("Edit details");
      setBtnText("Update");
      setPatientName(prescription[0].patient["name"]);
      setNhi(prescription[0].patient["nhi"]);
      setDate(prescription[0].date);
      setMedication(prescription[0].medications[0].dosage);
    } else {
      setHeader("Add New Prescription");
      setBtnText("Submit");
    }
  }, [addMode, id, dispatch]);

  const handleSavePrescription = async () => {
    const prescriptionData = {
      patient: {
        name: patientName,
        nhi: nhi,
      },
      date: new Date().toLocaleString(),
      medications: [
        {
          id: "1",
          dosage: medication,
        },
      ],
    };

    if (addMode) {
      try {
        setIsLoading(true);
        if (addMode) {
          await dispatch(addPrescription(prescriptionData));
          setPatientName("");
        } else {
          await dispatch(editPrescription({ id: id, ...prescriptionData }));
        }
        setNhi("");
        setDate("");
        setMedication("");
      } catch (error) {
        console.log("Error adding prescription:", error);
      } finally {
        setIsLoading(false);
      }
      //dispatch(addPrescription(prescriptionData));

      // dispatch(editPrescription({ id: id, ...prescriptionData }));
    }

    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-edit-form-outer-container">
      <div className="add-edit-form-inner-container">
        <Link to="/" className="">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Link>
        <div className="add-edit-form">
          <h4 className="header-text">{header}</h4>

          <div   className="form-container">
            <Label for="status" className="form-label">
              Name
              <span className="red-star"> *</span>
            </Label>

            <input
              className="form-field"
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
          </div>
          <FormGroup className="form-container">
            <Label for="status" className="form-label">
              NHI
              <span className="red-star"> *</span>
            </Label>
            <input
              className="form-field"
              type="text"
              value={nhi}
              onChange={(e) => setNhi(e.target.value)}
            />
          </FormGroup>

          <FormGroup className="form-container">
            <Label for="status" className="form-label">
              Medication
              <span className="red-star"> *</span>
            </Label>
            <input
              className="form-field"
              type="text"
              value={medication}
              onChange={(e) => setMedication(e.target.value)}
            />
          </FormGroup>
          <button className="action-btn" onClick={handleSavePrescription} >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEditPrescriptionPage;
