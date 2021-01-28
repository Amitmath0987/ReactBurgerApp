export const updatedObjects =(oldState,newObject) =>{
    return{
        ...oldState,
        ...newObject
    }
}