export const levelConf = {
    easy:{
        row:5,
        col:5,
    },
    normal:{
        row:6,
        col:5,
    },
    hard:{
        row:7,
        col:5,
    }
}
export const width = 100;

export const height = 100;

export const corner = ['START','JAIL','VACATION','AIRPORT'];

export const building = [
    'villa',
    'condo',
    'cottage',
    'factory',
    'townhome',
];

export const tools = [
    'treasure',
    'surprise',
    'incometax',
    'remove',
    ...building
];

export const isCorner = (i,j,row,col) =>{
    const judge = [
        i === 0 && j === 0,
        i >= row - 1 && j === 0,
        i >= row - 1 && j >= col - 1,
        i === 0 && j >= col - 1,
    ]

    for(let i=0;i < judge.length;i++){
        if(judge[i]) return i;
    }

    return false;
}

export const mapListName = 'monopoly';

export const randomName = [
    "New York",
    "London",
    "Paris",
    "Tokyo",
    "Beijing",
    "Berlin",
    "Moscow",
    "Sydney",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Philadelphia",
    "Barcelona",
    "Rome",
    "Amsterdam",
    "Melbourne",
    "Vancouver",
    "Toronto",
    "Seoul",
    "Singapore",
    "Cairo",
    "Delhi",
    "Mumbai",
    "Rio de Janeiro",
    "Buenos Aires",
    "Cape Town",
    "Johannesburg",
    "Dubai",
    "Istanbul",
    "Athens",
    "Madrid",
    "Stockholm",
    "Helsinki",
    "San Francisco",
    "Boston",
    "Miami",
    "Seattle",
    "Perth",
    "Canberra",
    "Adelaide",
    "Melbourne",
    "Brussels",
    "Prague",
    "Budapest",
    "Warsaw",
    "Vienna",
    "Lisbon",
    "Oslo",
    "Copenhagen",
    "Bangkok",
    "Kuala Lumpur",
    "Jakarta",
    "Manila",
    "Pyongyang",
    "Taipei",
    "Hong Kong",
    "Shanghai",
    "Shenzhen",
    "Guangzhou",
    "Cairo",
    "Alexandria"
]