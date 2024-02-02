import { createSlice } from "@reduxjs/toolkit";
import countriesService from "../services/countries";

export const initializeCountries = () => {
  return async (dispatch) => {
    const countries = await countriesService.getAll(); // axios call to get data
    dispatch(getCountries(countries)); //put payload into reducer.
    setTimeout(() => {
      dispatch(isLoading(false));
    }, 1000);
  };
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    countries: [], // to access this state, use useSelector((state) => state.countries.countries)
    isLoading: true, // to access this state, use useSelector((state) => state.countries.isLoading)
  },
  reducers: {
    getCountries: (state, action) => {
      state.countries = action.payload;
      state.isLoading = false;
    },
    isLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { getCountries, isLoading } = countriesSlice.actions;

export default countriesSlice.reducer;
