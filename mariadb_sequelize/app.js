const Sequelize = require('sequelize');
const {DataTypes} = Sequelize;


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS ,{
    host: 'localhost',
    port :3306,
    dialect: 'mysql',
    logging: false
})

async function verifyConection(){
try{
    await sequelize.authenticate();
    console.log('Connection to the DB Succesful')
}catch(err){
    console.log(`Failed to connect to the DB ${err}`)
}}
verifyConection();

// sequelize.authenticate()

// .then(()=> console.log('DB Connected'))
// .catch((err) => console.log(`Failed to connect to the DB ${err}`))

// console.log(`Whatever appear here will be the first on the Stack....\n
// Hence It prints before whatever the DB authenticate function sends....\n
// Since authenticate is a promise and will be on the Q\n\n`)




//********************Create a model */

const Users = sequelize.define('user',{
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true, 
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
    },
    gender:{
        type:DataTypes.STRING(1)
    },
    age:{
        type: DataTypes.INTEGER, 
        defaultValue:21
    }, 
    studying:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

},
{
   // freezeTableName: true  to not change table name from user to users
      timestamp : false // to disallow createdAt and updatedAt rows in the table
   //paranoid: true To avoid deletin db entries definitly
}
);
Users.sync({force:true})
      .then(()=>{return Users.create({username:'Jovial KANYIKI', password:'abc123', age:30, studying:false, gender:'M'});})
      .then(()=>{return Users.create({username:'Roselyne NGALULA', gender:'F',password:'2707hj', age:20});})
      .then(()=>{return Users.bulkCreate([{username:'Francoise KANYIKI', password:'BVXu&%Kl',gender:'F', age:20},
                                         {username:'Amani KANYIKI', password:'45op6ty',gender:'M',studying:false}]);
     })

      .then((data)=>{//console.log(data.toJSON())
                     console.log('User added to database')
                     console.log('-----------------------------------------')})

      .then(()=>{ return Users.findAll()  
      .then((data)=>{
        console.log('\n\nData retrieved from Database (ALL)')
        console.log('-----------------------------------------')
        data.forEach((e)=>{
             console.log(e.toJSON())})})
      })  
      .then(()=>{ return Users.findAll({attributes:['username'],where:{age:20}})  
        .then((data)=>{
          console.log('\n\nData retrieved from Database')
          console.log('-----------------------------------------')
          data.forEach((e)=>{
               console.log(e.toJSON())})})
        })  
        .then(()=>{ return Users.findAll({order:[['age','DESC']]})  
            .then((data)=>{
              console.log('\n\nData retrieved from Database (By DESC Age)')
              console.log('-----------------------------------------')
              data.forEach((e)=>{
                   console.log(e.toJSON())})})
            })  

     
      .catch((err)=>console.log(err))



//Users.sync({force:true}).then((data)=>console.log(`Table and model synced succesfully`)).catch((err)=>console.log(`Error ${err} syncing the table and model`))
//Users.drop().then((data)=>console.log(`Table droped succesfully`)).catch((err)=>console.log(`Error ${err} table couldn't be dropped`))


