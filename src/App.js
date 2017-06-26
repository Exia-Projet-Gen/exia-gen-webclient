import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CreationForm from './CreationForm';
import SearchForm from './SearchForm';
import Topbar from './Topbar';
import Table from './Table';

class App extends Component {

    baseURI = "http://localhost:10080/dictionaryFacade-war/gen/dictionary/";
    urlToFetchDatas = this.baseURI;
    urlToSearchDatas = this.baseURI + "search/";
    urlToPostData = this.baseURI;
    urlToDeleteData = this.baseURI;

    constructor(props) {
        super(props);

        this.state = {
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
                    datas: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
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
                })
            })
            .catch((error) => {
                console.error(error);
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
                    })
                })
                .catch((error) => {
                    console.log("erreur");
                    console.error(error);
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
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    performDeleteRequest() {

        let isValid = null;
        if(this.state.selectedRow.id != -1) {
            fetch(this.urlToDeleteData + this.state.selectedRow.id, {
                method: "DELETE",
            })
                .then((responseJson) => {
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
                    isValid = true;
                })
                .catch((error) => {
                    console.log("toto");
                    console.log(error);
                    isValid = false;
                });

            return isValid;
        }

        // No row selected
        return false;
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>EXIA GEN DICTIONARY</h1>
            </div>
            <div className="container dictionary-container">
                <SearchForm performSearch={(pattern) => ( this.performSearchRequest(pattern) )} />
                <CreationForm
                    selectedWord={this.state.selectedRow}
                    performCreate={(pattern) => ( this.performCreateRequest(pattern) )}
                    performDelete={() => ( this.performDeleteRequest() ) }
                />
                <Table datas={ this.state.datas } selectedWord={this.state.selectedRow} selectRowAction={(selectedRow) => ( this.setState({selectedRow: selectedRow}) ) } />
            </div>
          </div>
        );
    }
}

export default App;
