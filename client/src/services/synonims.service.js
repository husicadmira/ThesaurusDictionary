import axios from 'axios'

const getSynonims = async (term) => {
    try {
        const response = await axios.get(`/dictionary/${term}`)
        return response.data
    }
    catch (error) {
        return error.response.data
    }
}


const addWord = async (word, synonims) => {
    try {
        const response = await axios.post(`/dictionary`, { word, synonims })
        return response.data
    }
    catch (error) {
        return { ...error.response.data, ...error.response.status }
    }
}

export default {
    getSynonims,
    addWord
}