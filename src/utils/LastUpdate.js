import parseDate from "./Parse";


function updateTime(){
    let d = new Date()
    const lastUpdate = parseDate(d)
    return `${lastUpdate}  ${d.getHours()}:${d.getMinutes()}`
}

export default updateTime