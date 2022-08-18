import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function Profile() {
  let token = localStorage.getItem("userToken");
  let decodedToken = jwtDecode(token);
  let userID = decodedToken._id;

  const [userNotes, setUserNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    desc: "",
    userID,
    token,
  });

  async function getUserNotes() {
    let { data } = await axios.get(
      `https://route-egypt-api.herokuapp.com/getUserNotes`,
      {
        headers: {
          userID,
          Token: token,
        },
      }
    );
    if (data.message === "success") {
      setUserNotes(data.Notes);
    }
    console.log("userNotes", userNotes);
  }

  useEffect(() => {
    getUserNotes();
  }, []);
  
  function getNote(e) {
    let userNote = { ...note };
    userNote[e.target.name] = e.target.value;
    setNote(userNote);
    console.log(userNote);
  }

  async function addNote(e) {
    e.preventDefault();
    let { data } = await axios.post(
      `https://route-egypt-api.herokuapp.com/addNote`,
      note
    );
    console.log(data);
    if (data.message === "success") {
      getUserNotes();
    }
  }

  return (
    <>
      <div className="text-end">
        <button
          type="button "
          className="btn btn-primary "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Note
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <form id="add-form" onSubmit={addNote}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  New Note..
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Note Title"
                    name="title"
                    onChange={getNote}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    Note
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    placeholder="Note"
                    name="desc"
                    onChange={getNote}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="row">
        {userNotes.map((note) => (
          <div
            key={note._id}
            className="col-md-3 d-flex justify-content-between align-items-center mt-5"
          >
            <div className="note bg-success text-center p-5">
              <h3 className="h4">{note.title}</h3>
              <p>{note.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
