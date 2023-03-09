export const Paginator = ({ pagination, pageChanged }) => {

    const { links } = pagination

    const onPageChange = (e, link) => {
        e.preventDefault()

        link.label.includes('Next') ?
        pageChanged(pagination.current_page + 1) :
        link.label.includes('Previous') ?
        pageChanged(pagination.current_page - 1) :
        pageChanged(link.label)
    }

    return (
    <div className='flex w-full items-center my-8 gap-x-6'>
        <div className="font-medium text-indigo-800 ml-2">
            <span>{`Showing ${pagination.from} to ${pagination.to} of ${pagination.total} entries`}</span>
        </div>
    {
        pagination.last_page > 1 && (
            <div className="mx-auto">
                {
                    links?.map((link, i) => (
                        <a
                        key={i+1}
                        href="#"
                        aria-current="page"
                        className="mx-1"
                        onClick={(e) => onPageChange(e, link)}
                        >
                            <button
                            className={`${link.active ? 'btn-active' : 'btn-primary'} ${!link.url ? 'disabled:opacity-50' : ''}`}
                            disabled={!link.url ? 'disabled' : ''}
                            >
                                { link.label.replace(link.label.match(/(&raquo;|&laquo;)/g), '' ) }
                            </button>
                        </a>
                    ))
                }
            </div>
        )
    }
    </div>
  )
}
