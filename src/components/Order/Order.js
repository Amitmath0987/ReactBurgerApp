
import classes from './Order.module.css';
const order = (props) => {
   let ingredients = [];
   for(let ingredientName in props.ingredients){
       ingredients.push(
           {
           name: ingredientName,
           amount: props.ingredients[ingredientName]
            }
       );
   }
// console.log(ingredients);
const ingredientOutput = ingredients.map((ing) => {
    return <span 
        style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding: '5px'
        }}
        key={ing.name}>{ing.name} ({ing.amount})</span>; 
});

// salad (1)
   return(
    <div className={classes.Order}>
        <p><strong>Ingredients:</strong> {ingredientOutput}</p>
        <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
    </div>
   )
    
};
export default order;