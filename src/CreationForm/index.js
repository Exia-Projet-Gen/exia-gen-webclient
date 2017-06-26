import React, { Component } from 'react';
import {Form as BForm, FormGroup, FormControl, Col, Button, InputGroup } from 'react-bootstrap';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            pattern: ""
        }
    }

    loadPattern(event) {
        let fieldVal = event.target.value;
        this.setState({
            pattern: fieldVal
        });
    }

    render() {
        return (
            <BForm horizontal className="col-sm-6">
                <FormGroup controlId="formHorizontalCreation">
                    <Col sm={12}>
                        <InputGroup>
                            <FormControl type="text" placeholder="Create a word" onChange={ this.loadPattern.bind(this) }/>
                            <InputGroup.Button>
                                <Button type="button" onClick={ () => ( this.props.performCreate(this.state.pattern) )}>
                                    Create
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </FormGroup>
            </BForm>
        );
    }
}

export default Form;