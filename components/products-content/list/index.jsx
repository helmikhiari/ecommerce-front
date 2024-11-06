import useSwr from 'swr';

import ProductsLoading from './loading';

import ProductItem from 'components/product-item';
import { useSelector } from 'react-redux';

const ProductsContent = () => {
  const {products}=useSelector((state)=>state.products);

  // if (error) return <div>Failed to load Products</div>;
  return (
    <>
      {!products && 
        <ProductsLoading />
      }

      {products &&
        <section className="products-list">
          {products.map((item)  => (
            <ProductItem 
              id={item._id} 
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={(item.price-(item.price*item.onSale))}
              discount={item.onSale}
              key={item.id}
              image={item.image} 
            />
          ))}
        </section>
      }
    </>
  );
};
  
export default ProductsContent