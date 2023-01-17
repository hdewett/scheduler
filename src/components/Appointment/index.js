import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty.js";
import Form from './Form';
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from '../../hooks/useVisualMode';

export default function Appointment(props) {
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW)

    })

    .catch((err) =>{(console.error(err))})
  };

  const deleteInterview = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      });
  };

  return (
    <article className="appointment">
     <Header 
        time={props.time}
      />
       {mode === CREATE && (
      <Form 
        interviewers={props.interviewers}  onCancel={() => back()}  onSave={save}
      />
    )}
      {mode === SAVING && <Status
       message={"SAVING"} 
       />
       }
      {mode === DELETING && <Status
       message="Deleting" 
       />
       }
      {mode === CONFIRM && <Confirm
        message="Are you sure you want to delete this appointment?"
        onCancel={back}
        onConfirm={deleteInterview} 
        />
        }
      {mode === EMPTY && <Empty
       onAdd={() => transition(CREATE)} 
       />
       }
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
    </article>
  );
}