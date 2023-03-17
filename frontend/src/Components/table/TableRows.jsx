import Actions from "./Actions"

const TableRows = ({...props}) => {

    const {fetchUrl, data, columns, actions, refetchData} = props

  return (
    <>
    {
        data?.length > 0 ?
        data?.map((dt, i) => (
            <tr key={i+1} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className="font-medium">{i+1}</span>
                </td>
                {
                    columns?.filter((column) => column.hasData).map((column, index) => (
                        <td key={index} className="py-3 px-6 text-left">
                            <span className="font-medium">{dt.attributes[column?.key]}</span>
                        </td>
                    ))
                }
                <td className="py-3 px-6">
                    <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">Active</span>
                </td>
                <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                        {actions && (<Actions data={dt.attributes} actions={actions} url={fetchUrl} refetchData={() => refetchData()} />)}
                    </div>
                </td>
            </tr>
        ))
        :
        (
            <tr className="h-16 text-lg font-medium text-center text-slate-100 bg-slate-500 drop-shadow-lg">
                <td colSpan={columns.length}>No Items Found.</td>
            </tr>
        )
    }
    </>
  )
}

export default TableRows
