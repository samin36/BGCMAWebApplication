import React from "react";
import { Form, Container, Icon, Header } from "semantic-ui-react";
import * as yup from "yup";
import {Field, Formik} from "formik";
import { Persist } from "formik-persist";
import { dateRegex } from "../../Regex/regex";
import {
    paragraph1,
    paragraph2,
    paragraph3,
    paragraph4,
    paragraph5,
    paragraph6,
    paragraph7
} from "../../PageText/page7text";

/**
 * Pass in prevStep if the page number >= 1
 */
const Page7 = ({ nextStep, prevStep, setFormStates }) => {
    const pageNo = 7; //Define the page number here
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
        staffVisitorParentOrGuardianInitials: "",
        staffVisitorParentOrGuardianName: "",
        agreementDate: "",
        staffVisitorChildName: "",
        memberAssessmentBool: true
    };

    const validationSchema = yup.object().shape({
        staffVisitorParentOrGuardianInitials: yup
            .string()
            .max(3, "Initials cannot be more than 3 characters")
            .required("Initials are required"),
        staffVisitorParentOrGuardianName: yup.string().required("Parent Name is required"),
        agreementDate: yup
            .string()
            .required("Date is required as MM/DD/YYYY")
            .matches(dateRegex, "Date must be in the form MM/DD/YYYY"),
        staffVisitorChildName: yup
            .string()
            .required("Child's Name is Required"),
    });

    return (
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                // as long as the current page isn't the one that submits the data, keep the stuff below
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
              }) => (
                <Container textAlign="center">
                    {/* {JSON.stringify(values, null, 2)} */}
                    <Header textAlign="center" as="h1">
                        <b>
                            Member Assessment Permission Form
                        </b>
                    </Header>
                    <Header as="h3" textAlign="left">
                        {paragraph1}
                        {paragraph2}
                    </Header>
                    <Form size="big">
                        <Form.Group>
                            <Form.Input
                                icon={<Icon name="asterisk" size="small" color="red" />}
                                error={
                                    touched.staffVisitorParentOrGuardianInitials &&
                                    errors.staffVisitorParentOrGuardianInitials !== undefined && {
                                        content: errors.staffVisitorParentOrGuardianInitials,
                                        pointing: "above",
                                    }
                                }
                                placeholder="Parent/Guardian Initials"
                                name="staffVisitorParentOrGuardianInitials"
                                value={values.staffVisitorParentOrGuardianInitials}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Field as="select" name="memberAssessments">
                                <option value={true}> I give permission for my child to participate in Member Assessments. </option>
                                <option value={false}>I DO NOT give permission for my child to participate in Member Assessments</option>
                                value={values.memberAssessmentBool}
                            </Field>
                        </Form.Group>
                    </Form>
                    <Header as="h3" textAlign="left">
                        {paragraph3}
                        {paragraph4}
                        {paragraph5}
                        {paragraph6}
                        {paragraph7}
                    </Header>
                    <Form>
                        <Form.Group widths="equal">
                            <Form.Input
                                icon={<Icon name="asterisk" size="small" color="red" />}
                                error={
                                    touched.staffVisitorChildName &&
                                    errors.staffVisitorChildName !== undefined && {
                                        content: errors.staffVisitorChildName,
                                        pointing: "above",
                                    }
                                }
                                placeholder="Child's Name"
                                name="staffVisitorChildName"
                                value={values.staffVisitorChildName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Input
                                icon={<Icon name="asterisk" size="small" color="red" />}
                                error={
                                    touched.staffVisitorParentOrGuardianName &&
                                    errors.staffVisitorParentOrGuardianName !== undefined && {
                                        content: errors.staffVisitorParentOrGuardianName,
                                        pointing: "above",
                                    }
                                }
                                placeholder="Parent or Guardian Name"
                                name="staffVisitorParentOrGuardianName"
                                value={values.staffVisitorParentOrGuardianName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Form.Input
                                icon={<Icon name="asterisk" size="small" color="red" />}
                                error={
                                    touched.agreementDate &&
                                    errors.agreementDate !== undefined && {
                                        content: errors.agreementDate,
                                        pointing: "above",
                                    }
                                }
                                placeholder="Date"
                                name="agreementDate"
                                value={values.agreementDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Group>
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

export default Page7;