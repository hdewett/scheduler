# Interview Scheduler

A clean React project that allows users to book specific time slots with interviewers on available weekdays. They have the ability to edit or change details of the interview including: the interviewer, their own name, and delete booked appointments.

## Key Features

- A user can switch and view available appointments from Monday- Friday, 12PM-5PM
  - The list of days informs the user how many slots are available for each day.
- A user can book an interview in an empty appointment slot.
  - Interviews are booked by typing in a student name and clicking on an interviewer from a list of available interviewers.
- A user can cancel or edit the details of an existing interview.
  - The expected day updates the number of spots available when an interview is booked or canceled.
  - A user is presented with a confirmation when they attempt to delete an interview.
  - A user is shown an error if an interview cannot be saved or deleted.
  - A user is shown a status indicator, "Saving" or "Deleting", while asynchronous operations are in progress.
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Technical Specifications

- React
- Webpack, Babel
- PostgreSQL (via @lighthouse-labs/scheduler-api)
- Axios
- Storybook, Jest, Testing Library, Cypress

## Set up

- Install dependencies with `npm install`.
- API server and Client must run simultaneously

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Cypress Test Framework

```sh
npm run Cypress
```

## Screenshots

### Scheduler View

!["An overview of the app"](https://github.com/hdewett/scheduler/blob/master/docs/Scheduler_view.PNG)

### Booking/Editing an Appointment

!["Image showing a new appointment being booked"](https://github.com/hdewett/scheduler/blob/master/docs/Booking_appointment.PNG)

### Deleting an Appointment

!["Image showing the confirmation prompt after hitting delete"](https://github.com/hdewett/scheduler/blob/master/docs/Deleting_appointment.PNG)
