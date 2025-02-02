import * as Yup from "yup";

import {
  CREATE_PROJECT_SAGA,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../../redux/constants/Cyberbugs/Cyberbug";
import React, { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import { Editor } from "@tinymce/tinymce-react";
import { withFormik } from "formik";

function ProjectSettings(props) {
  const arrProjectCategory = useSelector(
    (state) => state.ProjectCategoryReducer.arrProjectCategory
  );
  const dispatch = useDispatch();
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_CATEGORY_SAGA });
  }, []);
  const handleEditorChange = (content) => {
    // console.log("Content was updated:", e.target.getContent());
    setFieldValue("description", content);
  };

  return (
    <div className="project-settings container">
      <form
        className="container project-settings__form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="project-settings__title">
          Projects<span className="project-settings__symbol">/</span>
          cyberlearn 1.5
          <span className="project-settings__symbol">/</span>Project Details
        </div>
        <h1 className="project-settings__detail">Project Details</h1>
        <div className="form-group">
          <label className="project-settings__name">Name</label>
          <div>
            <input
              name="projectName"
              type="text"
              className="form-control project-settings__input"
              placeholder="cyberlearn 1.5"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="project-settings__name">URL</label>
          <div>
            <input
              name="projectName"
              type="text"
              className="form-control  project-settings__input"
              placeholder="https://cyberlearn.vn"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="project-settings__name">Description</label>
          <div>
            <Editor
              initialValue="<p>Initial content</p>"
              init={{
                height: 180,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="project-settings__name">Project Category</label>
          <select
            onChange={handleChange}
            name="categoryId"
            className="form-control project-settings__input"
          >
            {arrProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button
          style={{ backgroundColor: "rgb(0, 82, 204)" }}
          type="submit"
          className="btn btn-primary mt-3 project-settings__button"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
const projectSettingsForm = withFormik({
  // thuộc tính enableReinitialize: khi mỗi lần props của redux thay đổi thì nó lặp tức bidding lại giá trị obj
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return {
      projectName: "",
      description: "",
      categoryId: props.arrProjectCategory[0]?.id,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: CREATE_PROJECT_SAGA, newProject: values });
  },

  displayName: "projectSettingsFormik",
})(ProjectSettings);

const mapStateToProps = (state) => {
  return {
    arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory,
  };
};
export default connect(mapStateToProps)(projectSettingsForm);
