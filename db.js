const url = `mongodb://richard:BYGxMd5lcX0y5j4v@cluster0-shard-00-00.ttvjo.mongodb.net:27017,cluster0-shard-00-01.ttvjo.mongodb.net:27017,cluster0-shard-00-02.ttvjo.mongodb.net:27017/Project?ssl=true&replicaSet=atlas-n7chsp-shard-0&authSource=admin&retryWrites=true&w=majority`;
 
const connectionParams = {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true,
};
mongoose
   .connect(url, connectionParams)
   .then(() => {
       console.log("Connected to database ");
   })
   .catch((err) => {
       console.error(`Error connecting to the database. \n${err}`);
   });
