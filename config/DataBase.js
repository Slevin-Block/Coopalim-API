import mongoose from "mongoose"

export default () => {
    mongoose.set('strictQuery', true)
    mongoose.connect(`mongodb+srv://${process.env.DBURL}?retryWrites=true&w=majority`)

    mongoose.connection.on("error", () => {console.log(`Connection impossible avec la DB ${process.env.DBNAME}`)})

    mongoose.connection.on("open", () =>{console.log(`Connection établie avec la DB ${process.env.DBNAME}`)})

}