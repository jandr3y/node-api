import * as jwt from 'jsonwebtoken'

const config = {
  public: [
    '/user'
  ],
  logged: [
    '/user/:id'
  ],
  group: [
    '/group'
  ]
}

const Guard = (req, res, next) => {
  
  /**
   * check if route is public :?
   * @param {String} routePath Route Path
   * @returns {Boolean}  
   */
  const isPublic = (routePath) => {
    if(config.public.indexOf(routename) != -1){
      return true;
    }else{
      return false;
    }
  }


  // console.log(req)

  let token = req.body.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        console.log(err);
        return res.json({
          error: 'Acesso não permitido2'
        })
      } else {
        req.decoded = decoded
        next();
      }
    })
  } else {
    return res.json({
      error: token
    })
  }
}

export default Guard