export const getTime = (date: string) => {

    const dateParsNumber = Date.parse(date)
    let day = new Date(dateParsNumber).getDay()
    let month = new Date(dateParsNumber).getMonth()
    let year = new Date(dateParsNumber).getFullYear()
    let hours = new Date(dateParsNumber).getHours()
    let minutes = new Date(dateParsNumber).getMinutes()
    return `${day < 10 ? 0 : ''}${day}.${month !== 12 ? month + 1 : month}.${year} ${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`
}