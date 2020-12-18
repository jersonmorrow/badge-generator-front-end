import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function EventForm() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <form>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Event title"
                />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Organizer" />
              </div>
            </div>

            <div className="field">
              <div className="control">
                <input className="input" type="text" placeholder="Location" />
              </div>
            </div>

            <div className="field">
              <label className="label">Date</label>
              <DatePicker
                className="input"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="column">
            <div className="field">
              <div className="file has-name">
                <label className="file-label">
                  <input
                    className="file-input"
                    type="file"
                    name="event-image"
                  />
                  <span className="file-cta">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Upload event image…</span>
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <p className="control">
              <button className="button is-danger is-normal">Cancel</button>
            </p>
            <p className="control">
              <button className="button is-success is-normal">
                Create event
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventForm;
