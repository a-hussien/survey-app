const TableEntity = ({...props}) => {

    const { column, entity } = props

    // TODO:
    // Fix: entity.attributes.statusColor

  return (
    <td className="py-3 px-6 text-left">
        {!column?.colored ? (
            <span className="font-medium">{entity.attributes[column?.key]}</span>
        ) : (
            <span className={`font-medium py-1 px-3 rounded-full text-xs ${entity.attributes.status === 'Active' ? 'active-user':'in-active-user'}`}>
                {entity.attributes.status}
            </span>
        )}
    </td>
  )
}

export default TableEntity
