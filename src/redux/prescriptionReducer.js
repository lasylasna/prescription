import {
  ADD_PRESCRIPTION,
  SET_PRESCRIPTIONS,
  EDIT_PRESCRIPTION,
  SEARCH_PRESCRIPTIONS,
} from "./prescriptionActions";

const initialState = {
  prescriptions: [],
  searchQuery: "",
};

const prescriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRESCRIPTION:
      return {
        ...state,
        prescriptions: [...state.prescriptions, action.payload],
      };
    case SET_PRESCRIPTIONS:
      return {
        ...state,
        prescriptions: action.payload,
      };
    case EDIT_PRESCRIPTION:
      const updatedPrescription = action.payload;
      const updatedPrescriptions = state.prescriptions.map((prescription) =>
        prescription.id === updatedPrescription.id
          ? updatedPrescription
          : prescription
      );
      return {
        ...state,
        prescriptions: updatedPrescriptions,
      };
    case SEARCH_PRESCRIPTIONS:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default prescriptionReducer;
