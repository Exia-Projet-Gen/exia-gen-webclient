import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreationForm from './CreationForm';
import SearchForm from './SearchForm';
import Table from './Table';
import AlertContainer from 'react-alert';
import FontAwesome from 'react-fontawesome';
import Loader from 'halogen/RingLoader';

class App extends Component {

    baseURI = "http://localhost:10080/dictionaryFacade-war/gen/dictionary/";
    urlToFetchDatas = this.baseURI;
    urlToSearchDatas = this.baseURI + "search/";
    urlToPostData = this.baseURI;
    urlToDeleteData = this.baseURI;

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            datas: [],
            selectedRow: {
                id: -1,
                value: ""
            }
        }
    }

    componentDidMount() {
        fetch(this.urlToFetchDatas)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas: responseJson,
                    loading: false
                })
            })
            .catch((error) => {
                this.showAlert("error", "An error occurred while fetching datas. Please, retry later", "bomb", 20000);
            });
    }

    performSearchRequest(pattern) {

        const url = pattern ? this.urlToSearchDatas + pattern : this.urlToFetchDatas;

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas: responseJson,
                    selectedRow: {
                        id: -1,
                        name: ""
                    }
                });

                this.showAlert("info", responseJson.length + " words founds", "info");
            })
            .catch((error) => {
                this.showAlert("error", "An error occurred while fetching datas. Please, retry later", "bomb", 20000);
            });
    }

    performCreateRequest(word) {

        if ( this.state.selectedRow.id !== -1 ) {

            this.performUpdateRequest(word);

        } else {
            fetch(this.urlToPostData, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({name: word})
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        datas: this.state.datas.concat([{
                            id: responseJson.id,
                            name: responseJson.name
                        }]),
                    });

                    this.showAlert("success", "Word has been created successfully", "check");
                })
                .catch((error) => {
                    this.showAlert("error", "An error occurred while creating the Word " + word.name, "bomb");
                });
        }
    }

    performUpdateRequest(newValue) {
        const word = this.state.selectedRow;

        fetch(this.urlToPostData, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: word.id,
                name: newValue
            })
        })
            .then((responseJson) => {

                const datas = this.state.datas;
                const index = datas.findIndex(item => item.id === word.id);

                this.setState({
                    datas: [
                        ...datas.slice(0,index),
                        {id: word.id, name: newValue},
                        ...datas.slice(index+1)
                    ],
                    selectedRow: {
                        id: -1,
                        name: ""
                    }
                });
                this.showAlert("success", "Word has been updated successfully", "check");
            })
            .catch((error) => {
                this.showAlert("error", "An error occurred while updating the Word " + word.value, "bomb");
            });
    }

    performDeleteRequest() {

        let isValid = null;
        const deletedWord = this.state.selectedRow;

        if(this.state.selectedRow.id != -1) {
            fetch(this.urlToDeleteData + this.state.selectedRow.id, {
                method: "DELETE",
                mode:"*"
            })
                .then((response) => {
                    const updatedDatas = this.state.datas.filter((item) => {
                       return item.id !== this.state.selectedRow.id;
                    });
                    this.setState({
                        selectedRow: {
                          id: -1,
                          name: ""
                        },
                        datas: updatedDatas
                    });

                    this.showAlert("success", "Word has been deleted successfully", "check");
                    isValid = true;
                })
                .catch((error) => {
                    this.showAlert("error", "An error occurred while deleting the Word " + deletedWord.value, "bomb");
                    isValid = false;
                });

            return isValid;
        }

        // No row selected
        return false;
    }


    showAlert(type, message, iconName, time = 5000) {

        let color;
        switch (type) {
            case "success":
                color= "#5cb85c";
                break;
            case "error":
                color= "#c12e2a ";
                break;
            case "info":
                color= "#eeeeee";
                break;
        }
        this.msg.show(message, {
            type: type,
            time: time,
            icon: <FontAwesome
                name={iconName}
                size='3x'
                style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', color: color}}
            />
        })
    }

    alertOptions = {
        offset: 14,
        position: 'bottom right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    };

    render() {

        let renderedTable;
        renderedTable = this.state.loading ? <Loader className="App-loader" color="#265a88" size="120px" margin="4px" /> : (
                    <Table datas={ this.state.datas } selectedWord={this.state.selectedRow} selectRowAction={(selectedRow) => ( this.setState({selectedRow: selectedRow}) ) } />
                 );

        return (
          <div className="App">
            <div className="App-header">
              <h1>EXIA GEN DICTIONARY</h1>
            </div>
              <div className="container dictionary-container">
                  <SearchForm performSearch={(pattern) => ( this.performSearchRequest(pattern) )} />
                  <CreationForm
                      selectedWord={this.state.selectedRow}
                      performCreate={(pattern) => ( this.performCreateRequest(pattern) )}
                      performDelete={() => ( this.performDeleteRequest() ) }
                  />
                  { renderedTable }
                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
              </div>
          </div>
        );
    }
}

export default App;
