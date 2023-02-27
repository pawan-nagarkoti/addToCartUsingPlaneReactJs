import logo from './logo.svg';
import './App.css';
import data from './data'
import { useEffect, useState } from 'react';

function App() {
  const [list, setList] = useState(data);
  const container = [...list];
  const [cartItem, setCartItem] = useState(container);
  const [getTotal, setGetTotal] = useState(0);

  const handleIncrement = (id) => {
    setCartItem(cartItem.map((item) => {
      if (item.id === id) {
        return { ...item, amount: item.amount + 1 }
      }
      return item;
    }))
  }

  const handleDecrement = (id) => {
    // This logic is also working. 
    // cartItem.map((item) => {
    //   if (item.amount === 1) return { ...item, amount: 1 }
    //   if (item.id === id) {
    //     // return { ...item, amount: item.amount - 1 }
    //     item.amount -= 1
    //   }
    //   return item;
    // })
    // setCartItem([...cartItem])

    // This is another logic
    setCartItem(cartItem.map((item) => {
      if (item.amount === 1) return { ...item, amount: 1 }
      if (item.id === id) {
        return { ...item, amount: item.amount - 1 }
      }
      return item;
    }))
  }

  const handleRemove = (id) => {
    const filterList = cartItem.filter((item) => item.id !== id);
    setCartItem(filterList)
  }

  const getCartTotal = () => {
    const container = cartItem.reduce((acc, item) => {
      const { price, amount } = item;
      const getTotal = price * amount;
      return acc += getTotal;
    }, 0)
    setGetTotal(container)
  }

  useEffect(() => {
    getCartTotal();
  }, [cartItem])

  return (
    <>
      <h1>Cart[{cartItem.length}]</h1>
      {
        cartItem.map(({ id, title, price, img, amount }) =>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3rem'
          }} key={id}>
            <img src={img} width={150} height={150} />
            <span>{title}</span>
            <span>{price}</span>
            <span onClick={() => handleRemove(id)}>Remove</span>
            <button onClick={() => handleDecrement(id)}>-</button>
            <span>{amount}</span>
            <button onClick={() => handleIncrement(id)}>+</button>
          </div>
        )
      }

      <h1>Total: {getTotal}</h1>
    </>
  );
}

export default App;
