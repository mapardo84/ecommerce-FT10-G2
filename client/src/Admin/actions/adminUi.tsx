export const SIDEBAR_VIEW = 'SIDEBAR_VIEW'
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const sidebarChange = () => ({
    type: SIDEBAR_VIEW
})

export const changePage = (page: string) => ({
    type: CHANGE_PAGE,
    payload: page,
})
