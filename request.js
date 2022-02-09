var a=require("readline-sync")
var fs=require('fs');
const axios=require('axios')
var link="https://api.merakilearn.org/courses"
axios.get(link)
.then(response=>{
    var DATA=response.data
    var myJSON=JSON.stringify(DATA,null,4);
    fs.writeFileSync("meraki data.json",myJSON)
    arr=[]
    serial_no=1
    for (i of DATA){
        console.log(serial_no+1,".",i["name"],i["id"])
        arr.push(i["name"],i["id"])
        serial_no++
    }
    var user_input =a.questionInt("Enter your courses number which you want to learn:- ")-1
    console.log(DATA[user_input]["name"])
    id=DATA[user_input]["id"]
    let link_2="https://api.merakilearn.org/courses/"+id+"/exercises"
    axios.get(link_2)
    .then(response1=>{
        parentData=response1.data
        var my_json=JSON.stringify(parentData,null,4);
        fs.writeFileSync("parent_data.json",my_json)
        course_name=parentData["course"]["exercises"]
        serial_no_1=1
        for (j in course_name){
            console.log(serial_no_1,course_name[j]["name"])
            serial_no_1++
        }
        let Question=a.questionInt("enter the question that you want:")
        console.log(course_name[Question]["name"])
        var slug=course_name[Question]["content"][0]["value"]
        console.log(slug)
    })
    .catch(error1=>{
        console.log(error1)
    })
    
})
.catch(error=>{
    console.log(error)
})
