import React from "react";
import { render, cleanup, waitForElement, fireEvent, getByText, getByTestId, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {

  const { container } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();

});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);
  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));
  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();
  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));
  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();
  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));
  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
//1. Render the application
const { container} = render(<Application />);
//2. Wait until the text "Archie Cohen" is displayed.
await waitForElement(() => getByText(container, "Archie Cohen"));
//3. Click the Edit button
const appointment = getAllByTestId(container, "appointment").find(
  appointment => queryByText(appointment, "Archie Cohen")
);

fireEvent.click(queryByAltText(appointment, "Edit"));
//4. Change the name
fireEvent.change(getByTestId(appointment, "student-name-input"), {
  target: { value: "Leopold Silvers"}
});
//5. Click save button
fireEvent.click(getByText(appointment, "Save"));
//6. Check that the "saving" is displayed
expect(getByText(appointment, "SAVING")).toBeInTheDocument();
//7. Check that same spots are remaining for Monday
const day = getAllByTestId(container, "day").find(day =>
  queryByText(day, "Monday")
);

expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

});

it("shows the save error when failing to save an appointment", async () => {

  axios.put.mockRejectedValueOnce();

  const { container} = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  fireEvent.click(queryByText(appointment, "Save"));

  expect(getByText(appointment, "SAVING")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Failed to save appointment"));

  await waitForElement(() => fireEvent.click(getByAltText(appointment, "Close")));

});

it("shows the delete error when failing to delete an existing appointment", async () => {

  axios.delete.mockRejectedValueOnce();

  const { container, debug} = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));
  
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  expect(getByText(appointment, "Are you sure you want to delete this appointment?")).toBeInTheDocument();

  fireEvent.click(queryByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Failed to delete appointment"));

  await waitForElement(() => fireEvent.click(getByAltText(appointment, "Close")));

  debug();

});

});
