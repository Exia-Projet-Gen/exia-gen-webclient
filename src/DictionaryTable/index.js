import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';

class Table extends Component {

    render() {

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                maxWidth: 50
            },
            {
                Header: 'Word',
                accessor: 'value',
            }
        ];

        const selectedWordId = this.props.selectedWord.id;

        return (
            <ReactTable
                data={this.props.datas}
                className="dictionaryTable verticalFixed col-sm-12 -highlight"
                columns={columns}
                defaultPageSize={10}
                defaultSorted={[{
                    id: 'word',
                    desc: false
                }]}
                getTrProps={(params, rowInfo) => {
                    let style = {};
                    if (rowInfo && rowInfo.row && rowInfo.row.id === selectedWordId) {
                        style = { backgroundColor: "#017ede" };
                    }
                    return {
                        style,
                        onClick: () => this.props.selectRowAction({
                            id: rowInfo.row.id,
                            value: rowInfo.row.value
                        })
                    };
                }}
            />
        );
    }
}

export default Table;