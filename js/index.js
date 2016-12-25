$(function(){
    var test = new Pseudo([
        {type:"create", args:{type:"var", class:"int", name:"beans", value:"0"}},
        {type:"loop", args:{type:"for-to", var:"i", start:0, end:10, lines:[
            {type:"if", args:{type:"<", name:"beans", value:5, lines:[
                {type:"set", args:{type:"+=", name:"beans", value:1}}
            ]}},
            {type:"else", args:{lines:[
                {type:"set", args:{type:"+=", name:"beans", value:2}}
            ]}}
        ]}},
        //{type:"create"}
    ]);

    test.view('.pseudo-viewer');
});
