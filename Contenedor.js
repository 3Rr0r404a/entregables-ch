//import { readFile, writeFile } from 'fs/promises';
const { Console } = require('console');
var fs = require('fs'); 

class Contenedor {
    constructor(fileName) {
      this.fileName = fileName;
      fs.stat(this.fileName, (err, stat) => {
        if(err != null && err.code === 'ENOENT') {
          fs.promises.writeFile(this.fileName, "[]");
        }
      });
    }
    async #getNextId() {
      try {
        const data = await this.getAll();
        let ids = data.map(item => item.id);
        let id = ids.length === 0 ? 1 : Math.max(...ids) + 1; 
        return {data, id};
      } catch (err) {
        throw new Error('Error getting the next id');
      }
    }
    async save(obj) {
      try {
        let seq = await this.#getNextId();
        let record = {...obj, id: seq.id};
        let data = [...seq.data, record];
        //console.log(data)
        await fs.promises.writeFile(this.fileName, JSON.stringify(data));
        return seq.id;
      } catch (error) {
        console.log(error);
      }
    }
    async getById(id) {
      try {
        const data = await this.getAll();
        let obj = data.filter(item => item.id === id);
        if (obj.length === 0) {
          return null;
        }
        return obj[0]; 
      } catch (error) {
        throw new Error('Error finding the record');
      }
    }
    async getAll() {
      try {
          let data = await fs.promises.readFile(this.fileName);
          let objs = JSON.parse(data);
          return objs;   
      } catch (error) {
        throw new Error('Error reading the file');    
      }
    }
    async deleteById(id) {
      try {
        const data = await this.getAll();
        let objs = data.filter(item => item.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(objs));
      } catch (error) {
        throw new Error('Error removing the record');
      }
    }
    async deleteAll() {
      try {
        await fs.promises.writeFile(this.fileName, "[]"); 
      } catch (error) {
        throw new Error("Error truncating container");
      }
    }
}

module.exports = Contenedor;