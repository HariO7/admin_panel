const ROLE =  {
    ADMIN: 'admin',
    BASIC: 'basic'
}

module.exports = {
    ROLE: ROLE,
    users:[
        {id:"1", name:"jack", role: ROLE.ADMIN},
        {id:"2", name:"mary", role: ROLE.BASIC},
        {id:"3", name:"janet", role: ROLE.BASIC},
    ],
    projects:[
        {id:"1", name:"jack project", userId:1},
        {id:"2", name:"mary project ", userId:2},
        {id:"3", name:"janet project ", userId:3}
    ]
}