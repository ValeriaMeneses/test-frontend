import Table from 'react-bootstrap/Table';

export const TableComponent = ({ data }) => {
    return (
        <Table striped bordered hover size="sm" responsive>
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                </tr>
            </thead>
            <tbody>
                { data &&
                    data.map((employee:any) => {
                        return (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.last_name}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}

export default TableComponent;