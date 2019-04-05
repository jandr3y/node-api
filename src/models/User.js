class User {

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

export default User