/**
 * Generate a new Object with only keys includes in the filtersArray
 * @param {Object} obj Object to filter
 * @param {Array} filtersArray Array with Keys to keep
 * @returns  Array with only keys include in filtersArray
 */
export const objectFilter = (obj, filtersArray) => {
    const filterObj = {};
    if (filtersArray.length > 0 ){
        for (let key of filtersArray){
            filterObj[key] = obj[key];
        }
    }
    return filterObj;
}

/**
 * Validate if a Object contains only keys includes in the asset array 
 * @param {Object} obj Object to check
 * @param {Array} arr  Asset array containing authorizated keys
 * @returns Boolean
 */
export const validateObject = (obj, arr) => {
    const keys = Object.keys(obj)
    if (keys.length > arr.length) return false
    for (let key of keys){
        if (!arr.includes(key)) return false
    }
    return true
}