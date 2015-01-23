var sb = require('./lib')

if (sb){
	console.log('==> simple-balancer is ready')
} else {
	console.dir(sb)
}
var hosts = [ "blahZeeBlah:80", "www.ibm.com:80", "notawebsite:19923"]

var reqOpts = {
	path: '/showmeanerror.html',
	method: 'GET'
}

// sb.sendBalancedRequest(hosts, sb.BALANCE_METHOD_RR, reqOpts, "sample payload", function(err, result){
// 	console.log("===> Errors:")
// 	console.dir(err)
// 	console.log("===> Result:")
// 	console.dir(result)
// })

 sb.sendBalancedRequest(hosts, sb.BALANCE_METHOD_RDM, reqOpts, "sample payload", function(err, result){
	console.log("===> Errors:")
	console.dir(err)
	console.log("===> Result:")
	console.dir(result)
})
