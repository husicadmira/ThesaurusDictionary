import React, { Component } from 'react';
import { Form, FormControl, Button, Tooltip, Panel, Row, InputGroup, FormGroup, Glyphicon, OverlayTrigger, HelpBlock } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SynonimService from '../services/synonims.service'
import { List } from './components/list';

class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            word: '',
            newSynonim: '',
            synonims: [],
            duplicate: false,
            enableSynonims: false
        }

        this.handleWordChange = this.handleWordChange.bind(this)
        this.handleSynonimChange = this.handleSynonimChange.bind(this)
        this.handleWordSubmit = this.handleWordSubmit.bind(this)
        this.addSynonim = this.addSynonim.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

    handleWordChange(event) {
        const word = event.target.value;
        this.setState({
            word,
            enableSynonims: word.length > 0
        })
    }

    handleSynonimChange(event) {
        const newSynonim = event.target.value;
        this.setState({
            newSynonim
        })
    }

    addSynonim() {
        const newSynonim = this.state.newSynonim.trim();
        const duplicate = this.state.synonims.indexOf(newSynonim) > -1;
        const synonims = this.state.synonims.slice();
        this.setState({
            duplicate,
            synonims: duplicate ? synonims : [...synonims, newSynonim],
            newSynonim: duplicate ? newSynonim : ''
        })
    }

    async handleWordSubmit(event) {
        event.preventDefault();

        const response = await SynonimService.addWord(this.state.word.trim(), this.state.synonims);
        if (!response.status) {
            this.resetForm();
        }
        this.notify(response.message);
    }

    notify(message) {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    resetForm(event) {
        this.setState({
            word: '',
            newSynonim: '',
            synonims: [],
            duplicate: false,
            enableSynonims: false
        })
    }


    render() {
        const { word, newSynonim, duplicate, synonims } = this.state;

        const tooltip = (
            <Tooltip id="tooltip">
                If added word already exists in dictionary list of synonims will be extended with new synonims
            </Tooltip>
        );

        return (
            <div>
                <ToastContainer />
                <Panel bsStyle="primary">
                    <Panel.Heading>Add new word in dictionary
                        <OverlayTrigger placement="top" overlay={tooltip}>
                            <Glyphicon glyph="info-sign" className="pull-right" />
                        </OverlayTrigger>
                    </Panel.Heading>
                    <Panel.Body >
                        <Form id="add-form" onSubmit={this.handleWordSubmit}>
                            <FormGroup >
                                <FormControl
                                    id="add-input"
                                    type="text"
                                    placeholder="Enter word you want to add in dictionary"
                                    value={word}
                                    onChange={this.handleWordChange}
                                />
                            </FormGroup>
                            <hr></hr>

                            <h5><b>Add synonims for word here</b></h5>
                            <List items={synonims}></List>
                            <FormGroup>
                                <InputGroup>
                                    <FormControl
                                        id="add-synonim-input"
                                        type="text"
                                        disabled={word.trim().length === 0}
                                        placeholder="Enter synonim"
                                        value={newSynonim}
                                        onChange={this.handleSynonimChange}
                                    />
                                    <InputGroup.Button>
                                        <Button
                                            id="add-synonim-button"
                                            onClick={this.addSynonim}
                                            disabled={word.trim().length === 0 || newSynonim.trim().length === 0}>
                                            <Glyphicon glyph="plus" />
                                        </Button>
                                    </InputGroup.Button>
                                </InputGroup>

                                {
                                    duplicate &&
                                    <HelpBlock>
                                        This synonim is already added
                                    </HelpBlock>
                                }

                            </FormGroup>

                            <hr></hr>

                            <Row className="text-center">
                                <Button onClick={this.resetForm}>
                                    Reset form
                                </Button>
                                <Button
                                    id="add-word-button"
                                    type="submit"
                                    disabled={word.trim().length === 0}
                                    bsStyle="primary">
                                    Add word
                                </Button>
                            </Row>
                        </Form >

                    </Panel.Body>
                    <Panel.Footer>
                        <Link to={`/search`}>
                            Search dictionary
                       </Link>
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}

export default Add;


