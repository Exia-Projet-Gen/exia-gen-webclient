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

    constructor(props) {
        super(props);

        this.state = {
            datas: []
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
                    datas: responseJson
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    performCreateRequest(word) {

        fetch(this.urlToPostData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
            },
            method: "POST",
            body: JSON.stringify({name: word})
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1>EXIA GEN FRENCH DICTIONARY</h1>
            </div>
            <Topbar/>
            <div className="container">
                <SearchForm performSearch={(pattern) => ( this.performSearchRequest(pattern) )} />
                <CreationForm performCreate={(pattern) => ( this.performCreateRequest(pattern) )} />
                <Table datas={ this.state.datas } />
            </div>
          </div>
        );
    }
}

export default App;
