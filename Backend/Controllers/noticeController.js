const Notice = require("../Models/notice.model");


const CreateNotice = async (req, res) => {
    try {
        const {title, body, category, date} = req.body;

        const userId = req.user;

        const newNotice = new Notice({
            title,
            body,
            category,
            date,
            user: userId,
        });

        await newNotice.save();

        res.status(201).json({message: "Notice created successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};


const getAllNotices = async (req, res) => {
    try {
        const {category} = req.query;
        const userId = req.user;

        let notices;
        if(category){
            notices = await Notice.find({user: userId, category});
        }
        else{
            notices = await Notice.find({user: userId});
        }

        res.status(200).json(notices);
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};


const UpdateNotice = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, body, category, date} = req.body;
        const userId = req.user;

        const notice = await Notice.findOneAndUpdate(
            {_id: id, user: userId},
            {title, body, category, date},
            {new: true}
        );

        if(!notice){
            return res.status(404).json({message: "Notice not found"});        
        }
        
        res.status(200).json({message: "Notice updated successfully"});
    }
    catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};

const DeleteNotice = async (req, res) => {
    try {
        const {id} = req.params;
        const userId = req.user;

        const notice = await Notice.findOneAndDelete({_id: id, user: userId});

        if(!notice){
            return res.status(404).json({message: "Notice not found"});
        }

        res.status(200).json({message: "Notice deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Something went wrong"});
    }
};


module.exports = { CreateNotice, getAllNotices, UpdateNotice, DeleteNotice}
