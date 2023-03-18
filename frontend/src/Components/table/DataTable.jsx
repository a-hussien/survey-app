import { useEffect, useRef, useState } from "react"
import { debounce } from "lodash"
import { Paginator } from "./Paginator"
import axiosClient from "../../api/axios"
import { Block } from "notiflix/build/notiflix-block-aio"
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from "react-icons/fc"
import { AiOutlineSearch } from "react-icons/ai"
import TableRows from "./TableRows"

const SORT_ASC = "ASC"
const SORT_DESC = "DESC"

const DataTable = ({...props}) => {

    const { fetchUrl, columns, actions } = props

    const [data, setData] = useState([])
    const [perPage, setPerPage] = useState(10)
    const [sortColumn, setSortColumn] = useState(columns[0].key)
    const [sortOrder, setSortOrder] = useState(SORT_ASC)
    const [search, setSearch] = useState("")
    const [pagination, setPagination] = useState({})
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        fetchData()
    }, [perPage, sortColumn, sortOrder, search, currentPage])

    // handle Sort
    const handleSort = (e, column) => {
        e.preventDefault()
        if(!column.sortable){
            return
        }

        if (column.key === sortColumn) {
            sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
        } else {
            setSortColumn(column.key)
            setSortOrder(SORT_ASC)
        }
    }

    // handle Search
    const handleSearch = useRef(
        debounce((query) => {
            setSearch(query)
            setCurrentPage(1)
            setSortOrder(SORT_ASC)
            setSortColumn(columns[0].key)
        }, 500)
    ).current

    // handle perPage
    const handlePerPage = (perPage) => {
        setCurrentPage(1)
        setPerPage(perPage)
    }

    const fetchData = async () => {
        Block.circle('.data__table')
        const params = {
            search,
            sort_field: sortColumn,
            sort_order: sortOrder,
            per_page: perPage,
            page: currentPage,
        }

        await axiosClient.get(fetchUrl, { params })
        .then(({data}) => {
            setData(data.data)
            setPagination(data.meta)
        })
        .finally(() => {
            Block.remove('.data__table')
        })
    }

  return (
    <div className="px-4">
        <div className="flex flex-row-reverse justify-between items-center bg-slate-100 rounded-md px-4 py-5 sm:px-6">
            <div className="flex items-center justify-center">
                <AiOutlineSearch className="-mr-6 z-50 text-gray-500" />
                <input
                    className="rounded-lg border-none pl-7"
                    placeholder="Search..."
                    type="search"
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
            <div className="flex items-center justify-center gap-x-2">
                <label className="text-slate-600 text-sm">Pages</label>
                <select className="rounded-lg border-none cursor-pointer" value={perPage} onChange={(e) => handlePerPage(e.target.value)}>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>

        <div className="overflow-x-auto data__table">
            <div className="flex items-center font-sans overflow-hidden">
                <div className="w-full py-4">
                    <div className="bg-white shadow-md">
                        <table className="min-w-max w-full table-auto">
                            <thead>
                                <tr className="bg-slate-300 text-slate-600 uppercase text-sm leading-normal">
                                    {columns?.map((column) => (
                                        <th className={`p-3 text-left ${column.sortable ? 'cursor-pointer' : ''}`} key={column.header} onClick={(e) => handleSort(e, column)}>
                                            {column.sortable && column.key === sortColumn && (
                                                <span className="inline-block float-left">
                                                    {sortOrder === SORT_ASC ? (
                                                        <FcAlphabeticalSortingAz className="w-5 h-5" />
                                                    ) : (
                                                        <FcAlphabeticalSortingZa className="w-5 h-5" />
                                                    )}
                                                </span>
                                            )}
                                            <span className="pl-2">
                                                {column.header.toUpperCase().replace("_", " ")}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="text-gray-600 text-sm font-light">
                            {
                                data?.length > 0 ?
                                data?.map((dt, i) => (
                                    <TableRows
                                        key={i+1}
                                        index={i+1}
                                        fetchUrl={fetchUrl}
                                        data={dt}
                                        columns={columns}
                                        actions={actions}
                                        refetchData={() => fetchData()}
                                    />
                                ))
                                :
                                (
                                    <tr className="h-16 text-lg font-medium text-center text-slate-100 bg-slate-500 drop-shadow-lg">
                                        <td colSpan={columns.length}>No Items Found.</td>
                                    </tr>
                                )
                            }
                            </tbody>

                        </table>
                    </div>
                    {data?.length > 0 &&
                        (<Paginator pagination={pagination} pageChanged={(page) => setCurrentPage(page)} />)
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default DataTable
