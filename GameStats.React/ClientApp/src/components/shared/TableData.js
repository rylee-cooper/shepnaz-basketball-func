import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';

const TableData = (props) => {
    const { data, columns, handleSelection } = props;
    const first = 0;
    const rows = 10;

    const getPaginationTemplate = () => {
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

    return (
        <DataTable
            value={data}
            responsiveLayout="scroll"
            stripedRows
            selectionMode="single"
            onSelectionChange={e => handleSelection(e.value)}
            dataKey="id"
            paginator
            paginatorTemplate={getPaginationTemplate()}
            first={first}
            rows={rows}>
            {columns.map(x =>
                <Column field={x.field} key={x.field} header={x.header}></Column>
            )}
        </DataTable>
    );
}

export default TableData;