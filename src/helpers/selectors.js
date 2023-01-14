//this func returns a list of the appointments for the given day
function getAppointmentsForDay(state, day) {
  let selectedAppointments;
  let appointmentData = [];

  for (let selectedDay of state.days) {
    if (selectedDay?.name === day){
      selectedAppointments = selectedDay.appointments;
    }
  }
  if (!selectedAppointments){
    return appointmentData;
  }
  for (let id of selectedAppointments){
    appointmentData.push(state.appointments[id]);
  }
  return appointmentData;
};

function getInterview(state, interview) {

  if (!interview) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
};

function getInterviewersForDay(state, day) {
  let selectedAppointments;
  let appointmentData = [];

  for (let selectedDay of state.days) {
    if (selectedDay?.name === day){
      selectedAppointments = selectedDay.interviewers;
    }
  }
  if (!selectedAppointments){
    return appointmentData;
  }
  for (let id of selectedAppointments){
    appointmentData.push(state.interviewers[id]);
  }
  return appointmentData;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };