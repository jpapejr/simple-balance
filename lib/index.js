var http = require('http')


exports.BALANCE_METHOD_RR = 'roundrobin'
exports.BALANCE_METHOD_RDM = 'random'

exports.Errors = new Array()

// attempts to execute an http.request ops using one of the hosts defined in the the pool of hosts contained in 
// the array targetList (in the form of 'host:port'). A target is selected using one of the supported balanceMethod values.
// The requestOptions object is the object that will be used in the actual http.request function call (sans the host and port info)
// and the data to be sent to the host is contained in requestData. Lastly, the function will return the result of the http.requst
// to the callback function provided.
exports.sendBalancedRequest = function(targetList, balanceMethod, requestOptions, requestData, callback){
	//check for any nulls
	if (targetList && balanceMethod && requestOptions && requestData){
		if (balanceMethod === module.exports.BALANCE_METHOD_RR){
			if (targetList.length > 0){
				var target = targetList.shift().split(':')
				if (target.length === 2){
					requestOptions.hostname = target[0]
					requestOptions.port = target[1]

					var responseBody = ""
					var errors = new Array()
					var req = http.request(requestOptions, function(res){
						res.on('data', function(chunk){
							responseBody += chunk
						})
						res.on('end', function(){
							var err = module.exports.Errors
							module.exports.Errors = []
							callback(err, responseBody)
						})
					})

					req.on('error', function(err){
						//hit an error, try next target
						//console.dir(err)
						module.exports.Errors.push({ 
							target: target[0] + ":" + target[1],
							error: err
						})
						module.exports.sendBalancedRequest(targetList, balanceMethod, requestOptions, requestData, callback)
					})

					req.write(requestData)
					req.end()

				} else {
					throw new Error('Malformed target in targetList: ' + target)
				}
			} else {
				//noop
			}
						
		} else if (balanceMethod === module.exports.BALANCE_METHOD_RDM){

		} else {
			throw new Error('Unsupported balance method given: ' + balanceMethod)
		}
	} else {
		throw new Error('Missing required params')
	}
}