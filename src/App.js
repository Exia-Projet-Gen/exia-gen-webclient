import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreationForm from './CreationForm';
import SearchForm from './SearchForm';
import Table from './DictionaryTable';
import FilesTable from './FilesTable';
import Topbar from './Topbar';
import AlertContainer from 'react-alert';
import FontAwesome from 'react-fontawesome';
import Loader from 'halogen/RingLoader';

class App extends Component {

    baseURI = "http://localhost:10080/exia-rest-crud/crud/dictionary/";
    urlToFetchDatas = this.baseURI;
    urlToSearchDatas = this.baseURI + "search/";
    urlToPostData = this.baseURI;
    urlToDeleteData = this.baseURI;
    urlToFetchFilesDatas = "http://localhost:10080/exia-rest-crud/crud/decodedFile/";

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            datas: [],
            filesDatas: [],
            activeTable: "dictionary",
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
                        value: ""
                    }
                });

                this.showAlert("info", responseJson.length + " words founds", "info");
            })
            .catch((error) => {
                this.showAlert("error", "An error occurred while fetching datas. Please, retry later", "bomb", 20000);
            });
    }

    performSearchFilesRequest() {

        const url = this.urlToFetchFilesDatas;

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    filesDatas: responseJson
                });

                this.showAlert("info", responseJson.length + " decoded files founds", "info");
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
                body: JSON.stringify({value: word})
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);
                    this.setState({
                        datas: this.state.datas.concat([{
                            id: responseJson.id,
                            value: responseJson.value
                        }]),
                    });

                    this.showAlert("success", "Word has been created successfully", "check");
                })
                .catch((error) => {
                    this.showAlert("error", "An error occurred while creating the Word " + word, "bomb");
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
                value: newValue
            })
        })
            .then((responseJson) => {

                const datas = this.state.datas;
                const index = datas.findIndex(item => item.id === word.id);

                this.setState({
                    datas: [
                        ...datas.slice(0,index),
                        {id: word.id, value: newValue},
                        ...datas.slice(index+1)
                    ],
                    selectedRow: {
                        id: -1,
                        value: ""
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
                          value: ""
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

    handleNavbarAction(btnActivated) {
        if (btnActivated === "files") {
            this.performSearchFilesRequest();
        }

        this.setState({
            activeTable: btnActivated
        });
    }

    alertOptions = {
        offset: 14,
        position: 'bottom right',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    };

    render() {

        let renderedDictionaryTable;
        renderedDictionaryTable = this.state.loading ? <Loader className="App-loader" color="#265a88" size="120px" margin="4px" /> : (
                    <Table datas={ this.state.datas } selectedWord={this.state.selectedRow} selectRowAction={(selectedRow) => ( this.setState({selectedRow: selectedRow}) ) } />
                 );

        let renderedFilesTable;
        renderedFilesTable = this.state.loading ? <Loader className="App-loader" color="#265a88" size="120px" margin="4px" /> : (
                <FilesTable datas={ this.state.filesDatas }  />
            );

        return (
          <div className="App">
            <div className="App-header">
              <h1>EXIA GEN DICTIONARY</h1>
            </div>
              <Topbar activeTable={this.state.activeTable} onClick={(activeTable) => (this.handleNavbarAction(activeTable))} />
              <div className="container dictionary-container">
                  {
                      this.state.activeTable === "dictionary" &&
                      <SearchForm performSearch={(pattern) => ( this.performSearchRequest(pattern) )} />
                  }
                  {
                      this.state.activeTable === "dictionary" &&
                      <CreationForm
                          selectedWord={this.state.selectedRow}
                          performCreate={(pattern) => ( this.performCreateRequest(pattern) )}
                          performDelete={() => ( this.performDeleteRequest() ) }
                      />
                  }

                  { this.state.activeTable === "dictionary" ? renderedDictionaryTable : renderedFilesTable}
                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
              </div>
          </div>
        );
    }
}

export default App;
