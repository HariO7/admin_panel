const ROLE = {
    ADMIN: "admin",
    BASIC: "basic"
}


module.exports = {
    ROLE: ROLE,
    users:[
        {id:1,name:"jack", role: ROLE.ADMIN},
        {id:2,name:"jane", role: ROLE.BASIC},
        {id:3,name:"janet", role: ROLE.BASIC}
    ],
    projects:[
        {id:1,projects:"jacks project", userId:1},
        {id:2,projects:"jane project", userId:1},
        {id:3,projects:"janet project", userId:1}
    ] 

}
