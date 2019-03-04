import * as jwt from 'jsonwebtoken'

const Guard = (req, res, next) => {
  let token = req.body.token || req.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
      if (err) {
        return res.json({
          error: 'Acesso não permitido'
        })
      } else {
        req.decoded = decoded
        next();
      }
    })
  } else {
    return res.json({
      error: 'Acesso não permitido'
    })
  }
}

export default Guard