//this func returns a list of the appointments for the given day
export function getAppointmentsForDay(state, day) {
  let selectedAppointments;
  let appointmentData = [];
  console.log("HELPER FUNCTION", state.days);
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
}