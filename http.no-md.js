//****************************************************************************************************
// MODULE: http
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------
({define: typeof define === 'function' ? define : function (A,F) {var I = F.apply(null, A.map(require)); Object.keys(I).forEach(function(k) {exports[k] = I[k];});}}).define(

[], // No module dependencies.

function () {
	"use strict";
	
	var isAuthErrorResponse;
	var isErrorResponse;
	var publicInterface;
	var responseHeadersToObject;
	var STATUS_CODES;
	var statusText;
	
	//****************************************************************************************************
	// Constants
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
		

	HEADER_FIELD_NAMES = HFN =
		{
			ACCEPT						: 'Accept',
			ACCEPT_CHARSET				: 'Accept-Charset',
			ACCEPT_ENCODING				: 'Accept-Encoding',
			ACCEPT_LANGUAGE				: 'Accept-Language',
			ACCEPT_RANGES				: 'Accept-Ranges',
			AGE							: 'Age',
			ALLOW						: 'Allow',
			AUTHORIZATION				: 'Authorization',
			CACHE_CONTROL				: 'Cache-Control',
			CONNECTION					: 'Connection',
			CONTENT_ENCODING			: 'Content-Encoding',
			CONTENT_LANGUAGE			: 'Content-Language',
			CONTENT_LENGTH				: 'Content-Length',
			CONTENT_LOCATION			: 'Content-Location',
			CONTENT_MD5					: 'Content-MD5',
			CONTENT_RANGE				: 'Content-Range',
			CONTENT_TYPE 				: 'Content-Type',
			DATE						: 'Date',
			ETAG						: 'ETag',
			EXPECT						: 'Expect',
			EXPIRES						: 'Expires',
			FROM						: 'From',
			IF_MATCH					: 'If-Match',
			IF_MODIFIED_SINCE			: 'If-Modified-Since',
			IF_NONE_MATCH				: 'If-None-Match',
			IF_RANGE					: 'If-Range',
			IF_UNMODIFIED_SINCE			: 'If-Unmodified-Since',
			LAST_MODIFIED				: 'Last-Modified',
			LOCATION					: 'Location',
			MAX_FORWARDS				: 'Max-Forwards',
			PRAGMA						: 'Pragma',
			PROXY_AUTHENTICATE			: 'Proxy-Authenticate',
			PROXY_AUTHORIZATION			: 'Proxy-Authorization',
			RANGE						: 'Range',
			REFERER						: 'Referer',
			RETRY_AFTER					: 'Retry-After',
			SERVER						: 'Server',
			TE							: 'TE',
			TRAILER						: 'Trailer',
			TRANSFER_ENCODING			: 'Transfer-Encoding',
			UPGRADE						: 'Upgrade',
			USER_AGENT					: 'User-Agent',
			VARY						: 'Vary',
			VIA							: 'Via',
			WARNING						: 'Warning',
			WWW_AUTHENTICATE			: 'WWW-Authenticate',
			X_ACCOUNT_BYTES_USED		: 'X-Account-Bytes-Used',
			X_ACCOUNT_CONTAINER_COUNT	: 'X-Account-Container-Count',
			X_ACCOUNT_OBJECT_COUNT		: 'X-Account-Object-Count',
			X_AUTH_KEY 					: 'X-Auth-Key',
			X_AUTH_TOKEN 				: 'X-Auth-Token',
			X_AUTH_USER 				: 'X-Auth-User',
			X_CDN_ENABLED				: 'X-CDN-Enabled',
			X_CDN_IOS_URI				: 'X-Cdn-Ios-Uri',
			X_CDN_MANAGEMENT_URL 		: 'X-CDN-Management-Url',
			X_CDN_SSL_URI				: 'X-Cdn-Ssl-Uri',
			X_CDN_STREAMING_URI			: 'X-Cdn-Streaming-Uri',
			X_CDN_URI					: 'X-Cdn-Uri',
			X_CONTAINER_BYTES_USED		: 'X-Container-Bytes-Used',
			X_CONTAINER_META			: 'X-Container-Meta-',
			X_CONTAINER_OBJECT_COUNT 	: 'X-Container-Object-Count',
			X_COPY_FROM					: 'X-Copy-From',
			X_DELETE_AFTER				: 'X-Delete-After',
			X_DELETE_AT					: 'X-Delete-At',
			X_OBJECT_META				: 'X-Object-Meta-',
			X_REMOVE_CONTAINER_META		: 'X-Remove-Container-Meta-',
			X_STORAGE_TOKEN 			: 'X-Storage-Token',
			X_STORAGE_URL 				: 'X-Storage-Url'
		};
		
	Object.freeze(HEADER_FIELD_NAMES);


	STATUS_CODES =
		{
			CONTINUE						: 100,
			SWITCHING_PROTOCOLS				: 101,
			PROCESSING						: 102,
			OK								: 200,
			CREATED							: 201,
			ACCEPTED						: 202,
			NONAUTHORITATIVE_INFORMATION	: 203,
			NO_CONTENT						: 204,
			RESET_CONTENT					: 205,
			PARTIAL_CONTENT					: 206,
			MULTISTATIS						: 207,
			IM_USED							: 226,
			MULTIPLE_CHOICES				: 300,
			MOVED_PERMANENTLY				: 301,
			FOUND							: 302,
			SEE_OTHER						: 303,
			NOT_MODIFIED					: 304,
			USE_PROXY						: 305,
			TEMPORARY_REDIRECT				: 307,
			PERMANENT_REDIRECT				: 308,
			BAD_REQUEST						: 400,
			UNAUTHORIZED		 			: 401,
			PAYMENT_REQUIRED				: 402,
			FORBIDDEN						: 403,
			NOT_FOUND						: 404,
			METHOD_NOT_ALLOWED				: 405,
			NOT_ACCEPTABLE					: 406,
			PROXY_AUTHENTICATION_REQUIRED	: 407,
			REQUEST_TIMEOUT					: 408,
			CONFLICT						: 409,
			GONE							: 410,
			LENGTH_REQUIRED					: 411,
			PRECONDITION_FAILED				: 412,
			PAYLOAD_TOO_LARGE				: 413,
			URI_TOO_LONG					: 414,
			UNSUPPORTED_MEDIA_TYPE			: 415,
			RANGE_NOT_SATISFIABLE			: 416,
			EXPECTATION_FAILED				: 417,
			UNPROCESSABLE_ENTITY			: 422,
			LOCKED							: 423,
			FAILED_DEPENDENCY				: 424,
			UPGRADE_REQUIRED				: 426,
			PRECONDITION_REQUIRED			: 428,
			TOO_MANY_REQUESTS				: 429,
			REQUEST_HEADER_FIELDS_TOO_LARGE	: 431,
			UNAVAILABLE_FOR_LEGAL_REASONS	: 451,
			INTERNAL_SERVER_ERROR			: 500,
			NOT_IMPLEMENTED					: 501,
			BAD_GATEWAY						: 502,
			SERVICE_UNAVAILABLE				: 503,
			GATEWAY_TIMEOUT					: 504,
			HTTP_VERSION_NOT_SUPPORTED		: 505,
			INSUFFICIENT_STORAGE			: 507,
			NETWORK_AUTHENTICATION_REQUIRED	: 511
		};

	Object.freeze(STATUS_CODES);

	//****************************************************************************************************
	//****************************************************************************************************

	//****************************************************************************************************
	// isAuthErrorResponse
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	isAuthErrorResponse = function isAuthErrorResponse (xhr) {
		return xhr.status === STATUS_CODES.UNAUTHORIZED;
	};

	//****************************************************************************************************
	// isErrorResponse
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	isErrorResponse = function isErrorResponse (xhr) {
		return xhr.status < 200 || xhr.status > 299;
	};
	
	//****************************************************************************************************
	// responseHeadersToObject
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	responseHeadersToObject = function responseHeadersToObject (xhr) {
		var headerLines;
		var result = {};
		
		headerLines = xhr.getAllResponseHeaders().split('\n');
		
		headerLines.forEach(function (line) {
								var firstColonPos;
								var key;
								var value;
								
								firstColonPos = line.indexOf(':');
								
								if (firstColonPos >= 0) {
									key = line.substring(0, firstColonPos).trim();
									
									if (key !== '') {
										value = line.substring(firstColonPos + 1).replace(/[\r\n]/g, '').trim();
										result[key] = value;
									}
								}
							});
							
		return result;
	};

	//****************************************************************************************************
	// statusText
	//****************************************************************************************************
	//----------------------------------------------------------------------------------------------------
	statusText = function statusText (xhr) {
		return xhr.status === 0 ? 'A communication error occurred.' : xhr.status + ' ' + xhr.statusText;
	};
		
	//****************************************************************************************************
	// Set this module's public interface.
	//****************************************************************************************************
	publicInterface = {};

	publicInterface.HEADER_FIELD_NAMES 		= HEADER_FIELD_NAMES;
	publicInterface.HFN 					= HFN;
	publicInterface.isAuthErrorResponse 	= isAuthErrorResponse;
	publicInterface.isErrorResponse 		= isErrorResponse;
	publicInterface.responseHeadersToObject = responseHeadersToObject;
	publicInterface.STATUS_CODES			= STATUS_CODES;
	publicInterface.statusText 				= statusText;
	
	return publicInterface;
});

//****************************************************************************************************
//****************************************************************************************************
//----------------------------------------------------------------------------------------------------

//****************************************************************************************************
//****************************************************************************************************

