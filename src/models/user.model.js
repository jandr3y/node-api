import Model from './model';

class User extends Model {
  
  constructor(id, username, name, email, password, rank, image){
    this.id         = id || 0;
    this.name       = name || ''
    this.email      = email || '';
    this.username   = username || '';
    this.password   = password || '';
    this.rank       = rank || 0;
    this.images     = image || ''; 
    this.createdAt  = '';
    this.updatedAt  = '';
  }

  
}

/**
 * Check if current user is Admin
 * @param {User} user 
 */
// User.isAdmin = (user) => {
//     if(user.rank === 5) return true;
//     else return false;
// }

/**
 * Clean and format user properties
 * @param {User} user 
 */
// User.cleaner = (user) => {
//     let { username, password, email, name } = user;

//     let tmpUser = {};

//     if(email) tmpUser['email'] = email.toLowerCase();
//     if(name) tmpUser['name'] = name;
//     if(password) tmpUser['password'] = password.replace(/ /g, '');
//     if(username) tmpUser['username'] = username.replace(/ /g, '').toLowerCase();
    
//     return new User(tmpUser);
// }


export default User