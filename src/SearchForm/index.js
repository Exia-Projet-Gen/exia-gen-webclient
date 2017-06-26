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

    handleBtnClick(pattern, e) {

        e.preventDefault();

        return this.props.performSearch(pattern);
    }

    render() {
        return (
            <BForm inline className="col-sm-6" onSubmit={ (e) => ( this.handleBtnClick(this.state.pattern, e) ) }>
                <FormGroup controlId="formHorizontalSearch">
                    <Col sm={2}>
                        <Button  bsStyle="success" type="submit" onClick={ (e) => ( this.handleBtnClick("", e) )}>
                            Search all
                        </Button>
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl type="text" placeholder="Search a word" onChange={ this.loadPattern.bind(this) }/>
                            <InputGroup.Button>
                                <Button  bsStyle="success" type="submit" onClick={ (e) => ( this.handleBtnClick(this.state.pattern, e) )}>
                                    Search
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