module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{maxAge:1})
    res.cookie('user_id','',{maxAge:1})
    res.redirect('/')
}