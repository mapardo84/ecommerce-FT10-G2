export const SET_MODAL_STATE = 'SET_MODAL_STATE';


export const setModalState = (input:number) => {
    return {
        type: SET_MODAL_STATE,
        payload: input
    }
}