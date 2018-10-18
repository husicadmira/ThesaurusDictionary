import React, { Component } from 'react';
import { Form, FormControl, Button, Panel, Col, Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SynonimService from '../services/synonims.service'
import { List } from './components/list'

class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            word: '',
            synonims: null
        }
        this.handleWordChange = this.handleWordChange.bind(this)
        this.searchDictionary = this.searchDictionary.bind(this)
        this.notify = this.notify.bind(this);
    }

    handleWordChange(event) {
        const word = event.target.value;
        this.setState({
            word,
            synonims: null
        });
    }

    resetForm() {
        this.setState({
            word: '',
            synonims: []
        })
    }

    async searchDictionary(event) {
        event.preventDefault();
        const response = await SynonimService.getSynonims(this.state.word.trim());
        if (response.synonims) {
            this.setState({ synonims: response.synonims });
            this.notify(`Synonims retrieved successfully.\n
             You can add more synonims for this word in Add page!`);
        }
        else this.notify(response.message)

    }

    notify(message) {
        toast.info(message, {
            position: toast.POSITION.BOTTOM_CENTER
        });
    }

    render() {
        const { word, synonims } = this.state;
        return (
            <div>
                <ToastContainer />
                <Panel bsStyle="primary">
                    <Panel.Heading>
                        Search dictionary
                    </Panel.Heading>

                    <Panel.Body>
                        <Form
                            id="search-form"
                            onSubmit={this.searchDictionary}>
                            <Col xs={10} sm={10} md={11}>
                                <FormControl
                                    id="search-input"
                                    type="text"
                                    placeholder="Enter word you want to find in dictionary"
                                    value={word}
                                    onChange={this.handleWordChange} />
                            </Col>
                            <Button
                                id="search-submit"
                                type="submit"
                                disabled={word.trim().length === 0}>
                                <Glyphicon glyph="search" />
                            </Button>
                        </Form >

                        <hr></hr>
                        <List items={synonims} search={true} />
                    </Panel.Body>

                    <Panel.Footer>
                        <Link to={`/add`}>
                            Add new word in dictionary
                        </Link>
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}


export default Search;
