import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addAttendee } from '../../redux/eventSlice';
import { AppState } from '../../redux/appState';

export interface Client {
  name: string;
  email: string;
  attending: boolean;
}

const ManageClient = () => {
  const dispatch = useDispatch();
  const events = useSelector((state: AppState) => state.events);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [client, setClient] = useState<Client>({
    name: '',
    email: '',
    attending: false,
  });

  const handleEventChange = (event: SelectChangeEvent) => {
    setSelectedEventId(event.target.value as string);
  };

  // Update state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  //  Update attending state

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClient({ ...client, attending: e.target.checked });
  };

  //   Logic to manage client

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addAttendee({ eventId: selectedEventId, attendee: client }));
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <form onSubmit={handleSubmit}>
        <Select
          value={selectedEventId}
          onChange={handleEventChange}
          displayEmpty
          fullWidth
        >
          <MenuItem value="" disabled>
            Select Event
          </MenuItem>
          {events.map(event => (
            <MenuItem key={event.id} value={event.id}>
              {event.title}
            </MenuItem>
          ))}
        </Select>
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={client.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={client.email}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="attending"
              checked={client.attending}
              onChange={handleCheckboxChange}
            />
          }
          label="Attending"
        />
        <Button type="submit" variant="contained" color="primary">
          Manage Client
        </Button>
      </form>
    </Container>
  );
};

export default ManageClient;
