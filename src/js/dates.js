let dates = []


const getDates = () => dates

// if needSeparateEachCharacter is true, each date object should countain one character object as property
// if not, each date object should contain characters array instead
const initDates = (sortedCharacters, needSeparateEachCharacter) => {
    dates = []
    let dateObj = null

    sortedCharacters.forEach((character) => {
        const [month, date] = character.birthday.split('/')
        const needsToPushSameCharacter = dateObj && !needSeparateEachCharacter

        if (needsToPushSameCharacter) {
            dateObj.characters.push(character)
        } else {
            dateObj = { month, date }

            needSeparateEachCharacter ? 
                dateObj.character = character :
                dateObj.characters = [character]

            dates.push(dateObj)
        }
    })
}


const generateDates = (sortedCharacters) => {
    initDates(sortedCharacters)
    return dates
}


const getFilteredDates = ({ month, date }) => {
    if (month) dates = dates.filter((dateObj) => dateObj.month === month)
    if (date) dates = dates.filter((dateObj) => dateObj.date === date)
    return dates
}




export { generateDates, getFilteredDates, initDates, getDates }