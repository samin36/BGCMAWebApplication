import React from "react";
import {
  Form,
  Container,
  Icon,
  Header,
  Segment,
  Grid,
  Divider,
} from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import {
  //phoneRegex,
  ssnRegex,
  dateRegex,
  //zipCodeRegex,
} from "../../Regex/regex";
import { paragraph1 } from "../../PageText/page12text";
/**
 * Pass in prevStep if the page number >= 1
 * Notes: <hr> to horizonatal line
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 12; //Define the page number here
  const updateFormState = (values) => {
    setFormStates((prevState) => {
      return {
        ...prevState,
        [`page${pageNo}`]: values,
      };
    });
  };

  const goToNextPage = (values) => {
    updateFormState(values);
    nextStep();
  };

  const goToPrevPage = (values) => {
    updateFormState(values);
    prevStep();
  };

  const initialValues = {
    youthLastName: "",
    youthFirstName: "",
    youthMI: "",
    youthSSN: "",
    youthGender: "",
    documentDate: "",
    youthFosterCare: "",
    youthFosterCareEntry: "",
    youthUSCiti: "",
    youthGARes: "",
    youth3CateQuestion: "",
    youth3CateRadio: "",
    ATANF: "",
    BSNAP: "",
    CSSI: "",
    DPFK: "",
  };

  const section1ValidationSchema = yup.object().shape({
    youthLastName: yup.string().required("Child's Last Name is required"),
    youthFirstName: yup.string().required("Child's First Name is required"),
    youthMI: yup.string().max(1, "Initial must be a single letter"),
    youthSSN: yup
      .string()
      .required("Child's SSN is required")
      .matches(ssnRegex, "SSN must be in the form xxx-xx-xxxx"),
    youthGender: yup.string().required("Gender must be selected"),
    documentDate: yup
      .string()
      .required("Date is required as MM/DD/YYYY")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
    youthFosterCareEntry: yup.string(),
    youthFosterCare: yup.string().required("You must select either Yes or No."),
  });

  const section2ValidationSchema = yup.object().shape({
    youthUSCiti: yup.string().required("You must select either Yes or No."),
    youthGARes: yup.string().required("You must select either Yes or No."),
    youth3CateQuestion: yup
      .string()
      .required("You must select either Yes or No."),
    youth3CateRadio: yup
      .string()
      .required("You must select one of these 3 options."),
    ATANF: yup.string().required("You must select either Yes or No."),
    BSNAP: yup.string().required("You must select either Yes or No."),
    CSSI: yup.string().required("You must select either Yes or No."),
    DPFK: yup.string().required("You must select either Yes or No."),
  });

  const validationSchema = yup
    .object()
    .concat(section1ValidationSchema)
    .concat(section2ValidationSchema);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        //as long as the current page isn't the one that submits the data, keep the stuff below
        setSubmitting(false);
        goToNextPage(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Container textAlign="center" text>
          {/*JSON.stringify(values, null, 2)*/}
          <Header textAlign="center" as="h2">
            Georgia Division of Family and Children Services Afterschool Care
            Program Youth Participation Eligibility Form
          </Header>
          <Header textAlign="center" as="h1">
            <b>Page 1 of 3- DFCS Afterschool Care Program Eligibility Form</b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
            <Divider />
          </Header>
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthLastName &&
                  errors.youthLastName !== undefined && {
                    content: errors.youthLastName,
                    pointing: "above",
                  }
                }
                placeholder="Youth Last Name"
                name="youthLastName"
                value={values.youthLastName}
                onChange={handleChange}
                onBlur={handleBlur}
                width={5}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthFirstName &&
                  errors.youthFirstName !== undefined && {
                    content: errors.youthFirstName,
                    pointing: "above",
                  }
                }
                placeholder="Youth First Name"
                name="youthFirstName"
                value={values.youthFirstName}
                onChange={handleChange}
                onBlur={handleBlur}
                width={5}
              />
              <Form.Input
                // icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.youthMI &&
                  errors.youthMI !== undefined && {
                    content: errors.youthMI,
                    pointing: "above",
                  }
                }
                placeholder="Youth Middle Initial"
                name="youthMI"
                value={values.youthMI}
                onChange={handleChange}
                onBlur={handleBlur}
                width={4}
              />
            </Form.Group>
            <Form.Input
              icon={<Icon name="asterisk" size="small" color="red" />}
              error={
                touched.youthSSN &&
                errors.youthSSN !== undefined && {
                  content: errors.youthSSN,
                  pointing: "above",
                }
              }
              placeholder="Youth SSN (XXX-XX-XXX)"
              name="youthSSN"
              value={values.youthSSN}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Grid.Column>
              <Grid.Row>
                <Segment textAlign="left" size="big">
                  <Form.Group>
                    <label>Gender: </label>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="youthGender"
                      value="Female"
                      label="Female"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthGender", value)
                      }
                      checked={values.youthGender === "Female"}
                      error={
                        touched.youthGender && errors.youthGender !== undefined
                      }
                    />
                    <Form.Radio
                      name="youthGender"
                      value="Male"
                      label="Male"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthGender", value)
                      }
                      checked={values.youthGender === "Male"}
                      error={
                        touched.youthGender && errors.youthGender !== undefined
                      }
                    />
                    <Form.Radio
                      name="youthGender"
                      value="Non-Binary"
                      label="Non-Binary"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthGender", value)
                      }
                      checked={values.youthGender === "Non-Binary"}
                      error={
                        touched.youthGender &&
                        errors.youthGender !== undefined && {
                          content: errors.youthGender,
                          pointing: "above",
                        }
                      }
                    />
                  </Form.Group>
                </Segment>
                <Segment>
                  <Form.Group grouped>
                    <b>
                      Is the youth named above in Foster Care within the state
                      of Georgia?
                    </b>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="youthFosterCare"
                      value="Yes"
                      label="Yes"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthFosterCare", value)
                      }
                      checked={values.youthFosterCare === "Yes"}
                      error={
                        touched.youthFosterCare &&
                        errors.youthFosterCare !== undefined
                      }
                    />
                    <Form.Radio
                      name="youthFosterCare"
                      value="No"
                      label="No"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthFosterCare", value)
                      }
                      checked={values.youthFosterCare === "No"}
                      error={
                        touched.youthFosterCare &&
                        errors.youthFosterCare !== undefined
                      }
                    />
                    <b>
                      Note: If the youth is in Foster Care but not in the care
                      of Georgia, please provide the state name.
                    </b>
                    <Form.Input
                      error={
                        touched.youthFosterCareEntry &&
                        errors.youthFosterCareEntry !== undefined && {
                          content: errors.youthFosterCareEntry,
                          pointing: "above",
                        }
                      }
                      placeholder="Foster Care State Name"
                      name="youthFosterCareEntry"
                      value={values.youthFosterCareEntry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Form.Group>
                </Segment>
              </Grid.Row>
            </Grid.Column>
            <Divider hidden />
            <Form.Input
              icon={<Icon name="asterisk" size="small" color="red" />}
              error={
                touched.documentDate &&
                errors.documentDate !== undefined && {
                  content: errors.documentDate,
                  pointing: "above",
                }
              }
              placeholder="Date (MM/DD/YYYY)"
              name="documentDate"
              value={values.documentDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Divider horizontal content="Section 1" />
            <Grid.Column>
              <Grid.Row>
                <Segment textAlign="left" size="big">
                  <Form.Group>
                    <h3>
                      A. Is the youth applicant a U.S. citizen or qualified
                      alien?{" "}
                    </h3>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="youthUSCiti"
                      value="Yes"
                      label="Yes"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthUSCiti", value)
                      }
                      checked={values.youthUSCiti === "Yes"}
                      error={
                        touched.youthUSCiti && errors.youthUSCiti !== undefined
                      }
                    />
                    <Form.Radio
                      name="youthUSCiti"
                      value="No"
                      label="No"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthUSCiti", value)
                      }
                      checked={values.youthUSCiti === "No"}
                      error={
                        touched.youthUSCiti && errors.youthUSCiti !== undefined
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h3>B. Is the youth applicant a Georgia resident? </h3>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="youthGARes"
                      value="Yes"
                      label="Yes"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthGARes", value)
                      }
                      checked={values.youthGARes === "Yes"}
                      error={
                        touched.youthGARes && errors.youthGARes !== undefined
                      }
                    />
                    <Form.Radio
                      name="youthGARes"
                      value="No"
                      label="No"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youthGARes", value)
                      }
                      checked={values.youthGARes === "No"}
                      error={
                        touched.youthGARes && errors.youthGARes !== undefined
                      }
                    />
                  </Form.Group>
                  <Form.Group>
                    <h3>
                      C. Does the youth applicant fall into one (1) or more of
                      the three categories below (check the category below that
                      apply to the youth)?:{" "}
                    </h3>
                    <Icon name="asterisk" color="red" size="small" corner />
                    <Form.Radio
                      name="youth3CateQuestion"
                      value="Yes"
                      label="Yes"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youth3CateQuestion", value)
                      }
                      checked={values.youth3CateQuestion === "Yes"}
                      error={
                        touched.youth3CateQuestion &&
                        errors.youth3CateQuestion !== undefined
                      }
                    />
                    <Form.Radio
                      name="youth3CateQuestion"
                      value="No"
                      label="No"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youth3CateQuestion", value)
                      }
                      checked={values.youth3CateQuestion === "No"}
                      error={
                        touched.youth3CateQuestion &&
                        errors.youth3CateQuestion !== undefined
                      }
                    />
                  </Form.Group>
                  <Form.Group grouped style={{ marginTop: "-1.5em" }}>
                    {/* <Icon name="asterisk" color="red" size="small" corner /> */}
                    <Form.Radio
                      name="youth3CateRadio"
                      value="Between 6 and 17 years old"
                      label="Youth applicant is between the age of 6 and 17 years old; OR"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youth3CateRadio", value)
                      }
                      checked={
                        values.youth3CateRadio === "Between 6 and 17 years old"
                      }
                      error={
                        touched.youth3CateRadio &&
                        errors.youth3CateRadio !== undefined
                      }
                    />
                    <Form.Radio
                      name="youth3CateRadio"
                      value="18 years old and enrolled in school"
                      label="Youth applicant is 18 years old and currently enrolled in school (high school, GED program or
                            equivalent, or post-secondary institution) and will be enrolled in AND attend school during the
                            upcoming academic year (Verification of school enrollment includes a letter from the school on official
                            school letterhead): OR"
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youth3CateRadio", value)
                      }
                      checked={
                        values.youth3CateRadio ===
                        "18 years old and enrolled in school"
                      }
                      error={
                        touched.youth3CateRadio &&
                        errors.youth3CateRadio !== undefined
                      }
                    />
                    <Form.Radio
                      name="youth3CateRadio"
                      value="18 to 19 years old, dependent child, AND custodial parent"
                      label="Youth applicant is 18 - 19 years old and has a dependent child AND is the custodial parent."
                      onBlur={handleBlur}
                      onChange={(_, { value }) =>
                        setFieldValue("youth3CateRadio", value)
                      }
                      checked={
                        values.youth3CateRadio ===
                        "18 to 19 years old, dependent child, AND custodial parent"
                      }
                      error={
                        touched.youth3CateRadio &&
                        errors.youth3CateRadio !== undefined
                      }
                    />
                  </Form.Group>
                </Segment>
              </Grid.Row>
            </Grid.Column>
            <Form.Group widths="equal">
              <Form.Button
                onClick={goToPrevPage}
                primary
                floated="left"
                disabled={isSubmitting}
                icon="arrow left"
                style={{ padding: ".75em 2em" }}
              />
              <Form.Button
                type="submit"
                onClick={handleSubmit}
                primary
                floated="right"
                disabled={isSubmitting}
                icon="arrow right"
                style={{ padding: ".75em 2em" }}
              />
            </Form.Group>
            <Persist name={`page${pageNo}`} />
          </Form>
        </Container>
      )}
    </Formik>
  );
};

export default FormTemplate;
