//models/users.js

module.exports = {

    getUserById: function(id){

        var users = this.getAllUsers();
    
        var user = users[id];
    
        if(user === undefined){
          return { 
                    name : 'Nobody',
                    age : 'Nothing',
                    gender : 'neither'
                 }
        }else{
                return user;
        } 
    
    },
    
     getAllUsers: function(){
         
        return {
            'daniel': {
                name: 'Daniel Mesquita',
                age: '50',
                gender: 'male'
            },
            'melinda':{
                name: 'Ermelinda Maciel',
                age: '35',
                gender: 'female'
            },
            'sara':{
                name: 'Sara Mesquita',
                age: '16',
                gender: 'female'
            }
        };
    
    }
}