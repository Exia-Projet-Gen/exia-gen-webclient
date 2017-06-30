import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';

class FilesTable extends Component {

    render() {

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
                maxWidth: 50
            },
            {
                Header: 'Key',
                accessor: 'key',
                maxWidth: 110,
                filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
            },
            {
                Header: 'File name',
                accessor: 'fileName',
                maxWidth: 150,
                filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
            },
            {
                Header: 'Ratio of french words',
                accessor: 'matchPercent',
                maxWidth: 50,
                Cell: row => (
                    Math.round(row.value * 100) / 100
                )
            },
            {
                Header: 'Mails found',
                accessor: 'mailAddress',
                filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
            },
            {
                Header: 'First words',
                accessor: 'decodedText',
                filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
            }
        ];

        return (
            <ReactTable
                data={this.props.datas}
                className="dictionaryTable verticalFixed col-sm-12 -highlight"
                columns={columns}
                defaultPageSize={10}
                defaultSorted={[{
                    id: 'id',
                    desc: true
                }]}
                filterable
            />
        );
    }
}

export default FilesTable;