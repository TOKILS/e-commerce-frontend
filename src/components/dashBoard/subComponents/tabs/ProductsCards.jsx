// styled components
import { IconButton, Button, Typography, Card, CardActions, CardContent, CardMedia, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";

const ProductsCards = ({categoryTabItem, products, type, typeIdx, typeTabItem }) => {
  useEffect(() => {
    console.log(`${categoryTabItem} > ${typeTabItem} > ${typeIdx}`, typeTabItem !== typeIdx);
  }, [typeTabItem, categoryTabItem])
    return (
        <>
            <div role="tabpanel" className="dashboardProductsTab" hidden={typeTabItem !== typeIdx}>
                {typeTabItem === typeIdx && (
                    <Box m={2} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
                        {products.map((product, productIdx) => {
                            return (
                                <Card key={productIdx} sx={{ minHeight: "10rem", backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem" }}>
                                    {/* <CardMedia component="img" height="140" image="https://i.imgur.com/tJJ55WXh.jpg" alt="fire-dragon" /> */}
                                    <CardContent>
                                        <Typography sx={{ display: "flex", justifyContent: "space-between" }} gutterBottom variant="h5" component="div">
                                            {product.Name}
                                            {product.Price}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.Description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.Quantity} item in storage
                                        </Typography>
                                    </CardContent>
                                    {/* <CardActions>
                                  <Button size="small">Share</Button>
                                  <Button size="small">Learn More</Button>
                              </CardActions> */}
                                </Card>
                            );
                        })}
                        <Button sx={{ minHeight: "10rem", backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Add sx={{ transform: "scale(2)" }} />
                        </Button>
                    </Box>
                )}
            </div>
        </>
    );
};
export default ProductsCards;
