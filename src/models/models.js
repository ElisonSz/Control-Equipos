const util = require('util');
const mysql = require('mysql');

module.exports = {
   
    makeDb: ()=>{
      const connecction = mysql.createConnection({
        host: '167.172.195.6',
        user: 'test',
        password: 'Elisongs.98',
        port: 3306,
        database: 'Control_Equipos'}, 'single');
  
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
