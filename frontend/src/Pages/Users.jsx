import { Link } from "react-router-dom"
import PageComponent from "../Components/PageComponent"
import { AiOutlineUserAdd } from "react-icons/ai"
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi"
import DataTable from "../Components/table/DataTable"

const Users = () => {

    // prepare columns for users datatable
   const columns = [
    {
        header: '#',
        key: 'id',
        sortable: false,
        hasData: false,
    },
    {
        header: 'Name',
        key: 'name',
        sortable: true,
        hasData: true,
    },
    {
        header: 'Email',
        key: 'email',
        sortable: true,
        hasData: true,
    },
    {
        header: 'Created Date',
        key: 'created_at',
        sortable: true,
        hasData: true,
    },
    {
        header: 'Status',
        key: 'status',
        sortable: false,
        hasData: true,
        colored: true,
    },
    {
        header: 'Actions',
    },
   ]

   const actions = [
    {
        name: 'edit',
        icon: <HiPencilAlt className="w-4 h-4 text-gray-400 hover:text-purple-500" />,
        hasLink: true,
    },
    {
        name: 'delete',
        icon: <HiOutlineTrash className="w-4 h-4 text-gray-400 hover:text-red-500" />,
        hasLink: false,
    },
   ]

  return (
    <PageComponent title="Users">
        <section className="flex flex-col gap-y-6">

            <div className="overflow-hidden bg-white drop-shadow-lg sm:rounded-lg">

                <div className="flex items-center justify-end px-4 py-5 sm:px-6">
                    <button className="group relative flex justify-center items-center rounded-md border border-transparent bg-emerald-400 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                        <span className="absolute inset-y-0 left-1 flex items-center">
                            <AiOutlineUserAdd className="h-5 w-5 text-emerald-200 group-hover:text-emerald-100" aria-hidden="true" />
                        </span>
                        <Link to="/users/create" className="ml-2">Create</Link>
                    </button>
                </div>

                <DataTable fetchUrl="/users" columns={columns} actions={actions} />

            </div>
        </section>
    </PageComponent>
  )
}

export default Users
