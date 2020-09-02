import React from "react";
import { Form, Container, Icon, Header } from "semantic-ui-react";
import * as yup from "yup";
import { Formik } from "formik";
import { Persist } from "formik-persist";
import { dateRegex } from "../../Regex/regex";
import {
  paragraph1,
  list1,
  list2,
  list3,
  list4,
  list5,
  signing,
} from "../../PageText/page11text";
/**
 * Pass in prevStep if the page number >= 1
 */
const FormTemplate = ({ nextStep, prevStep, setFormStates }) => {
  const pageNo = 11; //Define the page number here
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
    parentSign: "",
    childName: "",
    signatureDate: "",
  };

  const validationSchema = yup.object().shape({
    parentSign: yup.string().required("Parent Signature/ Name is required."),
    signatureDate: yup
      .string()
      .required("Date is required as MM/DD/YYYY.")
      .matches(dateRegex, "Date must be in the form MM/DD/YYYY."),
    childName: yup.string().required("Child Name is required."),
  });

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
          <Header textAlign="center" as="h1">
            <b>
              Code of Conduct for Participation in The Boys and Girls Clubs of
              Metro Atlanta's Virtual Club Experience
            </b>
          </Header>
          <Header as="h4" textAlign="left">
            {paragraph1}
            {list1}
            {list2}
            {list3}
            {list4}
            {list5}
            {signing}
          </Header>
          <Form size="big">
            <Form.Group widths="equal">
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.parentSign &&
                  errors.parentSign !== undefined && {
                    content: errors.parentSign,
                    pointing: "above",
                  }
                }
                placeholder="Parent Signature/ Name"
                name="parentSign"
                value={values.parentSign}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Input
                icon={<Icon name="asterisk" size="small" color="red" />}
                error={
                  touched.childName &&
                  errors.childName !== undefined && {
                    content: errors.childName,
                    pointing: "above",
                  }
                }
                placeholder="Youth Name"
                name="childName"
                value={values.childName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
            <Form.Input
              icon={<Icon name="asterisk" size="small" color="red" />}
              error={
                touched.signatureDate &&
                errors.signatureDate !== undefined && {
                  content: errors.signatureDate,
                  pointing: "above",
                }
              }
              placeholder="Date"
              name="signatureDate"
              value={values.signatureDate}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
