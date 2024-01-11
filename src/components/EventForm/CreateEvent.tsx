import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../redux/eventSlice';
import { Client } from '../ClientForm/ManageClient';

export interface EventData {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  client: Client[];
  doctor: string;
}

const CreateEvent = () => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState<EventData>({
    id: '',
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    client: [],
    doctor: '',
  });
  // Update state when input data changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  //To be implemented

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //  Generating a random id
    const eventWithId = { ...eventData, id: Math.random().toString() };
    dispatch(addEvent(eventWithId));
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4">Create Event</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          fullWidth
          margin="normal"
          value={eventData.title}
          onChange={handleChange}
        />
        <TextField
          label="Description"
          name="description"
          fullWidth
          margin="normal"
          value={eventData.description}
          onChange={handleChange}
          multiline
        />
        <TextField
          type="datetime-local"
          name="startTime"
          fullWidth
          margin="normal"
          value={eventData.startTime}
          onChange={handleChange}
        />
        <TextField
          type="datetime-local"
          name="endTime"
          fullWidth
          margin="normal"
          value={eventData.endTime}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Event
        </Button>
      </form>
    </Container>
  );
};

export default CreateEvent;
