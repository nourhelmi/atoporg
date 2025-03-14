const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');

const add = async (req, res) => {
    try {
        const newMeeting = new MeetingHistory(req.body);
        const savedMeeting = await newMeeting.save();
        
        return res.status(200).json({
            message: "Meeting created successfully",
            status: 200,
            data: savedMeeting
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
}

const index = async (req, res) => {
    try {
        const { createBy } = req.query;
        let query = { deleted: false };
        
        if (createBy) {
            query.createBy = createBy;
        }
        
        const meetings = await MeetingHistory.find(query)
            .populate('createBy', 'firstName lastName')
            .populate('attendes', 'firstName lastName')
            .populate('attendesLead', 'leadName')
            .sort({ timestamp: -1 });
            
        // Format the response data
        const formattedMeetings = meetings.map(meeting => {
            return {
                ...meeting._doc,
                createdByName: meeting.createBy ? `${meeting.createBy.firstName} ${meeting.createBy.lastName}` : 'Unknown'
            };
        });
        
        return res.status(200).json({
            message: "Meetings fetched successfully",
            status: 200,
            data: formattedMeetings
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
}

const view = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid meeting ID",
                status: 400
            });
        }
        
        const meeting = await MeetingHistory.findOne({ _id: id, deleted: false })
            .populate('createBy', 'firstName lastName')
            .populate('attendes', 'firstName lastName')
            .populate('attendesLead', 'leadName');
            
        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found",
                status: 404
            });
        }
        
        // Format the response data
        const formattedMeeting = {
            ...meeting._doc,
            createdByName: meeting.createBy ? `${meeting.createBy.firstName} ${meeting.createBy.lastName}` : 'Unknown'
        };
        
        return res.status(200).json({
            message: "Meeting fetched successfully",
            status: 200,
            data: formattedMeeting
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
}

const deleteData = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid meeting ID",
                status: 400
            });
        }
        
        const meeting = await MeetingHistory.findByIdAndUpdate(
            id,
            { deleted: true },
            { new: true }
        );
        
        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found",
                status: 404
            });
        }
        
        return res.status(200).json({
            message: "Meeting deleted successfully",
            status: 200,
            data: meeting
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
}

const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body;
        
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                message: "Invalid request, meeting IDs are required",
                status: 400
            });
        }
        
        const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));
        
        const result = await MeetingHistory.updateMany(
            { _id: { $in: validIds } },
            { deleted: true }
        );
        
        return res.status(200).json({
            message: "Meetings deleted successfully",
            status: 200,
            count: result.modifiedCount
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500
        });
    }
}

module.exports = { add, index, view, deleteData, deleteMany }