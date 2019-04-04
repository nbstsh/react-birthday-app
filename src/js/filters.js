const filters = {
    month: '',
    date: '',
    name: '' 
}

const setFilters = ({ month, date, name }) => {
    const isValidMonth = typeof month === 'number' && month >= 1 && month <= 12 
    const isValideDate = typeof date === 'number' && date >= 1 && date <= 31

    if (isValidMonth || month === '') {
        filters.month = month
    }

    if (isValideDate || date === '') {
        filters.date = date
    }

    if (typeof name === 'string') {
        filters.name =name
    }
}

const getFilters = () => filters


export { setFilters, getFilters }

