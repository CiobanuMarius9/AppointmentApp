import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux/appState';
import PersonIcon from '@mui/icons-material/Person';

const WeeklyView = () => {
  const events = useSelector((state: AppState) => state.events);

  console.log(events);
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const generateWeek = (): Date[] => {
    const week = [];
    const currentDay = new Date();
    const firstDay = currentDay.getDate() - currentDay.getDay();
    for (let i = 0; i < 7; i++) {
      const day = new Date(
        currentDay.getFullYear(),
        currentDay.getMonth(),
        firstDay + i
      );
      week.push(day);
    }
    return week;
  };

  const week = generateWeek();

  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === day.toDateString();
    });
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Grid container spacing={2}>
        {week.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} style={{ padding: '15px' }}>
                <Typography variant="h6">{weekDays[index]}</Typography>
                <Typography variant="subtitle1">
                  {day.toLocaleDateString()}
                </Typography>
                {dayEvents.length > 0 ? (
                  dayEvents.map((event, idx) => (
                    <div key={idx}>
                      <Typography variant="body2">{event.title}</Typography>
                      {event.client.map((attendee, attendeeId) => (
                        <Tooltip
                          title={`${attendee.name} (${attendee.email})`}
                          key={attendeeId}
                        >
                          <PersonIcon />
                        </Tooltip>
                      ))}
                    </div>
                  ))
                ) : (
                  <Typography variant="body2">No events</Typography>
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default WeeklyView;
