module.exports = function(req, res, next){
	res.header('access-control-allow-origin', '*');
	next();
};


// this file is allowing all access rights to and from both ports 8080 & 3000
// also known as CORS - cross origin resource sharing
// the '*' shows that we will accept info from all sites
// next() is allowing the next header to have the same rights
// not really needed on our closed servers