import Usertodo from "../models/todo.js";

const handletodo = async (req, res) =>{
    // console.log("chalraha hai yaha tak todo");
    const {  text } = req.body;
    const payload = await Usertodo.create({

       text:text

      });


return res.json({msg:"running todo backend",payload})
}

const handletodoget = async (req, res) =>{
       console.log("chalraha hai yaha tak todo get");

    const payload = await Usertodo.find()
    if(!payload.length) return res.status(400).json({error: "data not found"})

return res.json({msg:"todo get",payload})

}


const handletododel = async (req, res) =>{
    console.log("del chal raha hai")
    try {
        const { id } = req.params;
        await Usertodo.findByIdAndDelete(id);
        res.status(204).json({ message: "Todo deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


const handletodoput = async (req, res) =>{
    try {
        const { id } = req.params;
        const todo = await Usertodo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({msg:todo});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export{
    handletodo,
    handletodoget,
    handletodoput,
    handletododel
}