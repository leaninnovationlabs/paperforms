import { create } from 'zustand';
import { DOCUMENT_TYPES } from './constants';


const INIT = {
    allDocs: DOCUMENT_TYPES,
    selected: null
}

const useStore = create((set, get) => ({
    ...INIT,
    setSelected: (id) => {
        console.log((get().allDocs).filter(x => x.id === id))
        set(state => ({...state, selected: (get().allDocs).filter(x => x.id === id)[0]}))
    }
}))

export default useStore;