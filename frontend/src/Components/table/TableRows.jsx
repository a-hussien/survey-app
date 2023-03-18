import Actions from "./Actions"
import TableEntity from "./TableEntity"

const TableRows = ({...props}) => {

    const {index, fetchUrl, data, columns, actions, refetchData} = props

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6 text-left whitespace-nowrap">
            <span className="font-medium">{index}</span>
        </td>
        {
            columns?.filter((column) => column.hasData).map((column, i) => (
                <TableEntity key={i} column={column} entity={data} />
            ))
        }
        <td className="py-3 px-6 text-center">
            <div className="flex item-center justify-center">
                {actions && (<Actions data={data.attributes} actions={actions} url={fetchUrl} refetchData={() => refetchData()} />)}
            </div>
        </td>
    </tr>
  )
}

export default TableRows
