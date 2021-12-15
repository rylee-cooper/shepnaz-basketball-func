import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

class TableData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first: 0,
            rows: 10,
            currentPage: 1
        };
        
    }

    getPaginationTemplate = () => {
        return {
            layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
            'RowsPerPageDropdown': (options) => {
                const dropdownOptions = [
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 50, value: 50 }
                ];

                return (
                    <React.Fragment>
                        <span style={{ color: '#343a40', userSelect: 'none' }}>Items per page: </span>
                        <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} appendTo={document.body} />
                    </React.Fragment>
                );
            },
            'CurrentPageReport': (options) => {
                return (
                    <span style={{
                        color: '#343a40',
                        userSelect: 'none',
                        width: '120px',
                        textAlign: 'center'
                    }}>
                        {options.first} - {options.last} of {options.totalRecords}
                    </span>
                );
            }
        };
    }

    render() {
        const {first, rows} = this.state;
        const { data, columns, handleSelection } = this.props;

        return (
            <DataTable
                value={data}
                responsiveLayout="scroll"
                stripedRows
                selectionMode="single"
                onSelectionChange={e => handleSelection(e.value)}
                dataKey="id"
                paginator
                paginatorTemplate={this.getPaginationTemplate()}
                first={first}
                rows={rows}>
                {columns.map(x =>
                    <Column field={x.field} key={x.field} header={x.header}></Column>
                )}
            </DataTable>
        );
    }
}

export default TableData;