const Loading = ({model}) => {
    return (
        <>
        {
            (model === 'table') ? (
            <tr className="bg-black/70">
                <td colSpan="5" className="text-center px-4 py-5 sm:px-6 text-purple-300 drop-shadow-md font-medium">
                    Loading...
                </td>
            </tr>):(
            <div className="text-center px-4 py-5 sm:px-6 text-purple-300 drop-shadow-md font-medium">
                <span>
                    Loading...
                </span>
            </div>)
        }
        </>
    )
}

export default Loading
