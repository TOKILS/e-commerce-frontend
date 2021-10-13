// material
import { Grid } from "@mui/material";
import ShopProductCard from "./ProductCard";

// ----------------------------------------------------------------------

export default function ProductList(props) {
  return (
    <Grid container spacing={3}>
      {[
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: 10,
          colors: ["#00AB55", "#d7d7d7"],
          status: "sale",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#000000"],
          status: "",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#d7d7d7"],
          status: "NEW",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#000000"],
          status: "SALE",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#d7d7d7"],
          status: "NEW",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#000000"],
          status: "",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#d7d7d7"],
          status: "NEW",
        },
        {
          id: "d247f1ff-05d5-4642-a573-46d73501b789",
          cover:
            "https://minimal-kit-react.vercel.app/static/mock-images/products/product_2.jpg",
          name: "Nike Air Force 1 NDESTRUKT",
          price: 72.74,
          priceSale: null,
          colors: ["#00AB55", "#000000"],
          status: "",
        },
      ].map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
