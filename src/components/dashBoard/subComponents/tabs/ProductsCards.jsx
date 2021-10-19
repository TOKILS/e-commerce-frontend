// styled components
import { IconButton, Button, Typography, Card, CardActions, CardContent, CardMedia, Box } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useEffect } from "react";

const ProductsCards = ({ categoryTabItem, products, type, checkPass, typeTabItem }) => {
    useEffect(() => {
        // console.log(`${categoryTabItem} > ${typeTabItem} > ${typeIdx}`, typeTabItem !== typeIdx);
    }, [typeTabItem, categoryTabItem]);
    return (
        <>
            {console.log("products >>> ", products)}
            {console.log(`typeTabItem ${typeTabItem} || checkPass ${checkPass}`)}
            <div role="tabpanel" className="dashboardProductsTab" hidden={typeTabItem !== checkPass}>
                {typeTabItem === checkPass && (
                    <Box m={2} sx={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "1rem" }}>
                        {products.map((product, productIdx) => {
                            // console.log(`product.TypeID ${product.TypeID} || type.id ${type.id}`, product.TypeID === type.id);
                            console.log(`${type.Name} ${type.id} || ${product.TypeIDName} ${product.TypeID}`);
                            if (product.TypeID === type.id) {
                                return (
                                    <Card key={productIdx} sx={{ minHeight: "20rem", backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem" }}>
                                        <CardMedia component="img" height="250" image={product?.color[0]?.image[0]?.Image ? product?.color[0]?.image[0]?.Image : "https://i.imgur.com/odGVdde.png"} alt="x" />
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
                            }
                        })}
                        <Button sx={{ minHeight: "20rem", backgroundColor: "rgb(241, 241, 241)", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Add sx={{ transform: "scale(2)" }} />
                        </Button>
                    </Box>
                )}
            </div>
        </>
    );
};
export default ProductsCards;
