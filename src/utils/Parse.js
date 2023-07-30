function parseDate(dateToParse){
    const date = Date.parse(dateToParse)

    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    const [day, month, year] = formattedDate.split('/');

    const tempDate = new Date(`${year}-${month}-${day}`);

    const monthName = tempDate.toLocaleString('en-GB', {month: 'long'});

    return `${day} ${monthName} ${year}`

}
export default parseDate