let form = document.getElementById('raceForm');
console.log(form)

async function handleSubmit(e){
    e.preventDefault();
    console.log(e);
    let year = e.target.year.value;
    let season = e.target.season.value;
    // Here is where we will make the request to get the data
    
    let table1 = await getRacingInfo(year, season);
    // console.log(table1.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.driverId);


    // Here is where we will build the element to display
    await buildTable(table1);
    e.target.year.value = '';
    e.target.season.value = '';
}
async function getRacingInfo(year, season){
    try{
        let res = await fetch(`https://ergast.com/api/f1/${year}/${season}/driverStandings.json`)
        let data = await res.json()
        return data
    } catch(e){
        console.error(e)
    }
}

async function buildTable(table1){
    //find total users and set to variable for ease
    var userList = table1.MRData.StandingsTable.StandingsLists[0].DriverStandings
    var temp = table1.MRData.StandingsTable.StandingsLists
    // grab the table body to append data too
    const containData = document.getElementById('toAddJava')
    const title = document.getElementById('title')
    // title.innerHTML(`<tr><th>season: ${temp.season}, round:${temp.round}</th></tr>`)
    // my attempt at a prepend header

    // loop throgh user
    for (let i = 0; i < userList.length; i++){
        x = userList[i]
        // add to tablebody

        containData.innerHTML += `<tr><td>${x.position}</td><td>${x.Driver.driverId}</td><td>${x.Constructors[0].constructorId}</td><td>${x.points}</td><td>${x.wins}</td></tr>`
    }

}    
    



form.addEventListener('submit', handleSubmit);
