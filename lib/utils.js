/**
 * 
 * @param {string} str 
 * @returns {string}
 */
function kebabToCamel(str){
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
}

/**
 * 
 * @param {string} str 
 * @returns {string}
 */
function camelToKebab(str){
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * Check if DOM is ready
 * @returns {boolean}
 */
function isDomReady(){
    return document.readyState !== 'loading';
}

/**
 * Check if a Node exists in the DOM
 * @param {Element} node
 * @returns {boolean}
 */
function isNodeExists(node){    
    // check if node is null
    if(node == null){
        return false;
    }

    // if node is not an element
    if(!(node instanceof Element)){
        return false;
    }

    return document.contains(node);
}

export default {
    kebabToCamel,
    camelToKebab,
    isDomReady,
    isNodeExists
};