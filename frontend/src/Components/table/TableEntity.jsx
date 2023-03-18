const TableEntity = ({...props}) => {

    const { column, entity } = props

  return (
    <td className="py-3 px-6 text-left">
        {!column?.colored ? (
            <span className="font-medium">{entity.attributes[column?.key]}</span>
        ) : (
            <span className={`${entity.attributes.statusColor} font-medium py-1 px-3 rounded-full text-xs`}>
                {entity.attributes.status}
            </span>
        )}
    </td>
  )
}

export default TableEntity
