import moment from 'moment'


const calcFromNow = (month, date) => {
    const currentMonth = moment().month() + 1
    const currentDate = moment().date()
    const currentYear = moment().year()
    const year = month > currentMonth ? currentYear 
                : month === currentMonth && date >= currentDate ? currentYear
                : currentYear + 1
                
    const target = moment([year, month - 1, date])
    const today = moment()
    var duration = moment.duration(target.diff(today))

    return Math.round(duration.asDays())
}

const lastDateOf = (month) => {
    if (!typeof month === 'number' || month < 1 || month > 12) return 

    const numberOfDates = {
        31: [1, 3, 5, 7, 8, 10, 12],
        30: [4, 6, 9, 11],
        29: [2]
    }

    for(let lastDate in numberOfDates) {
        if (numberOfDates[lastDate].includes(month)) return lastDate
    }
}


export { calcFromNow, lastDateOf}