var AccountModel = function(user_id, display_name, username) {
	this.user_id = user_id; 
	this.email = email; 
	this.username = username; 
	this.firstname = firstname;  
	this.lastname = lastname; 
	this.display_name = display_name; 
	this.password = password;
}

AccountModel.prototype.getUser_id = function() { 
	return user_id; 
}; 
AccountModel.prototype.getEmail = function()  {
	return email; 
};
AccountModel.prototype.getUsername = function() {
	return username; 
};
AccountModel.prototype.getFirstname = function() {
	return firstname; 
};
AccountModel.prototype.getLastname = function() {
	return lastname; 
};
AccountModel.prototype.getDisplay_name = function() {
	return display_name; 
};
AccountModel.prototype.getPassword = function() {
	return password; 
};