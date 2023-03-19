import { Link } from "react-router-dom"
import axiosClient from "../../api/axios"
import toast from "react-hot-toast"
import { Confirm } from "notiflix/build/notiflix-confirm-aio"

const Actions = ({...props}) => {

    const { url, data, actions, refetchData } = props

    const RemoveItem = (e, data) => {
        e.preventDefault()
        Confirm.show(
            'Delete Confirmation',
            `Are you sure you want to delete <b>${data.name}</b>?`,
            'Yes',
            'No',
            async () => {
                await axiosClient.delete(`${url}/${data.uuid}`)
                .then(() => {
                    toast.success('Item deleted!')
                })
                .finally(() => {
                    refetchData()
                })
            },
            () => {
                return
            },
            {
                titleColor: '#eb4d4b',
                okButtonBackground: '#ff7675',
                cssAnimationStyle: 'zoom',
                plainText: false,
            }
        )
    }
  return (
    <div className="flex item-center justify-center">
        {
            actions.map((action) => (
            <div key={action.name} className="w-4 mr-2 transform hover:scale-110 transition-transform duration-200 cursor-pointer">
                {
                    action.hasLink ?
                    (
                        <Link to={`${url}/${data.uuid}`}>
                            {action.icon}
                        </Link>
                    ):(
                        <a href="#" onClick={(e) => RemoveItem(e, data)} >
                            {action.icon}
                        </a>
                    )
                }
            </div>
            ))
        }
    </div>
  )
}

export default Actions
