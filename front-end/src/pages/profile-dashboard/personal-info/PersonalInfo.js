import React, { useState, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import ImageUploadForm from "../../../components/forms/image-upload";
import { ProfileContext } from "../../../global/context/user-profile/ProfileContext";
import { httpClient } from "../../../global/helpers/http-requests";
import { validateInput } from "../../../global/helpers/validation";

/*

see if you can describe the form
"inputs are validated, but not required"

check function and variable names and make them better
functions should be verbs since they DO things

*/

function PersonalInfo() {
  const {
    user,
    submitLoading,
    editProfile,
    setPreviewImg,
    editInputs,
    setEditInputs
  } = useContext(ProfileContext);

  const [submitError, setSubmitError] = useState(false);
  const [firstName, setFirstName] = useState({
    inputValue: "",
    inputChange: false,
    inputError: false
  });
  const [lastName, setLastName] = useState({
    inputValue: "",
    inputChange: false,
    inputError: false
  });

  const [image, setImage] = useState({
    image: "",
    id: "",
    inputChange: false,
    shouldRemoveUserImage: false
  });

  const [areaOfWork, setAreaOfWork] = useState({
    inputValue: "",
    inputChange: false
  });
  const [title, setTitle] = useState({
    inputValue: "",
    inputChange: false,
    inputError: false
  });

  let errorSummaryRef = React.createRef();

  useEffect(() => {
    if (submitError && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
    // another issue with required dependencies causing bugs
    // I am using this since I need to set focus to the
    // err summary element when user clicks submit with errors.
    // since state needs to change for the element to appear
    // and I can only set focus once the element appears, I have
    // to set focus AFTER state changes and component renders
    // so I am using useEffect to handle that
    // this works, but if I add the required errorSummaryRef
    // it will shift focus on that Ref on ANY state change/render
    // since refs are re-set each time
    // eslint-disable-next-line
  }, [submitError]);

  function setFormInputs() {
    setEditInputs(true);
    setSubmitError(false);
    setFirstName({
      inputValue: user.first_name || "",
      inputChange: false,
      inputError: false
    });
    setLastName({
      inputValue: user.last_name || "",
      inputChange: false,
      inputError: false
    });
    setImage({
      image: "",
      id: "",
      inputChange: false,
      shouldRemoveUserImage: false
    });
    setAreaOfWork({
      inputValue: "",
      inputChange: false
    });
    setTitle({
      inputValue: user.desired_title || "",
      inputChange: false,
      inputError: false
    });
  }

  function setFirstNameInput(value) {
    if (value === user.first_name) {
      setFirstName({
        inputChange: false,
        inputValue: value,
        inputError: false
      });
      return;
    }

    setFirstName({ ...firstName, inputChange: true, inputValue: value });
  }

  function validateFirstNameInput(value) {
    if (!firstName.inputChange) return;
    if (value.trim() === "") {
      setFirstName({ ...firstName, inputValue: "", inputError: false });
    } else if (validateInput("name", value)) {
      setFirstName({ ...firstName, inputError: false });
    } else {
      setFirstName({ ...firstName, inputError: true });
    }
  }

  function setLastNameInput(value) {
    if (value === user.last_name) {
      setLastName({
        inputChange: false,
        inputValue: value,
        inputError: false
      });
    }

    setLastName({ ...lastName, inputChange: true, inputValue: value });
  }

  function validateLastNameInput(value) {
    if (!lastName.inputChange) return;
    if (value.trim() === "") {
      setLastName({ ...lastName, inputValue: "", inputError: false });
    } else if (validateInput("name", value)) {
      setLastName({ ...lastName, inputError: false });
    } else {
      setLastName({ ...lastName, inputError: true });
    }
  }

  function removeUserImageFromCloudinary() {
    if (user.image_id) {
      httpClient("POST", "/api/delete-image", {
        id: user.image_id
      });
    }
  }

  function setAreaOfWorkInput(value) {
    if (value === user.area_of_work) {
      setAreaOfWork({ ...areaOfWork, inputChange: false });
      return;
    }
    setAreaOfWork({ ...areaOfWork, inputChange: true, inputValue: value });
  }

  function setTitleInput(value) {
    if (value === user.desired_title) {
      setTitle({
        inputChange: false,
        inputValue: value,
        inputError: false
      });
      return;
    }

    setTitle({ ...title, inputChange: true, inputValue: value });
  }

  function validateTitleInput(value) {
    if (!title.inputChange) return;
    if (value.trim() === "") {
      setTitle({ ...title, inputValue: "", inputError: false });
    } else if (validateInput("title", value)) {
      setTitle({ ...title, inputError: false });
    } else {
      setTitle({ ...title, inputError: true });
    }
  }

  function submitEdit(e) {
    e.preventDefault();

    if (firstName.inputError || lastName.inputError || title.inputError) {
      setSubmitError(true);
      return;
    }

    if (
      !firstName.inputChange &&
      !lastName.inputChange &&
      !image.inputChange &&
      !image.shouldRemoveUserImage &&
      !areaOfWork.inputChange &&
      !title.inputChange
    ) {
      return;
    }

    const inputs = {};

    if (firstName.inputChange) {
      inputs.first_name = firstName.inputValue;
    }

    if (lastName.inputChange) {
      inputs.last_name = lastName.inputValue;
    }

    if (image.inputChange) {
      removeUserImageFromCloudinary();
      inputs.image = image.image;
      inputs.image_id = image.id;
      localStorage.removeItem("image_id");
      setPreviewImg({ image: "", id: "" });
    } else if (image.shouldRemoveUserImage) {
      removeUserImageFromCloudinary();
      inputs.image = "";
      inputs.image_id = "";
    }

    if (areaOfWork.inputChange) {
      inputs.area_of_work = areaOfWork.inputValue;
    }

    if (title.inputChange) {
      inputs.desired_title = title.inputValue;
    }

    console.log("SUB", inputs);
    editProfile(inputs);
  }

  if (!editInputs) {
    return (
      <main aria-labelledby="personal-info-heading-1">
        <Helmet>
          <title>Dashboard Personal Info | Tech Profiles</title>
        </Helmet>
        <h1 id="personal-info-heading-1">Personal Info</h1>
        <section aria-labelledby="personal-info-heading-2">
          <h2 id="personal-info-heading-2">Current Information</h2>
          <button onClick={setFormInputs}>Edit Information</button>
          <ul>
            <li>First Name: {user.first_name || "None Set"}</li>
            <li>Last Name: {user.last_name || "None Set"}</li>
            <li>
              {user.image ? (
                <>
                  <p>Image:</p>
                  {/* what is a good alt tag for your profile image? */}
                  <img src={user.image} alt="Your Profile Pic" />
                </>
              ) : (
                "Image: None Set"
              )}
            </li>
            <li>Area of Work: {user.area_of_work || "None Set"}</li>
            <li>Title: {user.desired_title || "None Set"}</li>
          </ul>
        </section>
      </main>
    );
  }

  return (
    <main aria-labelledby="personal-info-heading">
      <Helmet>
        <title>Dashboard Personal Info | Tech Profiles</title>
      </Helmet>
      <h1 id="personal-info-heading">Personal Info</h1>

      <FormSection aria-labelledby="edit-info-heading">
        <h2 id="edit-info-heading">Edit Information</h2>
        <div
          ref={errorSummaryRef}
          tabIndex="0"
          aria-live="polite"
          aria-labelledby="error-heading"
          className={`error-summary ${submitError ? "" : "hidden"}`}
        >
          <h3 id="error-heading">Error Summary</h3>
          {firstName.inputError ? <p>First Name Error</p> : null}
          {lastName.inputError ? <p>Last Name Error</p> : null}
          {title.inputError ? <p>Title Error</p> : null}
          {!firstName.inputError &&
          !lastName.inputError &&
          !title.inputError ? (
            <p>No Errors, ready to submit</p>
          ) : null}
        </div>

        <form onSubmit={e => submitEdit(e)}>
          <InputContainer>
            <label id="first-name-label" htmlFor="first-name">
              First Name:
            </label>
            <input
              type="text"
              autoComplete="given-name"
              inputMode="text"
              id="first-name"
              name="first-name"
              className={`input ${firstName.inputError ? "input-err" : ""}`}
              aria-labelledby="first-name-label"
              aria-describedby="first-name-error"
              aria-invalid={firstName.inputError}
              value={firstName.inputValue}
              onChange={e => setFirstNameInput(e.target.value)}
              onBlur={e => validateFirstNameInput(e.target.value)}
            />
            {firstName.inputError ? (
              <span
                id="first-name-error"
                className="err-mssg"
                aria-live="polite"
              >
                First Name can only be alphabelical characters, no numbers
              </span>
            ) : null}
          </InputContainer>

          <InputContainer>
            <label id="last-name-label" htmlFor="last-name">
              Last Name:
            </label>
            <input
              type="text"
              autoComplete="family-name"
              inputMode="text"
              id="last-name"
              name="last-name"
              aria-labelledby="last-name-label"
              aria-describedby="last-name-error"
              aria-invalid={lastName.inputError}
              value={lastName.inputValue}
              onChange={e => setLastNameInput(e.target.value)}
              onBlur={e => validateLastNameInput(e.target.value)}
            />
            {lastName.inputError ? (
              <span
                id="last-name-error"
                className="err-mssg"
                aria-live="polite"
              >
                Last Name can only be alphabelical characters, no numbers
              </span>
            ) : null}
          </InputContainer>

          <ImageUploadForm imageInput={image} setImageInput={setImage} />

          <FieldSet>
            <legend>Area of Work</legend>
            <div className="radio-buttons-container">
              <span className="radio-wrapper">
                <input
                  type="radio"
                  name="area-of-work"
                  id="development"
                  value="Development"
                  defaultChecked={user.area_of_work === "Development"}
                  onClick={e => setAreaOfWorkInput(e.target.value)}
                />
                <label htmlFor="development">Development</label>
              </span>
              <span className="radio-wrapper">
                <input
                  type="radio"
                  name="area-of-work"
                  id="ios"
                  value="iOS"
                  defaultChecked={user.area_of_work === "iOS"}
                  onClick={e => setAreaOfWorkInput(e.target.value)}
                />
                <label htmlFor="ios">iOS</label>
              </span>
              <span className="radio-wrapper">
                <input
                  type="radio"
                  name="area-of-work"
                  id="android"
                  value="Android"
                  defaultChecked={user.area_of_work === "Android"}
                  onClick={e => setAreaOfWorkInput(e.target.value)}
                />
                <label htmlFor="android">Android</label>
              </span>
              <span className="radio-wrapper">
                <input
                  type="radio"
                  name="area-of-work"
                  id="design"
                  value="Design"
                  defaultChecked={user.area_of_work === "Design"}
                  onClick={e => setAreaOfWorkInput(e.target.value)}
                />
                <label htmlFor="design">Design</label>
              </span>
            </div>
          </FieldSet>

          <InputContainer>
            <label id="title-label" htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              autoComplete="organization-title"
              inputMode="text"
              id="title"
              name="title"
              className={`input ${title.inputError ? "input-err" : ""}`}
              aria-labelledby="title-label"
              aria-describedby="title-error"
              aria-invalid={title.inputError}
              value={title.inputValue}
              onChange={e => setTitleInput(e.target.value)}
              onBlur={e => validateTitleInput(e.target.value)}
            />
            {title.inputError ? (
              <span id="title-error" className="err-mssg" aria-live="polite">
                Title can only be alphabelical characters, no numbers
              </span>
            ) : null}
          </InputContainer>

          <button disabled={submitLoading} type="submit">
            {submitLoading ? "loading..." : "Submit"}
          </button>
          <button
            disabled={submitLoading}
            type="reset"
            onClick={() => setEditInputs(false)}
          >
            Cancel
          </button>
        </form>
      </FormSection>
    </main>
  );
}

const FormSection = styled.section`
  .hidden {
    display: none;
  }
  .error-summary {
  }
`;

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
`;

const FieldSet = styled.fieldset`
  .radio-buttons-container {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    .radio-wrapper {
      margin: 0.7em;
    }
  }
`;

export default PersonalInfo;
