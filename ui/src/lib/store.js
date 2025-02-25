import { create } from 'zustand';
import { DOCUMENT_TYPES } from './constants';


const INIT = {
    allDocs: DOCUMENT_TYPES,
    scope: null, // Selected file
    file: null, // Uploaded File

    rules: "",
    fields: ""
}

const useStore = create((set, get) => ({
    ...INIT,
    setScope: (id) => set(state => {
        const scope = (get().allDocs).filter(x => x.id === id)[0]
        return ({ ...state, scope, rules: scope.defaultRules, fields: scope.defaultFields })
    }),
    setFile: (file) => set(state => ({ ...state, file })),

    setRules: (rules) => set(state => ({ ...state, rules })),
    setFields: (fields) => set(state => ({ ...state, fields })),

}))

export default useStore;