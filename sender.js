var amqp = require('amqplib/callback_api');

amqp.connect('amqp://192.168.99.100:32771', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
	var i = 0;
	setInterval(function() { 
		for (var j = 0; j < 50; j++){
    			// Note: on Node 6 Buffer.from(msg) should be used
    			ch.sendToQueue(q, new Buffer(i++ + ' - Hello World!'));
    			console.log(" [" + i + "] Sent 'Hello World!'");
		}
	}, 500);
  });
});
