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

    handleAction(pattern) {

        this.setState({
            pattern: ""
        });

        this.props.performCreate(pattern);
    }

    render() {

        const hasSelectedRow = this.props.selectedWord.id !== -1;
        const inputPlaceholder = hasSelectedRow ? "Update the word" : "Create a word";
        const btnVal = hasSelectedRow ? "Update" : "Create";

        return (
            <BForm horizontal className="col-sm-6">
                <FormGroup controlId="formHorizontalCreation">
                    <Col sm={10}>
                        <InputGroup>
                            <FormControl type="text" placeholder={inputPlaceholder} value={this.state.pattern} onChange={ this.loadPattern.bind(this) }/>
                            <InputGroup.Button>
                                <Button  bsStyle="primary" type="button" onClick={ () => ( this.handleAction(this.state.pattern) )}>
                                    {btnVal}
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                    <Col sm={1}>
                        <Button  bsStyle="danger" type="button" onClick={ () => ( this.props.performDelete() )} disabled={!hasSelectedRow}>
                            Delete
                        </Button>
                    </Col>
                </FormGroup>
            </BForm>
        );
    }
}

export default Form;