# JSON:API v1.0

# Content Negotiation
## Client Responsibilities
  * [ ] Clients MUST send all JSON:API data in request documents with the header Content-Type: application/vnd.api+json without any media type parameters.
  * [ ] Clients that include the JSON:API media type in their Accept header MUST specify the media type there at least once without any media type parameters.
  * [ ] Clients MUST ignore any parameters for the application/vnd.api+json media type received in the Content-Type header of response documents.

## Server Responsibilities
  * [ ] Servers MUST send all JSON:API data in response documents with the header Content-Type: application/vnd.api+json without any media type parameters
  * [ ] Servers MUST respond with a 415 Unsupported Media Type status code if a request specifies the header Content-Type: application/vnd.api+json with any media type parameters.
  * [ ] Servers MUST respond with a 406 Not Acceptable status code if a request’s Accept header contains the JSON:API media type and all instances of that media type are modified with media type parameters.
  
# Document Structure
  * [ ] Unless otherwise noted, objects defined by this specification MUST NOT contain any additional members. Client and server implementations MUST ignore members not recognized by this specification.

## Top Level
  * [ ] A JSON object MUST be at the root of every JSON:API request and response containing data. This object defines a document’s “top level”.
  * [ ] A document MUST contain at least one of the following top-level members:
    * [ ] data: the document’s “primary data”
    * [ ] errors: an array of error objects
    * [ ] meta: a meta object that contains non-standard meta-information.
  * [ ] The members data and errors MUST NOT coexist in the same document.
  * [ ] A document MAY contain any of these top-level members:
    * [ ] jsonapi: an object describing the server’s implementation
    * [ ] links: a links object related to the primary data.
    * [ ] included: an array of resource objects that are related to the primary data and/or each other (“included resources”).
  * [ ] If a document does not contain a top-level data key, the included member MUST NOT be present either.
  * [ ] The top-level links object MAY contain the following members:
    * [ ] self: the link that generated the current response document.
    * [ ] related: a related resource link when the primary data represents a resource relationship.
    * [ ] pagination links for the primary data.
  * [ ] Primary data MUST be either:
    * [ ] a single resource object, a single resource identifier object, or null, for requests that target single resources
    * [ ] an array of resource objects, an array of resource identifier objects, or an empty array ([]), for requests that target resource collections
  * [ ] A logical collection of resources MUST be represented as an array, even if it only contains one item or is empty.

## Resource Objects
  * [ ] A resource object MUST contain at least the following top-level members:
    * [ ] id
    * [ ] type
  * [ ] Exception: The id member is not required when the resource object originates at the client and represents a new resource to be created on the server.
  * [ ] In addition, a resource object MAY contain any of these top-level members:
    * [ ] attributes: an attributes object representing some of the resource’s data.
    * [ ] relationships: a relationships object describing relationships between the resource and other JSON:API resources.
    * [ ] links: a links object containing links related to the resource.
    * [ ] meta: a meta object containing non-standard meta-information about a resource that can not be represented as an attribute or relationship.

### Identification
  * [ ] Every resource object MUST contain an id member and a type member. The values of the id and type members MUST be strings.
  * [ ] Within a given API, each resource object’s type and id pair MUST identify a single, unique resource. (The set of URIs controlled by a server, or multiple servers acting as one, constitute an API.)
  * [ ] The values of type members MUST adhere to the same constraints as member names.
  
### Fields
  * [ ] Fields for a resource object MUST share a common namespace with each other and with type and id. In other words, a resource can not have an attribute and relationship with the same name, nor can it have an attribute or relationship named type or id.

### Attributes
  * [ ] The value of the attributes key MUST be an object (an “attributes object”). Members of the attributes object (“attributes”) represent information about the resource object in which it’s defined.
  * [ ] Attributes may contain any valid JSON value.
  * [ ] Complex data structures involving JSON objects and arrays are allowed as attribute values. However, any object that constitutes or is contained in an attribute MUST NOT contain a relationships or links member, as those members are reserved by this specification for future use.
  * [ ] Although has-one foreign keys (e.g. author_id) are often stored internally alongside other information to be represented in a resource object, these keys SHOULD NOT appear as attributes.

### Relationships
  * [ ] The value of the relationships key MUST be an object (a “relationships object”). Members of the relationships object (“relationships”) represent references from the resource object in which it’s defined to other resource objects.
  * [ ] A “relationship object” MUST contain at least one of the following:
    * [ ] links: a links object containing at least one of the following:
     * [ ] self: a link for the relationship itself (a “relationship link”). This link allows the client to directly manipulate the relationship. For example, removing an author through an article’s relationship URL would disconnect the person from the article without deleting the people resource itself. When fetched successfully, this link returns the linkage for the related resources as its primary data. (See Fetching Relationships.)
     * [ ] related: a related resource link
    * [ ] data: resource linkage
    * [ ] meta: a meta object that contains non-standard meta-information about the relationship.
  * [ ] A relationship object that represents a to-many relationship MAY also contain pagination links under the links member, as described below. Any pagination links in a relationship object MUST paginate the relationship data, not the related resources.
  
### Related Resource Links
  * [ ] If present, a related resource link MUST reference a valid URL, even if the relationship isn’t currently associated with any target resources. Additionally, a related resource link MUST NOT change because its relationship’s content changes.v

### Resource Linkage
  * [ ] Resource linkage MUST be represented as one of the following:
    * [ ] null for empty to-one relationships.
    * [ ] an empty array ([]) for empty to-many relationships.
    * [ ] a single resource identifier object for non-empty to-one relationships.
    * [ ] an array of resource identifier objects for non-empty to-many relationships.
  
### Resource Links
  * [ ] If present, this links object MAY contain a self link that identifies the resource represented by the resource object.
  * [ ] A server MUST respond to a GET request to the specified URL with a response that includes the resource as the primary data.
  
### Resource Identifier Objects
  * [ ] A “resource identifier object” MUST contain type and id members.
  * [ ] A “resource identifier object” MAY also include a meta member, whose value is a meta object that contains non-standard meta-information.
  
### Compound Documents
  * [ ] To reduce the number of HTTP requests, servers MAY allow responses that include related resources along with the requested primary resources. Such responses are called “compound documents”.
  * [ ] In a compound document, all included resources MUST be represented as an array of resource objects in a top-level included member.
  * [ ] Compound documents require “full linkage”, meaning that every included resource MUST be identified by at least one resource identifier object in the same document. These resource identifier objects could either be primary data or represent resource linkage contained within primary or included resources.
  The only exception to the full linkage requirement is when relationship fields that would otherwise contain linkage data are excluded via sparse fieldsets.
  * [ ] A compound document MUST NOT include more than one resource object for each type and id pair.
  
### Meta Information
  * [ ] Where specified, a meta member can be used to include non-standard meta-information. The value of each meta member MUST be an object (a “meta object”).
  * [ ] Any members MAY be specified within meta objects.
  
### Links
  * [ ] Where specified, a links member can be used to represent links. The value of each links member MUST be an object (a “links object”).
  * [ ] Each member of a links object is a “link”. A link MUST be represented as either:
    * [ ] a string containing the link’s URL.
    * [ ] an object (“link object”) which can contain the following members:
     * [ ] href: a string containing the link’s URL.
     * [ ] meta: a meta object containing non-standard meta-information about the link.
     
### JSON:API Object
  * [ ] A JSON:API document MAY include information about its implementation under a top level jsonapi member. If present, the value of the jsonapi member MUST be an object (a “jsonapi object”). The jsonapi object MAY contain a version member whose value is a string indicating the highest JSON API version supported. This object MAY also contain a meta member, whose value is a meta object that contains non-standard meta-information.
  
### Member Names
  * [ ] All member names used in a JSON:API document MUST be treated as case sensitive by clients and servers, and they MUST meet all of the following conditions:
    * [ ] Member names MUST contain at least one character.
    * [ ] Member names MUST contain only the allowed characters listed below.
    * [ ] Member names MUST start and end with a “globally allowed character”, as defined below.
  * [ ] To enable an easy mapping of member names to URLs, it is RECOMMENDED that member names use only non-reserved, URL safe characters specified in RFC 3986.
  
#### Allowed Characters
  * [ ] The following “globally allowed characters” MAY be used anywhere in a member name:
      * U+0061 to U+007A, “a-z”
      * U+0041 to U+005A, “A-Z”
      * U+0030 to U+0039, “0-9”
      * U+0080 and above (non-ASCII Unicode characters; not recommended, not URL safe)
     Additionally, the following characters are allowed in member names, except as the first or last character:
      * U+002D HYPHEN-MINUS, “-“
      * U+005F LOW LINE, “_”
      * U+0020 SPACE, “ “ (not recommended, not URL safe)
  * [ ] Reserved Characters. The following characters MUST NOT be used in member names:
  	* U+002B PLUS SIGN, “+” (used for ordering)
	* U+002C COMMA, “,” (used as a separator between relationship paths)
	* U+002E PERIOD, “.” (used as a separator within relationship paths)
	* U+005B LEFT SQUARE BRACKET, “[” (used in sparse fieldsets)
	* U+005D RIGHT SQUARE BRACKET, “]” (used in sparse fieldsets)
	* U+0021 EXCLAMATION MARK, “!”
	* U+0022 QUOTATION MARK, ‘”’
	* U+0023 NUMBER SIGN, “#”
	* U+0024 DOLLAR SIGN, “$”
	* U+0025 PERCENT SIGN, “%”
	* U+0026 AMPERSAND, “&”
	* U+0027 APOSTROPHE, “’”
	* U+0028 LEFT PARENTHESIS, “(“
	* U+0029 RIGHT PARENTHESIS, “)”
	* U+002A ASTERISK, “*”
	* U+002F SOLIDUS, “/”
	* U+003A COLON, “:”
	* U+003B SEMICOLON, “;”
	* U+003C LESS-THAN SIGN, “<”
	* U+003D EQUALS SIGN, “=”
	* U+003E GREATER-THAN SIGN, “>”
	* U+003F QUESTION MARK, “?”
	* U+0040 COMMERCIAL AT, “@”
	* U+005C REVERSE SOLIDUS, “\”
	* U+005E CIRCUMFLEX ACCENT, “^”
	* U+0060 GRAVE ACCENT, “`”
	* U+007B LEFT CURLY BRACKET, “{“
	* U+007C VERTICAL LINE, “|”
	* U+007D RIGHT CURLY BRACKET, “}”
	* U+007E TILDE, “~”
	* U+007F DELETE
	* U+0000 to U+001F (C0 Controls)
	
# Fetching Data

## Fetching Resources
  * [ ] A server MUST support fetching resource data for every URL provided as:
    * [ ] a self link as part of the top-level links object
    * [ ] a self link as part of a resource-level links object
    * [ ] a related link as part of a relationship-level links object

### Responses
#### 200 OK
  * [ ] A server MUST respond to a successful request to fetch an individual resource or resource collection with a 200 OK response.
  * [ ] A server MUST respond to a successful request to fetch a resource collection with an array of resource objects or an empty array ([]) as the response document’s primary data.
  * [ ] A server MUST respond to a successful request to fetch an individual resource with a resource object or null provided as the response document’s primary data. null is only an appropriate response when the requested URL is one that might correspond to a single resource, but doesn’t currently.

#### 404 Not Found
  * [ ] A server MUST respond with 404 Not Found when processing a request to fetch a single resource that does not exist, except when the request warrants a 200 OK response with null as the primary data (as described above).
  
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.
  
## Fetching Relationships
  * [ ] A server MUST support fetching relationship data for every relationship URL provided as a self link as part of a relationship’s links object.
  
### Responses
#### 200 OK
  * [ ] A server MUST respond to a successful request to fetch a relationship with a 200 OK response.
  * [ ] The primary data in the response document MUST match the appropriate value for resource linkage, as described above for relationship objects.
  * [ ] The top-level links object MAY contain self and related links, as described above for relationship objects.
#### 404 Not Found
  * [ ] A server MUST return 404 Not Found when processing a request to fetch a relationship link URL that does not exist.
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.
  
## Inclusion of Related Resources
  * [ ] An endpoint MAY return resources related to the primary data by default.
  * [ ] An endpoint MAY also support an include request parameter to allow the client to customize which related resources should be returned.
  * [ ] If an endpoint does not support the include parameter, it MUST respond with 400 Bad Request to any requests that include it.
  * [ ] If an endpoint supports the include parameter and a client supplies it, the server MUST NOT include unrequested resource objects in the included section of the compound document.
  * [ ] The value of the include parameter MUST be a comma-separated (U+002C COMMA, “,”) list of relationship paths. A relationship path is a dot-separated (U+002E FULL-STOP, “.”) list of relationship names.
  * [ ] If a server is unable to identify a relationship path or does not support inclusion of resources from a path, it MUST respond with 400 Bad Request.

## Sparse Fieldsets
  * [ ] A client MAY request that an endpoint return only specific fields in the response on a per-type basis by including a fields[TYPE] parameter.
  * [ ] The value of the fields parameter MUST be a comma-separated (U+002C COMMA, “,”) list that refers to the name(s) of the fields to be returned.
  * [ ] If a client requests a restricted set of fields for a given resource type, an endpoint MUST NOT include additional fields in resource objects of that type in its response.
  
## Sorting
  * [ ] A server MAY choose to support requests to sort resource collections according to one or more criteria (“sort fields”).
  * [ ] An endpoint MAY support requests to sort the primary data with a sort query parameter. The value for sort MUST represent sort fields.
  * [ ] An endpoint MAY support multiple sort fields by allowing comma-separated (U+002C COMMA, “,”) sort fields. Sort fields SHOULD be applied in the order specified.
  * [ ] The sort order for each sort field MUST be ascending unless it is prefixed with a minus (U+002D HYPHEN-MINUS, “-“), in which case it MUST be descending.
  * [ ] If the server does not support sorting as specified in the query parameter sort, it MUST return 400 Bad Request.
  * [ ] If sorting is supported by the server and requested by the client via query parameter sort, the server MUST return elements of the top-level data array of the response ordered according to the criteria specified. The server MAY apply default sorting rules to top-level data if request parameter sort is not specified.
 
## Pagination 
  * [ ] A server MAY choose to limit the number of resources returned in a response to a subset (“page”) of the whole set available.
  * [ ] A server MAY provide links to traverse a paginated data set (“pagination links”).
  * [ ] Pagination links MUST appear in the links object that corresponds to a collection. To paginate the primary data, supply pagination links in the top-level links object. To paginate an included collection returned in a compound document, supply pagination links in the corresponding links object.
  * [ ] The following keys MUST be used for pagination links:
   * [ ] first: the first page of data
   * [ ] last: the last page of data
   * [ ] prev: the previous page of data
   * [ ] next: the next page of data
  * [ ] Keys MUST either be omitted or have a null value to indicate that a particular link is unavailable.
  * [ ] Concepts of order, as expressed in the naming of pagination links, MUST remain consistent with JSON:API’s sorting rules.
  * [ ] The page query parameter is reserved for pagination. Servers and clients SHOULD use this key for pagination operations.

## Filtering
  * [ ] The filter query parameter is reserved for filtering data. Servers and clients SHOULD use this key for filtering operations.
  
# Creating, Updating and Deleting Resources
  * [ ] A server MAY allow resources of a given type to be created. It MAY also allow existing resources to be modified or deleted.
  * [ ] A request MUST completely succeed or fail (in a single “transaction”). No partial updates are allowed.
  
## Creating Resources
  * [ ] A resource can be created by sending a POST request to a URL that represents a collection of resources. The request MUST include a single resource object as primary data. The resource object MUST contain at least a type member.
  * [ ] If a relationship is provided in the relationships member of the resource object, its value MUST be a relationship object with a data member. The value of this key represents the linkage the new resource is to have.
  
### Client-Generated IDs
  * [ ] A server MAY accept a client-generated ID along with a request to create a resource. An ID MUST be specified with an id key, the value of which MUST be a universally unique identifier. The client SHOULD use a properly generated and formatted UUID as described in RFC 4122 [RFC4122].
  * [ ] A server MUST return 403 Forbidden in response to an unsupported request to create a resource with a client-generated ID.
  
### Responses
#### 201 Created
  * [ ] If a POST request did not include a Client-Generated ID and the requested resource has been created successfully, the server MUST return a 201 Created status code.
  * [ ] The response SHOULD include a Location header identifying the location of the newly created resource.
  * [ ] The response MUST also include a document that contains the primary resource created.
  * [ ] If the resource object returned by the response contains a self key in its links member and a Location header is provided, the value of the self member MUST match the value of the Location header.
#### 202 Accepted
  * [ ] If a request to create a resource has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
#### 204 No Content
  * [ ] If a POST request did include a Client-Generated ID and the requested resource has been created successfully, the server MUST return either a 201 Created status code and response document (as described above) or a 204 No Content status code with no response document.
#### 403 Forbidden
  * [ ] A server MAY return 403 Forbidden in response to an unsupported request to create a resource.
#### 404 Not Found
  * [ ] A server MUST return 404 Not Found when processing a request that references a related resource that does not exist.
#### 409 Conflict
  * [ ] A server MUST return 409 Conflict when processing a POST request to create a resource with a client-generated ID that already exists.
  * [ ] A server MUST return 409 Conflict when processing a POST request in which the resource object’s type is not among the type(s) that constitute the collection represented by the endpoint.
  * [ ] A server SHOULD include error details and provide enough information to recognize the source of the conflict.
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.

## Updating Resources
  * [ ] A resource can be updated by sending a PATCH request to the URL that represents the resource.
  * [ ] The URL for a resource can be obtained in the self link of the resource object. Alternatively, when a GET request returns a single resource object as primary data, the same request URL can be used for updates.
  * [ ] The PATCH request MUST include a single resource object as primary data. The resource object MUST contain type and id members.
### Updating a Resource’s Attributes
  * [ ] Any or all of a resource’s attributes MAY be included in the resource object included in a PATCH request.
  * [ ] If a request does not include all of the attributes for a resource, the server MUST interpret the missing attributes as if they were included with their current values. The server MUST NOT interpret missing attributes as null values.
### Updating a Resource’s Relationships
  * [ ] Any or all of a resource’s relationships MAY be included in the resource object included in a PATCH request.
  * [ ] If a request does not include all of the relationships for a resource, the server MUST interpret the missing relationships as if they were included with their current values. It MUST NOT interpret them as null or empty values.
  * [ ] If a relationship is provided in the relationships member of a resource object in a PATCH request, its value MUST be a relationship object with a data member. The relationship’s value will be replaced with the value specified in this member.
  * [ ] A server MAY reject an attempt to do a full replacement of a to-many relationship. In such a case, the server MUST reject the entire update, and return a 403 Forbidden response.
### Responses
#### 202 Accepted
  * [ ] If an update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
#### 200 OK
  * [ ] If a server accepts an update but also changes the resource(s) in ways other than those specified by the request (for example, updating the updated-at attribute or a computed sha), it MUST return a 200 OK response. The response document MUST include a representation of the updated resource(s) as if a GET request was made to the request URL.
  * [ ] A server MUST return a 200 OK status code if an update is successful, the client’s current attributes remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated resource(s).
#### 204 No Content
  * [ ] If an update is successful and the server doesn’t update any attributes besides those provided, the server MUST return either a 200 OK status code and response document (as described above) or a 204 No Content status code with no response document.
#### 403 Forbidden
  * [ ] A server MUST return 403 Forbidden in response to an unsupported request to update a resource or relationship.
#### 404 Not Found
  * [ ] A server MUST return 404 Not Found when processing a request to modify a resource that does not exist.
  * [ ] A server MUST return 404 Not Found when processing a request that references a related resource that does not exist.
#### 409 Conflict
  * [ ] A server MAY return 409 Conflict when processing a PATCH request to update a resource if that update would violate other server-enforced constraints (such as a uniqueness constraint on a property other than id).
  * [ ] A server MUST return 409 Conflict when processing a PATCH request in which the resource object’s type and id do not match the server’s endpoint.
  * [ ] A server SHOULD include error details and provide enough information to recognize the source of the conflict.
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.

## Updating Relationships
### Updating To-One Relationships
  * [ ] A server MUST respond to PATCH requests to a URL from a to-one relationship link as described below.
  * [ ] The PATCH request MUST include a top-level member named data containing one of:
    * [ ] a resource identifier object corresponding to the new related resource.
    * [ ] null, to remove the relationship.
  * [ ] If the relationship is updated successfully then the server MUST return a successful response.
### Updating To-Many Relationships
  * [ ] A server MUST respond to PATCH, POST, and DELETE requests to a URL from a to-many relationship link as described below.
  * [ ] For all request types, the body MUST contain a data member whose value is an empty array or an array of resource identifier objects.
  * [ ] If a client makes a PATCH request to a URL from a to-many relationship link, the server MUST either completely replace every member of the relationship, return an appropriate error response if some resources can not be found or accessed, or return a 403 Forbidden response if complete replacement is not allowed by the server.
  * [ ] If a client makes a POST request to a URL from a relationship link, the server MUST add the specified members to the relationship unless they are already present. If a given type and id is already in the relationship, the server MUST NOT add it again.
  * [ ] If all of the specified resources can be added to, or are already present in, the relationship then the server MUST return a successful response.
  * [ ] If the client makes a DELETE request to a URL from a relationship link the server MUST delete the specified members from the relationship or return a 403 Forbidden response. If all of the specified resources are able to be removed from, or are already missing from, the relationship then the server MUST return a successful response.

### Responses
#### 202 Accepted
  * [ ] If a relationship update request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
#### 204 No Content
  * [ ] A server MUST return a 204 No Content status code if an update is successful and the representation of the resource in the request matches the result.
#### 200 OK
  * [ ] If a server accepts an update but also changes the targeted relationship(s) in other ways than those specified by the request, it MUST return a 200 OK response. The response document MUST include a representation of the updated relationship(s).
  * [ ] A server MUST return a 200 OK status code if an update is successful, the client’s current data remain up to date, and the server responds only with top-level meta data. In this case the server MUST NOT include a representation of the updated relationship(s).
#### 403 Forbidden
  * [ ] A server MUST return 403 Forbidden in response to an unsupported request to update a relationship.
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.


## Deleting Resources
### Responses
#### 202 Accepted
  * [ ] If a deletion request has been accepted for processing, but the processing has not been completed by the time the server responds, the server MUST return a 202 Accepted status code.
#### 204 No Content
  * [ ] A server MUST return a 204 No Content status code if a deletion request is successful and no content is returned.
#### 200 OK
  * [ ] A server MUST return a 200 OK status code if a deletion request is successful and the server responds with only top-level meta data.
#### 404 NOT FOUND
  * [ ] A server SHOULD return a 404 Not Found status code if a deletion request fails due to the resource not existing.
#### Other Responses
  * [ ] A server MAY respond with other HTTP status codes.
  * [ ] A server MAY include error details with error responses.
  * [ ] A server MUST prepare responses, and a client MUST interpret responses, in accordance with HTTP semantics.

## Query Parameters
  * [ ] Implementation specific query parameters MUST adhere to the same constraints as member names with the additional requirement that they MUST contain at least one non a-z character (U+0061 to U+007A). It is RECOMMENDED that a U+002D HYPHEN-MINUS, “-“, U+005F LOW LINE, “_”, or capital letter is used (e.g. camelCasing).
  * [ ] If a server encounters a query parameter that does not follow the naming conventions above, and the server does not know how to process it as a query parameter from this specification, it MUST return 400 Bad Request.
  
## Errors
### Processing Errors
  * [ ] A server MAY choose to stop processing as soon as a problem is encountered, or it MAY continue processing and encounter multiple problems. For instance, a server might process multiple attributes and then return multiple validation problems in a single response.
  * [ ] When a server encounters multiple problems for a single request, the most generally applicable HTTP error code SHOULD be used in the response. For instance, 400 Bad Request might be appropriate for multiple 4xx errors or 500 Internal Server Error might be appropriate for multiple 5xx errors.
### Error Objects
  * [ ] Error objects provide additional information about problems encountered while performing an operation. Error objects MUST be returned as an array keyed by errors in the top level of a JSON:API document.
  * [ ] An error object MAY have the following members:
    * [ ] id: a unique identifier for this particular occurrence of the problem.
    * [ ] links: a links object containing the following members:
     * [ ] about: a link that leads to further details about this particular occurrence of the problem.
    * [ ] status: the HTTP status code applicable to this problem, expressed as a string value.
    * [ ] code: an application-specific error code, expressed as a string value.
    * [ ] title: a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
    * [ ] detail: a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
    * [ ] source: an object containing references to the source of the error, optionally including any of the following members:
     * [ ] pointer: a JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
     * [ ] parameter: a string indicating which URI query parameter caused the error.
    * [ ] meta: a meta object containing non-standard meta-information about the error.
