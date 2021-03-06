import React, { useState } from "react";
import styled from "styled-components";

import { validateInput } from "../../../global/helpers/validation";
import { FORM_STATUS } from "../../../global/helpers/variables";

function EducationForm({
  eduIndex,
  currentYear,
  userId,
  userSchool,
  userFieldOfStudy,
  userFromYear,
  userFromMonth,
  userToYear,
  userToMonth,
  userToPresent,
  userDescription,
  updateEducation,
  removeEducation,
}) {
  const [school, setSchool] = useState({
    schoolNameInput: userSchool,
    schoolChange: false,
    schoolStatus: FORM_STATUS.idle,
  });

  const [fieldOfStudy, setFieldOfStudy] = useState({
    fieldOfStudyInput: userFieldOfStudy,
    fieldOfStudyChange: false,
    fieldOfStudyStatus: FORM_STATUS.idle,
  });

  const [dates, setDates] = useState({
    schoolFromYear: userFromYear,
    schoolFromYearStatus: FORM_STATUS.idle,
    schoolFromMonth: userFromMonth,
    schoolFromMonthStatus: FORM_STATUS.idle,
    schoolToYear: userToYear,
    schoolToYearStatus: FORM_STATUS.idle,
    schoolToMonth: userToMonth,
    schoolToMonthStatus: FORM_STATUS.idle,
    schoolToPresent: userToPresent,
    schoolDateChange: false,
  });

  const [description, setDescription] = useState({
    descriptionInput: userDescription,
    descriptionChange: false,
    descriptionStatus: FORM_STATUS.idle,
  });

  let presentRef = React.createRef();

  function setSchoolInput(value) {
    setSchool({
      ...school,
      schoolNameInput: value,
      schoolChange: true,
    });
  }

  function validateSchool(value) {
    let newState;

    if (value.trim() === "") {
      newState = {
        ...school,
        schoolNameInput: "",
        schoolStatus: FORM_STATUS.error,
      };
      setSchool(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (value === userSchool) {
      newState = {
        schoolNameInput: value,
        schoolChange: false,
        schoolStatus: FORM_STATUS.idle,
      };
      setSchool(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (validateInput("name", value)) {
      newState = {
        ...school,
        schoolStatus: FORM_STATUS.success,
      };
    } else {
      newState = {
        ...school,
        schoolStatus: FORM_STATUS.error,
      };
    }

    setSchool(newState);
    updateEducation(eduIndex, newState);
  }

  function setFieldOfStudyInput(value) {
    setFieldOfStudy({
      ...fieldOfStudy,
      fieldOfStudyInput: value,
      fieldOfStudyChange: true,
    });
  }

  function validateFieldOfStudy(value) {
    let newState;

    if (value.trim() === "") {
      newState = {
        ...fieldOfStudy,
        fieldOfStudyInput: "",
        fieldOfStudyStatus: FORM_STATUS.error,
      };
      setFieldOfStudy(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (value === userFieldOfStudy) {
      newState = {
        fieldOfStudyInput: value,
        fieldOfStudyChange: false,
        fieldOfStudyStatus: FORM_STATUS.idle,
      };
      setFieldOfStudy(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (validateInput("title", value)) {
      newState = {
        ...fieldOfStudy,
        fieldOfStudyStatus: FORM_STATUS.success,
      };
    } else {
      newState = {
        ...fieldOfStudy,
        fieldOfStudyStatus: FORM_STATUS.error,
      };
    }

    setFieldOfStudy(newState);
    updateEducation(eduIndex, newState);
  }

  function setFromMonthDate(value) {
    setDates({
      ...dates,
      schoolFromMonth: value,
      schoolDateChange: true,
    });
  }

  function validateFromMonthDate(value) {
    if (!dates.schoolDateChange && value) return;
    if (value === "") {
      setDates({
        ...dates,
        schoolFromMonthStatus: FORM_STATUS.error,
        schoolFromMonth: value,
      });
    } else {
      setDates({
        ...dates,
        schoolFromMonthStatus: FORM_STATUS.success,
        schoolFromMonth: value,
      });
    }
    updateEducation(eduIndex, {
      schoolDateChange: true,
      schoolFromMonth: value,
    });
  }

  function setFromYearDate(value) {
    setDates({
      ...dates,
      schoolFromYear: value,
      schoolDateChange: true,
    });
  }

  function validateFromYearDate(value) {
    if (!dates.schoolDateChange && value) return;
    if (value === "") {
      setDates({
        ...dates,
        schoolFromYearStatus: FORM_STATUS.error,
        schoolFromYear: value,
      });
    } else {
      setDates({
        ...dates,
        schoolFromYearStatus: FORM_STATUS.success,
        schoolFromYear: value,
      });
    }
    updateEducation(eduIndex, {
      schoolDateChange: true,
      schoolFromYear: value,
    });
  }

  function setToMonthDate(value) {
    setDates({
      ...dates,
      schoolToMonth: value,
      schoolDateChange: true,
    });
  }

  function validateToMonthDate(value) {
    if (!dates.schoolDateChange && value) return;
    if (value === "") {
      setDates({
        ...dates,
        schoolToMonthStatus: FORM_STATUS.error,
        schoolToMonth: value,
      });
    } else {
      setDates({
        ...dates,
        schoolToMonthStatus: FORM_STATUS.success,
        schoolToMonth: value,
      });
    }
    updateEducation(eduIndex, {
      schoolDateChange: true,
      schoolToMonth: value,
    });
  }

  function setToYearDate(value) {
    setDates({
      ...dates,
      schoolToYear: value,
      schoolDateChange: true,
    });
  }

  function validateToYearDate(value) {
    if (!dates.schoolDateChange && value) return;
    if (value === "") {
      setDates({
        ...dates,
        schoolToYearStatus: FORM_STATUS.error,
        schoolToYear: value,
      });
    } else {
      setDates({
        ...dates,
        schoolToYearStatus: FORM_STATUS.success,
        schoolToYear: value,
      });
    }
    updateEducation(eduIndex, {
      schoolDateChange: true,
      schoolToYear: value,
    });
  }

  function setToPresentDate() {
    if (presentRef.current.checked) {
      updateEducation(eduIndex, {
        schoolDateChange: true,
        schoolToPresent: "Present",
      });
    } else {
      updateEducation(eduIndex, {
        schoolDateChange: true,
        schoolToPresent: "",
      });
    }
    setDates({
      ...dates,
      schoolDateChange: true,
    });
  }

  function setDescriptionInput(value) {
    setDescription({
      ...description,
      descriptionInput: value,
      descriptionChange: true,
    });
  }

  function validateDescription(value) {
    let newState;

    if (value.trim() === "") {
      newState = {
        ...description,
        descriptionInput: "",
        descriptionStatus: FORM_STATUS.error,
      };
      setDescription(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (value === userDescription) {
      newState = {
        descriptionInput: value,
        descriptionChange: false,
        descriptionStatus: FORM_STATUS.idle,
      };
      setDescription(newState);
      updateEducation(eduIndex, newState);
      return;
    }

    if (validateInput("summary", value)) {
      newState = {
        ...description,
        descriptionStatus: FORM_STATUS.success,
      };
    } else {
      newState = {
        ...description,
        descriptionStatus: FORM_STATUS.error,
      };
    }

    setDescription(newState);
    updateEducation(eduIndex, newState);
  }

  return (
    <fieldset>
      <legend>Education: {school.schoolNameInput || "New Education"}</legend>

      <button
        type="button"
        aria-label={`Remove ${school.schoolNameInput || "New"} Education`}
        onClick={() => removeEducation(userId)}
      >
        X
      </button>

      <InputContainer>
        <label htmlFor={`school-${userId}`}>School:</label>
        <input
          type="text"
          id={`school-${userId}`}
          name="school"
          className={`input ${
            school.schoolStatus === FORM_STATUS.error ? "input-err" : ""
          }`}
          aria-describedby={`school-${userId}-error school-${userId}-success`}
          aria-invalid={
            school.schoolNameInput.trim() === "" ||
            school.schoolStatus === FORM_STATUS.error
          }
          value={school.schoolNameInput}
          onChange={(e) => setSchoolInput(e.target.value)}
          onBlur={(e) => validateSchool(e.target.value)}
        />
        {school.schoolStatus === FORM_STATUS.error ? (
          <span id={`school-${userId}-error`} className="err-mssg">
            Input is required. School can only be alphabelical characters, no
            numbers
          </span>
        ) : null}
        {school.schoolStatus === FORM_STATUS.success ? (
          <span id={`school-${userId}-success`} className="success-mssg">
            School is Validated
          </span>
        ) : null}
      </InputContainer>

      <InputContainer>
        <label htmlFor={`field-of-study-${userId}`}>Field of Study:</label>
        <input
          type="text"
          id={`field-of-study-${userId}`}
          name="field-of-study"
          className={`input ${
            fieldOfStudy.fieldOfStudyStatus === FORM_STATUS.error
              ? "input-err"
              : ""
          }`}
          aria-describedby={`field-of-study-${userId}-error field-of-study-${userId}-success`}
          aria-invalid={
            fieldOfStudy.fieldOfStudyInput.trim() === "" ||
            fieldOfStudy.fieldOfStudyStatus === FORM_STATUS.error
          }
          value={fieldOfStudy.fieldOfStudyInput}
          onChange={(e) => setFieldOfStudyInput(e.target.value)}
          onBlur={(e) => validateFieldOfStudy(e.target.value)}
        />
        {fieldOfStudy.fieldOfStudyStatus === FORM_STATUS.error ? (
          <span id={`field-of-study-${userId}-error`} className="err-mssg">
            Input is required. field of study can only be alphabelical
            characters, no numbers
          </span>
        ) : null}
        {fieldOfStudy.fieldOfStudyStatus === FORM_STATUS.success ? (
          <span
            id={`field-of-study-${userId}-success`}
            className="success-mssg"
          >
            field of study is Validated
          </span>
        ) : null}
      </InputContainer>

      <div>
        <InputContainer>
          <label htmlFor={`from-month-${userId}`}>From Month:</label>
          <select
            name="from-month"
            id={`from-month-${userId}`}
            defaultValue={userFromMonth}
            className={`input ${
              dates.schoolFromMonthStatus === FORM_STATUS.error
                ? "input-err"
                : ""
            }`}
            aria-describedby={`from-month-${userId}-error from-month-${userId}-success`}
            aria-invalid={
              dates.schoolFromMonth === "" ||
              dates.schoolFromMonthStatus === FORM_STATUS.error
            }
            onChange={(e) => setFromMonthDate(e.target.value)}
            onBlur={(e) => validateFromMonthDate(e.target.value)}
          >
            <option value="">--Select Month--</option>
            <option value="January">01 | January</option>
            <option value="February">02 | February</option>
            <option value="March">03 | March</option>
            <option value="April">04 | April</option>
            <option value="May">05 | May</option>
            <option value="June">06 | June</option>
            <option value="July">07 | July</option>
            <option value="August">08 | August</option>
            <option value="September">09 | September</option>
            <option value="October">10 | October</option>
            <option value="November">11 | November</option>
            <option value="December">12 | December</option>
          </select>
          {dates.schoolFromMonthStatus === FORM_STATUS.error ? (
            <span id={`from-month-${userId}-error`} className="err-mssg">
              month is required
            </span>
          ) : null}
          {dates.schoolFromMonthStatus === FORM_STATUS.success ? (
            <span id={`from-month-${userId}-success`} className="success-mssg">
              month is Validated
            </span>
          ) : null}
        </InputContainer>
        <InputContainer>
          <label htmlFor={`from-year-${userId}`}>From Year:</label>
          <select
            name="from-year"
            id={`from-year-${userId}`}
            defaultValue={userFromYear}
            className={`input ${
              dates.schoolFromYearStatus === FORM_STATUS.error
                ? "input-err"
                : ""
            }`}
            aria-describedby={`from-year-${userId}-error from-year-${userId}-success`}
            aria-invalid={
              dates.schoolFromYear === "" ||
              dates.schoolFromYearStatus === FORM_STATUS.error
            }
            onChange={(e) => setFromYearDate(e.target.value)}
            onBlur={(e) => validateFromYearDate(e.target.value)}
          >
            <option value="">--Select Year--</option>
            {Array.from(Array(50)).map((_, i) => (
              <option key={`${i}-${userId}`} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
          {dates.schoolFromYearStatus === FORM_STATUS.error ? (
            <span id={`from-year-${userId}-error`} className="err-mssg">
              year is required
            </span>
          ) : null}
          {dates.schoolFromYearStatus === FORM_STATUS.success ? (
            <span id={`from-year-${userId}-success`} className="success-mssg">
              year is Validated
            </span>
          ) : null}
        </InputContainer>
      </div>

      {userToPresent !== "Present" ? (
        <div>
          <InputContainer>
            <label htmlFor={`to-month-${userId}`}>To Month:</label>
            <select
              name="to-month"
              id={`to-month-${userId}`}
              defaultValue={userToMonth}
              className={`input ${
                dates.schoolToMonthStatus === FORM_STATUS.error
                  ? "input-err"
                  : ""
              }`}
              aria-describedby={`to-month-${userId}-error to-month-${userId}-success`}
              aria-invalid={
                dates.schoolToMonth === "" ||
                dates.schoolToMonthStatus === FORM_STATUS.error
              }
              onChange={(e) => setToMonthDate(e.target.value)}
              onBlur={(e) => validateToMonthDate(e.target.value)}
            >
              <option value="">--Select Month--</option>
              <option value="January">01 | January</option>
              <option value="February">02 | February</option>
              <option value="March">03 | March</option>
              <option value="April">04 | April</option>
              <option value="May">05 | May</option>
              <option value="June">06 | June</option>
              <option value="July">07 | July</option>
              <option value="August">08 | August</option>
              <option value="September">09 | September</option>
              <option value="October">10 | October</option>
              <option value="November">11 | November</option>
              <option value="December">12 | December</option>
            </select>
            {dates.schoolToMonthStatus === FORM_STATUS.error ? (
              <span id={`to-month-${userId}-error`} className="err-mssg">
                month is required
              </span>
            ) : null}
            {dates.schoolToMonthStatus === FORM_STATUS.success ? (
              <span id={`to-month-${userId}-success`} className="success-mssg">
                month is Validated
              </span>
            ) : null}
          </InputContainer>
          <InputContainer>
            <label htmlFor={`to-year-${userId}`}>To Year:</label>
            <select
              name="to-year"
              id={`to-year-${userId}`}
              defaultValue={userToYear}
              className={`input ${
                dates.schoolToYearStatus === FORM_STATUS.error
                  ? "input-err"
                  : ""
              }`}
              aria-describedby={`to-year-${userId}-error to-year-${userId}-success`}
              aria-invalid={
                dates.schoolToYear === "" ||
                dates.schoolToYearStatus === FORM_STATUS.error
              }
              onChange={(e) => setToYearDate(e.target.value)}
              onBlur={(e) => validateToYearDate(e.target.value)}
            >
              <option value="">--Select Year--</option>
              {Array.from(Array(50)).map((_, i) => (
                <option key={`${i}-${userId}`} value={currentYear - i}>
                  {currentYear - i}
                </option>
              ))}
            </select>
            {dates.schoolToYearStatus === FORM_STATUS.error ? (
              <span id={`to-year-${userId}-error`} className="err-mssg">
                year is required
              </span>
            ) : null}
            {dates.schoolToYearStatus === FORM_STATUS.success ? (
              <span id={`to-year-${userId}-success`} className="success-mssg">
                year is Validated
              </span>
            ) : null}
          </InputContainer>
        </div>
      ) : null}
      <input
        ref={presentRef}
        type="checkbox"
        id={`to-present-${userId}`}
        name="to-present"
        onChange={setToPresentDate}
        checked={userToPresent === "Present"}
      />
      <label htmlFor={`present-${userId}`}>Present</label>

      <InputContainer>
        <label htmlFor={`description-${userId}`}>Description:</label>
        <input
          type="text"
          id={`description-${userId}`}
          name="description"
          className={`input ${
            description.descriptionStatus === FORM_STATUS.error
              ? "input-err"
              : ""
          }`}
          aria-describedby={`description-${userId}-error description-${userId}-success`}
          aria-invalid={
            description.descriptionInput.trim() === "" ||
            description.descriptionStatus === FORM_STATUS.error
          }
          value={description.descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
          onBlur={(e) => validateDescription(e.target.value)}
        />
        {description.descriptionStatus === FORM_STATUS.error ? (
          <span id={`description-${userId}-error`} className="err-mssg">
            Input is required. description can only be alphabelical characters,
            no numbers
          </span>
        ) : null}
        {description.descriptionStatus === FORM_STATUS.success ? (
          <span id={`description-${userId}-success`} className="success-mssg">
            description is Validated
          </span>
        ) : null}
      </InputContainer>
    </fieldset>
  );
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  .input-err {
    border: solid red;
  }
  .err-mssg {
    color: red;
    font-size: 0.7rem;
  }
  .success-mssg {
    color: green;
    font-size: 0.7rem;
  }
`;

export default EducationForm;
