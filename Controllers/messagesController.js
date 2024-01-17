const messageModel = require("../Models/messageModel");

const addmessages =  async (req,res,next)=>{
    try{
        console.log(req.body);
        const {from ,to ,msg} = req.body;
        const data = await messageModel.create({
            message: {text: msg},
            users: [from, to],
            sender: from
    
        });
        if(data){
            return res.json({msg: "Message added successfully."});
        }
        else{
            return  res.json({msg: "Failed to add message to the database."});
        }

    }catch(ex){
        next(ex);
    }


};                

const getAllmessages =  async (req,res,next)=>{
    try{
        const {from ,to} = req.body;
        const messages = await messageModel.find({
            users: {
                $all: [from, to]

            }
        }).sort({updatedAt: 1});

        const projectedMessages = messages.map((msg)=>{
            return{
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,


            }
        });
        return res.json(projectedMessages);
        
    } catch(ex){
        next(ex);
    }

    
}

module.exports = {addmessages,getAllmessages}
