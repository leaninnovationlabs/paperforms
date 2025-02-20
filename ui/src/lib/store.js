import { create } from 'zustand';
import { DOCUMENT_TYPES } from './constants';
import { v4 as uuidv4 } from 'uuid';


const INIT = {
    allDocs: DOCUMENT_TYPES,
    selected: null,
    uploaded: null,
}

const useStore = create((set, get) => ({
    ...INIT,
    setSelected: (id) => {
        console.log((get().allDocs).filter(x => x.id === id))
        set(state => ({ ...state, selected: (get().allDocs).filter(x => x.id === id)[0] }))
    },
    setUploaded: (uploaded) => set(state => ({ ...state, uploaded })),

    setRule: (id, field, text) => set(state => {
        return {
            ...state,
            selected: {
                ...state.selected,
                rules: state.selected.rules.map(rule =>
                    rule.id === id
                        ? { ...rule, field, text }
                        : rule
                )
            }
        }
    }),

    addRule: () => set(state => {
        const id = uuidv4()
        const rules = state.selected.rules
        rules.push({
                id,
                field: "",
                text: ""
            })
        return {
            ...state,
            selected: {
                ...state.selected,
                rules
            }
        }
    }),

}))

export default useStore;