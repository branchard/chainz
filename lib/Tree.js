import Ajv from 'ajv';
import availableHtmlTags from './availableHtmlTags';
import utils from './utils';

const TREE_SCHEMA = {
    'type': 'object',
    'properties': {
        'id': {
            'type': 'string'
        },
        'tag': {
            'type': 'string',
            'enum': availableHtmlTags
        },
        'style': {
            'type': 'object'
        },
        'children': {
            'type': 'array',
            'items': {
                'oneOf': [
                    {'$ref': '#'},
                    {'type': 'string'}
                ]
            }
        }
    },
    'required': ['id', 'tag']
};

class Tree {
    /**
     * 
     * @param {Object} tree 
     */
    constructor(tree, isSubtree = false){
        this.internalTree = tree;
        this.isSubtree = isSubtree;

        if(!isSubtree){
            this.ajv = new Ajv();
        }
    }

    getId(){
        return utils.kebabToCamel(this.internalTree.id.split(' ')[0])
    }

    isValid(){
        if(this.isSubtree){
            throw 'You cannot validate a subtree';
        }
        return this.ajv.validate(TREE_SCHEMA, this.internalTree);
    }

    getLastValidationErrors(){
        if(this.isSubtree){
            throw 'You cannot get validation errors of a subtree';
        }
        return this.ajv.errors;
    }

    hasChildren(){
        return this.internalTree.children != null;
    }

    /**
     * 
     * @callback callback
     */
    eachChild(callback){
        for(let child of this.internalTree.children){
            callback(new Tree(child, true));
        }
    }

    /**
     * @returns {Element}
     */
    createElement(){
        if(typeof this.internalTree == 'string'){
            return document.createTextNode(this.internalTree);
        }
    
        let element = document.createElement(this.internalTree.tag);
    
        for(let attributKey of Object.keys(this.internalTree).filter(key => !['children', 'tag'].includes(key))){
            element.setAttribute(utils.camelToKebab(attributKey), this.internalTree[attributKey]); 
        }

        if(this.internalTree.style){
            for(let styleKey in this.internalTree.style){
                element.style[styleKey] = this.internalTree.style[styleKey];
            }
        }

        return element;
    }
}

export default Tree;