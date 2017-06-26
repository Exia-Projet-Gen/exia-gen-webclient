import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './style.css';

class Table extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const columns = [
            {
                Header: 'Id',
                accessor: 'id',
            },
            {
                Header: 'Word',
                accessor: 'name',
            }
        ];

        return (
            <ReactTable
                data={this.props.datas}
                className="verticalFixed"
                columns={columns}
                defaultPageSize={10}
                defaultSorted={[{
                    id: 'word',
                    desc: false
                }]}
            />
        );
    }
}

export default Table;