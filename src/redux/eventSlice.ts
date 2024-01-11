// eventSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Client } from '../components/ClientForm/ManageClient';

interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  client: Client[];
  doctor: string;
}

// Initial state for the events slice
const initialState: Event[] = [];

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.push(action.payload);
    },
    addAttendee: (
      state,
      action: PayloadAction<{ eventId: string; attendee: Client }>
    ) => {
      const { eventId, attendee } = action.payload;
      const event = state.find(event => event.id === eventId);
      if (event) {
        event.client.push(attendee);
      }
    },
  },
});

export const { addEvent, addAttendee } = eventSlice.actions;
export default eventSlice.reducer;
