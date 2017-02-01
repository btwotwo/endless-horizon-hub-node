const models = require("../models")
const Player = models.player

class AdminApi {
    static getAdmins(req, res){
        Player.findAll({where: {rank: {$ne: 'player'}}, attributes:['id', 'ckey', 'rank', 'flags']}).then((admins) => {
            res.json(admins)
        }).catch((error) => {
            res.status(400).json({errors: {title: "Fetching error", detail: error}})
        })
    }
    
    static editAdminRights(req, res){
        let id = req.params.id
        let rank = req.body.rank
        let flags = req.body.flags
        
        Player.findById(id, {attributes: ['id', 'ckey', 'rank', 'flags']}).then((player) => {
            if(player){
             player.editAdminRights(rank, flags) //instance method of player model
             player.save().then(() => {
                 res.json({status: 'OK', player})
             }).catch((error) => {
                 res.status(400).json({errors: {title: "Saving error", detail: error}})
             })
        }
        else{
            let responce = {
                errors: {title: 'Data not found!'}
            }
            res.status(400).json(responce)
        }
        
        }).catch((error) => {
            res.status(400).json({errors: {title: "Fetching error", detail: error}})
        })
    }

    
    static removeAdmin(req, res){
        let id = req.params.id
        Player.findById(id).then((player) => {
            player.deadmin()
            player.save().then(() => {
                res.json({status: 'OK', player})
            })
        }).catch((err) =>{
            res.status(400)
            res.json({errors: {title: 'Data not found!', detail: err}})
        })
    }
    static showAdmin(req, res){}
    
}

module.exports = AdminApi