import * as fs from 'fs';


// Specify the file path
const filePath = 'test_input.txt';
let tiles;
let steps;
// Use 'fs.readFile' to read the file asynchronously
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err}`);
        return;
    }
    let clean_data = data.replace(/\r/g, "")
    //console.log(getSpringRegex(1))
    //console.log([...".??..??...?##.".matchAll(getSpringRegex(1))])
    let springs:string[]=[]
    let configurations:number[][]=[]
    let lines=clean_data.split("\n")
    lines.forEach(line => {
        let lineParts=line.split(' ')
       springs.push(lineParts[0])
       configurations.push(lineParts[1].split(",").map(n=>parseInt(n)))
    });
    //springs.forEach((spring,index,springs)=>getNumberOfConfigurations(spring,configurations[index]))
    let configuration=[1,1,3]
    let tree=buildTree(".??..??...?##.",configuration)
    //prune each depth
    configuration.forEach(c=>tree=pruneTree(tree))
    let paths= getAllPathsToLeaves(tree)
    console.log(paths)

})
function getAllPathsToLeaves(tree: TreeNode, path: string[] = []): string[] {
    // Concatenate the current node's value to the path
    let currentPath = [...path, String(tree.value)];
  
    // If it's a leaf node, return the path as a single-item array
    if (!tree.children || tree.children.length === 0) {
      return currentPath;
    }
  
  
    // Recursively traverse children and accumulate paths
    for (const child of tree.children) {
      const childPaths = getAllPathsToLeaves(child, currentPath);
      currentPath=currentPath.map(path=>childPaths.map(childPath=>path+childPath)).flat()
    }
    return currentPath;
  }
function checkForDuplicates(combinations:string[]){
    let hasDuplicates=false;
    combinations.forEach((a,aindex,first)=>{
        combinations.forEach((b,bindex,second)=>{
            if(a==b && aindex!=bindex){
                hasDuplicates=true
            }
        })
    })
    return hasDuplicates
}
function pruneTree(tree:TreeNode){
    if(tree.children){
        tree.children=tree.children.filter(child=>child.value!=undefined)
        tree.children.forEach(child=>pruneTree(child))
    }
    return tree
}

  
function buildTree(springs:string,configuration:number[]): TreeNode {
    //console.log(`checking ${springs} for matches of configuration ${configuration}`)
    let matches=[...springs.matchAll(getSpringRegex(configuration[configuration.length-1]))]
    //console.log(matches)
    let indexes=matches.map(m=>m["index"])
    const node: TreeNode = {
        value: "",
        children: indexes.map(index=>{return{value:index.toString()}})
    };
    if(matches.length==0){
                node.value=undefined
                return node
    }

    if (configuration.length==1) {
        node.children= indexes.map(index=>{return{value:index.toString()}})
        return node ; // Leaf node
    }
    let nextConfiguration=[...configuration]
    nextConfiguration.pop()
    indexes.forEach(match=>
        node.children.push(
            buildTree(springs.substring(0,match),nextConfiguration)))
    return node;
}
function getSpringRegex(amountOfDamagedSprings:number){
    let damagedSpringRegex=[...Array(amountOfDamagedSprings)].map(n=>"[\#\?]").join('')
    return new RegExp(`(?=([^\#]${damagedSpringRegex}[^\#]))`,"g")
}
interface TreeNode {
    value?: string;
    children?: TreeNode[];
}