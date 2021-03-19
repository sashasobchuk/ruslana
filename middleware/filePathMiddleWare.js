function staticPath(path){
    return function (req, res  ,next){
        req.fotoStaticPath = path + '/fotoStaticPath'
         req.videoStaticPath= path + '/videoStaticPath'
        next()
    }
}
module.exports = staticPath