import { create } from 'zustand';
import { DOCUMENT_TYPES } from './constants';
import { ocr, validate } from '@/lib/api';


const INIT = {
    allDocs: DOCUMENT_TYPES,
    scope: null, // Selected file
    file: null, // Uploaded File

    rules: "",
    fields: "",

    results: null,
    isThinking: false
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

    generate: async () => {
        set(state => ({ ...state, isThinking: true }))

        try {
            const ocrRes = await ocr(get().fields, get().file)
            const validateRes = await validate(get().rules, ocrRes.response)
            set(state => ({ ...state, results: validateRes.response }))
        }
        catch(e) {
            console.error(e)
        }
        finally {
            set(state => ({ ...state, isThinking: false }))
        }


    }

}))

export default useStore;