import Layout from "../components/Layout";
import ProductItems from "../components/ProductItems";
import { ToastContainer } from "react-toastify";
import data from "../utils/data";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <Layout title="Home page">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <ProductItems product={product} key={product.slug}></ProductItems>
          ))}
        </div>
      </Layout>
    </>
  );
}
