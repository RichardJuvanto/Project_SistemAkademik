const url = `mongodb+srv://richard:BYGxMd5lcX0y5j4v@cluster0.ttvjo.mongodb.net/Project?retryWrites=true&w=majority`;
 
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
