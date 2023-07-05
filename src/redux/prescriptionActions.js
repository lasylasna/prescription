import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Assuming json-server runs on port 5000

// Action Types
export const ADD_PRESCRIPTION = 'ADD_PRESCRIPTION';
export const SET_PRESCRIPTIONS = 'SET_PRESCRIPTIONS';
export const EDIT_PRESCRIPTION = 'EDIT_PRESCRIPTION';
export const SEARCH_PRESCRIPTIONS = 'SEARCH_PRESCRIPTIONS';
export const FETCH_PRESCRIPTION_BY_ID = 'FETCH_PRESCRIPTION_BY_ID'; // Define FETCH_PRESCRIPTION_BY_ID constant


// Action Creators
export const addPrescription = (prescription) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${API_URL}/prescriptions`, prescription);
      const newPrescription = response.data;
      dispatch({ type: ADD_PRESCRIPTION, payload: newPrescription });
    } catch (error) {
      console.log('Error adding prescription:', error);
    }
  };
};
export const fetchPrescriptions = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/prescriptions`);
        const prescriptions = response.data;
        dispatch({ type: SET_PRESCRIPTIONS, payload: prescriptions });
      } catch (error) {
        console.log('Error fetching prescriptions:', error);
      }
    };
  };

  export const editPrescription = (prescription) => {
    return async (dispatch) => {
      try {
        const response = await axios.put(
          `${API_URL}/prescriptions/${prescription.id}`,
          prescription
        );
        const updatedPrescription = response.data;
        dispatch({ type: EDIT_PRESCRIPTION, payload: updatedPrescription });
      } catch (error) {
        console.log('Error editing prescription:', error);
      }
    };
  }; 
  export const fetchPrescriptionById = (id) => {
    return async (dispatch) => {
      try {
        const response = await axios.get(`${API_URL}/prescriptions/${id}`);  
        dispatch({
          type: FETCH_PRESCRIPTION_BY_ID,
          payload: response.data,
        });
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          if (error.response.status === 404) {
            // Prescription not found
            console.log('Prescription not found');
            // You can dispatch an action to update your Redux state or display an error message
          } else if (error.response.status === 500) {
            // Internal Server Error
            console.log('Internal Server Error');
            // Handle the error accordingly
          } else {
            // Other error status codes
            console.log('An error occurred:', error.response.status);
            // Handle the error accordingly
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.log('No response received');
          // Handle the error accordingly
        } else {
          // Other errors
          console.log('An error occurred:', error.message);
          // Handle the error accordingly
        }
      }
    };
  };
  

  export const searchPrescriptions = (nhi) => {
    return { type: SEARCH_PRESCRIPTIONS, payload: nhi };
  };