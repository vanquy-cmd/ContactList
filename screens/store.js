import { createSlice, configureStore } from "@reduxjs/toolkit";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: false,
  },
  reducers: {
    fetchContactsLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
      state.loading = false;
      state.error = false;
    },
    fetchContactsError: (state) => {
      state.loading = false;
      state.error = true;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload); // Thêm liên hệ mới
    },
    deleteContact: (state, action) => {
      state.contacts = state.contacts.filter(contact => contact.phone !== action.payload);
    },
  },
});

export const {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
  addContact,
  deleteContact,
} = contactsSlice.actions;


const store = configureStore({
  reducer: contactsSlice.reducer,
});

export default store;