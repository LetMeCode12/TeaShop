import React, { Component } from 'react'
import "./Filter.scss"
import { Form as Formm } from "react-bootstrap"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Input from '../Imput/Input';
import { Button } from 'react-bootstrap';

class Filter extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { onChange } = this.props;
        return (
            <div className="Filter">

               
                <Formik
                    initialValues={{ minPrice: undefined, maxPrice: undefined, minAmount: undefined, maxAmount: undefined }}
                    validate={(values) => {
                        console.log("1", values)
                        const errors = {}
                        if (!values.minPrice && values.maxPrice) {
                            errors.minPrice = "Pole nie jest wypełnione"
                        }
                        if (!values.maxPrice && values.minPrice) {
                            errors.maxPrice = "Pole nie jest wypełnione"
                        }

                        if (values.minPrice > values.maxPrice && values.minPrice && values.maxPrice) {
                            errors.maxPrice = "Wprowadzono złe wartości"
                            errors.minPrice = "Wprowadzono złe wartości"
                        }


                        if (values.minPrice === values.maxPrice && values.minPrice && values.maxPrice) {
                            errors.maxPrice = "Wprowadzono złe wartości"
                            errors.minPrice = "Wprowadzono złe wartości"
                        }

                        if (!values.minAmount && values.maxAmount) {
                            errors.minAmount = "Pole nie jest wypełnione"
                        }
                        if (!values.maxAmount && values.minAmount) {
                            errors.maxAmount = "Pole nie jest wypełnione"
                        }

                        if (values.minAmount > values.maxAmount && values.minAmount && values.maxAmount) {
                            errors.maxAmount = "Wprowadzono złe wartości"
                            errors.minAmount = "Wprowadzono złe wartości"
                        }


                        if (values.minAmount === values.maxAmount && values.minAmount && values.maxAmount) {
                            errors.maxAmount = "Wprowadzono złe wartości"
                            errors.minAmount = "Wprowadzono złe wartości"
                        }

                        return errors;
                    }}

                    onSubmit={(values) => {
                        Object.keys(values).forEach(e => {
                            onChange(e, values[e])
                        })
                    }}
                >

                    <Form className="Component">
                                <div className="MyField">

                                    <div className="d-flex flex-row justify-content-end">
                                        <span>Cena max: </span>
                                        <div className="d-flex flex-column ">
                                            <Field type="number" name="maxPrice" placeholder="Cena max" />
                                            <ErrorMessage name="maxPrice" />
                                        </div>
                                    </div>
                                </div>
                                <div className="MyField">
                                    <div className="d-flex flex-row justify-content-end">
                                        <span>Cena min: </span>
                                        <div className="d-flex flex-column ">
                                            <Field type="number" name="minPrice" placeholder="Cena min" />
                                            <ErrorMessage name="minPrice" />
                                        </div>
                                    </div>
                                </div>
                                <div className="MyField">

                                    <div className="d-flex flex-row justify-content-end">
                                        <span>Ilość max: </span>
                                        <div className="d-flex flex-column ">
                                            <Field type="number" name="maxAmount" placeholder="Ilość max" />
                                            <ErrorMessage name="maxAmount" />
                                        </div>
                                    </div>
                                </div>
                                <div className="MyField">
                                    <div className="d-flex flex-row justify-content-end">
                                        <span>Ilość min: </span>
                                        <div className="d-flex flex-column">
                                            <Field type="number" name="minAmount" placeholder="Ilość min" />
                                            <ErrorMessage name="minAmount" />
                                        </div>
                                    </div>
                                </div>
                                <Button className="btn btn-info" type="submit">Filtruj</Button>
                       
                    </Form>

                </Formik>
                <div className="Selector">
                    <span>Sortowanie: </span>
                    <Formm.Control as="select" onChange={(e) => onChange("sort", e.target.value)} >
                        <option selected value="Type">Typ towaru</option>
                        <option value="Price low">Cena od najniższej</option>
                        <option value="Price high">Cena od najwyższej</option>
                        <option value="Amount low">Ilość od najniższej</option>
                        <option value="Amount high">Ilość od najwyższej</option>
                    </Formm.Control>
                </div>
            </div>
        )
    }
}

export default Filter;
//przerobić bo robione na wykonczeniu
