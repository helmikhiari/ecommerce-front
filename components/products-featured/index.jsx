import useSwr from 'swr';
import ProductsCarousel from './carousel/index';
import { useSelector } from 'react-redux';

const ProductsFeatured = () => {
  const {products}=useSelector((state)=>state.products);

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3>Selected just for you</h3>
          <a href="/products" className="btn btn--rounded btn--border">Show All</a>
        </header>

        <ProductsCarousel products={products} />
      </div>
    </section>
  )
};

export default ProductsFeatured