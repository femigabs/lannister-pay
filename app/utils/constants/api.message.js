export default {
  MONGODB_RUNNING: 'MongoDb server is running',
  LANNISTER_RUNNING: 'Lannister Pay is running on PORT',
  INTERNAL_SERVER_ERROR: 'Oops, something broke on the server!!!',
  SUCCESS: 'success',
  SUCCESS_RESPONSE: 'Request was successfully processed',
  FAIL: 'fail',
  WELCOME: 'Thanks for dropping by, you are at Lannister pay',
  v1: '/api/v1',
  DB_ERROR: 'A database error occurred',
  MODULE_ERROR: 'A module error occurred',
  NOT_FOUND_API: 'Oops, You have reached a dead end',
  RESOURCE_UPDATE_ERROR_STATUS: (resource) => `${resource}_UPDATE_ERROR`,
  RESOURCE_DELETE_SUCCESS: (resource) => `${resource} deleted successfully`,
  RESOURCE_DELETE_FAIL: (resource) => `Error while deleting ${resource}`,
  RESOURCE_DELETE_FAIL_STATUS: (resource) => `ERROR DELETING ${resource}`,
  FETCH_DATA_SUCCESS: (schema) => `${schema} retrieved successfully`,
  FETCH_DATA_ERROR: (schema) => `ERROR_RETRIEVING_${schema}`,
  FETCH_DATA_ERROR_MSG: (schema) => `Error retrieving ${schema}.This is from us not you`,
  PARAM_ABSENT: (schema) => `Please provide a valid ${schema}`,
  RESOURCE_NOT_FOUND: (resource) => `${resource} not found`,
  RESOURCE_ALREADY_EXIST: (resource) => `${resource} exists already`,
  RESOURCE_CREATE_SUCCESS: (resource) => `${resource} created successfully`,
  RESOURCE_FETCH_SUCCESS: (resource) => `${resource} fetched successfully`,
  RESOURCE_UPDATE_SUCCESS: (resource) => `${resource} updated successfully`,
  RESOURCE_UPDATE_FAIL: (resource) => `Error while updating ${resource}`,
  RESOURCE_NOT_PROVIDED: (resource) => `No ${resource} provided`,
  RESOURCE_CREATE_ERROR: (resource) => `Failed to create ${resource}. It is not you, it is us.`,
  RESOURCE_EXIST_VERIFICATION_FAIL_MSG: (resource) => `Error trying to fetch ${resource}. It is not you, it is us.`
};
