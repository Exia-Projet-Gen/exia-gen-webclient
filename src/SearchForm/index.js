import React, { Component } from 'react';
import {Form as BForm, FormGroup, FormControl, Col, Button, InputGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

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

        if (pattern === "") {
            this.setState({
               pattern: ""
            });
        }

        return this.props.performSearch(pattern);
    }

    render() {
        return (
            <BForm inline className="col-sm-6" onSubmit={ (e) => ( this.handleBtnClick(this.state.pattern, e) ) }>
                <FormGroup controlId="formHorizontalSearch" className="col-sm-12">
                    <Col sm={2}>
                        <Button  bsStyle="success" type="submit" onClick={ (e) => ( this.handleBtnClick("", e) )}>
                            <FontAwesome
                                name="refresh"
                                size='lg'
                                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                            />
                        </Button>
                    </Col>
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl type="text" placeholder="Search a word" value={this.state.pattern} onChange={ this.loadPattern.bind(this) }/>
                            <InputGroup.Button>
                                <Button  bsStyle="success" type="submit" onClick={ (e) => ( this.handleBtnClick(this.state.pattern, e) )}>
                                    <FontAwesome
                                        name="search"
                                        size='lg'
                                        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginRight: '8px'}}
                                    />
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