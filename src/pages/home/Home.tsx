import { useEffect } from "react";
import Card from "../../globals/components/card/Card";
import Hero from "./components/Hero";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/productSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <Hero />
      <div className="flex flex-col items-center mt-8">
        <h3 className="text-4xl font-bold mb-6 text-gray-900">Top Products</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {product.length > 0 &&
            product.map((pd) => {
              return <Card key={pd.id} data={pd} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
