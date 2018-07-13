var User = function () {
  
  this.dn = '',
  this.userPrincipalName = '',
  this.sAMAccountName = '',
  this.mail = '',
  this.lockoutTime = '',
  this.whenCreated = '',
  this.pwdLastSet = '',
  this.userAccountControl = '',
  this.employeeID = '',
  this.sn = '',
  this.givenName = '',
  this.initials = '',
  this.cn = '',
  this.displayName = ''
  this.comment = ''
  this.description = ''

}



var Group = function() {

  this.dn = '',
  this.cn = '',
  this.description =''

}

module.exports.User = User;
module.exports.Group = Group;