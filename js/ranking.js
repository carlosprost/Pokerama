const positions = document.getElementById('positions');
let gammerPosition = [
    {
        "position": "1",
        "name": "CAP",
        "points": "8" 
    },
    {
        "position": "1",
        "name": "CAP",
        "points": "8" 
    },
    {
        "position": "1",
        "name": "CAP",
        "points": "8" 
    },
    {
        "position": "1",
        "name": "CAP",
        "points": "8" 
    }
];



for(let gammer of gammerPosition){
    positions.innerHTML+= `
    <tr>
        <td>${gammer.position}</td>
        <td>${gammer.name}</td>
        <td>${gammer.points}</td>
    </tr>
    `;
}