const util = require('util');
const mysql = require('mysql');

module.exports = {
   
    makeDb: ()=>{
      const connecction = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE}, 'single');
  
      return {
          query(sql, args){
              return util.promisify(connecction.query)
                  .call(connecction, sql, args)
          },
          close(){
              return util.promisify(connecction.end)
                  .call(connecction)
          },
          beginTransaction(){
            return util.promisify( connecction.beginTransaction )
                  .call(connecction);
          },
          commit(){
            return util.promisify( connecction.commit )
                  .call( connecction );
          },
          rollback(){
            return util.promisify( connecction.rollback )
                  .call( connecction )
          }
      }
    },
    async withTransaction(db,cb){
      try{
        await db.beginTransaction();
        await cb();
        await db.commit();
        return db.commit()
      }catch (err){
        await db.rollback();
        return err
      }
    }
  
  };