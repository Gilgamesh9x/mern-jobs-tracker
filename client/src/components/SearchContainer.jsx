import { FormRow, SelectInput } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../utils/constants";
import { useJobsContext } from "../pages/AllJobs";

const SearchContainer = () => {
  // the reason we need the search values is in order to keep the values in the input when the user refreshes the page after searching for something and still gets the same results.
  const { searchValues } = useJobsContext();
  const submit = useSubmit();

  function handleFormSubmit(e) {
    submit(e.currentTarget.form);
  }

  function debounce(callback) {
    return (e) => {
      const form = e.currentTarget.form;
      let timeout;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback(form);
      }, 2000);
    };
  }

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>
        <div className="form-center">
          <FormRow
            type="search"
            id="search"
            onChange={debounce((form) => {
              submit(form);
            })}
            defaultValue={searchValues.search || ""}
          >
            Search
          </FormRow>
          <SelectInput
            name="jobStatus"
            defaultValue={searchValues.jobStatus || "pending"}
            values={{ ALL: "all", ...JOB_STATUS }}
            onChange={handleFormSubmit}
          >
            Job Status
          </SelectInput>
          <SelectInput
            name="jobType"
            defaultValue={searchValues.jobType || "all"}
            values={{ ALL: "all", ...JOB_TYPE }}
            onChange={handleFormSubmit}
          >
            Job Type
          </SelectInput>
          <SelectInput
            name="sort"
            defaultValue={searchValues.sort || "newest"}
            values={JOB_SORT_BY}
            onChange={handleFormSubmit}
          >
            Job Type
          </SelectInput>

          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
