import express, {Request, Response} from "express"; //TO RUN -> NPM START


const app = express()

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.json({message: "TESTE"})
})

app.listen(PORT, ()=> {
    console.log(`WORKING ON ${PORT}`)
})