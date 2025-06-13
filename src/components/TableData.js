import { useState } from 'react';

const TableData = ({isSelectable,tableColumns, tableRows}) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleCheckboxChange = (rowId) => {
        setSelectedRows(prev => {
            if (prev.includes(rowId)) {
                return prev.filter(id => id !== rowId);
            } else {
                return [...prev, rowId];
            }
        });
    };

    return (
        <div className="table-data">
            <table>
                <thead>
                    <tr>
                        {isSelectable && <th>
                            <input 
                                type="checkbox"
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedRows(tableRows.map((_, index) => index));
                                    } else {
                                        setSelectedRows([]);
                                    }
                                }}
                                checked={selectedRows.length === tableRows?.length}
                            />
                        </th>}
                        {tableColumns && tableColumns.length > 0? tableColumns.map((column) => (
                            column
                        )): null}
                    </tr>
                </thead>
                <tbody>
                    {tableRows && tableRows.length > 0? tableRows.map((row, index) => (
                        <tr key={index}>
                            {isSelectable && <td>
                                <input 
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                            </td>}
                            {row && row.length > 0? row.map((cell) => (
                                cell
                            )): null}
                        </tr>
                    )): null}
                </tbody>
            </table>
        </div>
    )
}

export default TableData;