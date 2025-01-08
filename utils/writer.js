// Constructor function for creating a response payload object
var ResponsePayload = function(code, payload) {
  this.code = code;       // HTTP status code
  this.payload = payload; // Response data (can be any type)
}

// Utility function to create a ResponsePayload object
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Function to write a JSON response to the HTTP response object
var writeJson = exports.writeJson = function(response, arg1, arg2) {
  var code;    // Variable to hold the HTTP status code
  var payload; // Variable to hold the response payload

  // Check if the first argument is an instance of ResponsePayload
  if (arg1 && arg1 instanceof ResponsePayload) {
    // Recursively call writeJson with the payload and code from the ResponsePayload
    writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the HTTP status code (arg2 if valid, otherwise check arg1)
  if (arg2 && Number.isInteger(arg2)) {
    code = arg2;
  } else if (arg1 && Number.isInteger(arg1)) {
    code = arg1;
  }

  // Determine the payload
  if (code && arg1) {
    // If both code and arg1 are present, set arg1 as payload
    payload = arg1;
  } else if (arg1) {
    // If only arg1 is present, set it as payload
    payload = arg1;
  }

  // Default to HTTP 200 status code if no code is provided
  if (!code) {
    code = 200; // Default HTTP status code
  }

  // If the payload is an object, convert it to a JSON string
  if (typeof payload === 'object') {
    payload = JSON.stringify(payload, null, 2); // Format JSON with indentation
  }

  // Write the HTTP response headers
  response.writeHead(code, { 'Content-Type': 'application/json' });

  // Write the response payload and end the response
  response.end(payload);
}
