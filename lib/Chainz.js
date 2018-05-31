import utils from './utils';
import Tree from './Tree';

class Chainz {
    constructor(){
        this.parse = this.parse.bind(this);
    }

    /**
     * 
     * @param {Element} node 
     * @param {Object} tree 
     * @param {boolean} async
     * @returns {(Promise|Object)}
     */
    parse(node, tree, async = true){
        let runLoop = () => {
            // check if dom is ready
            if(!utils.isDomReady()){
                throw 'DOM is not ready, you cannot use chainz on not ready DOM';
            }

            // check if node is dom node
            if(!utils.isNodeExists(node)){
                throw 'The node is Invalide or not in the DOM';
            }

            let treeObject = new Tree(tree);

            // check if tree is valid
            if(!treeObject.isValid()){
                treeObject.getLastError();
                throw 'The tree is not valid';
            }

            return this.treeLoop(node, treeObject);
        };

        if(async){
            return new Promise((resolve, reject) => {
                try {
                    resolve(runLoop());
                } catch (error) {
                    reject(error);
                }
            });
        }else{
            return runLoop();
        }
    }

    /**
     * 
     * @param {Element} parent 
     * @param {Tree} tree 
     */
    treeLoop(parent, tree){
        let element = tree.createElement();

        if(tree.hasChildren()){
            element.chainz = {};
            tree.eachChild((childTree) => {
                let childElement = this.treeLoop(element, childTree);

                // Text elements dont have id
                if(!(childElement instanceof Text)){
                    // if id = 'foo bar', chainz id will be first (foo)
                    element.chainz[childTree.getId()] = childElement;
                }
            });
        }

        parent.appendChild(element);

        return element;
    }
}

export default Chainz;