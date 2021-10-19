let item = {
    id: 3,
    TypeID: 2,
    Name: "Jacket",
    Description: "Jacket",
    Price: 100,
    Quantity: 88,
    Discount: 5,
    createdAt: "2021-09-15T10:07:23.636Z",
    updatedAt: "2021-10-18T20:07:04.444Z",
    color: [
        {
            id: 2,
            ProductID: 3,
            Name: "Red",
            Code: "#D64FB0",
            Image: "https://place.dog/300/300",
            createdAt: "2021-10-14T13:16:39.355Z",
            updatedAt: "2021-10-15T13:18:01.226Z",
            image: [
                {
                    id: 2,
                    ColorID: 2,
                    Image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTslxrpb906mkYZbeZbv1ww0SestUkv0dh_pA&usqp=CAU",
                    createdAt: "2021-10-15T13:21:39.919Z",
                    updatedAt: "2021-10-15T13:21:39.919Z",
                },
                {
                    id: 3,
                    ColorID: 2,
                    Image: "https://place.dog/300/300",
                    createdAt: "2021-10-15T14:15:31.229Z",
                    updatedAt: "2021-10-15T14:15:31.229Z",
                },
            ],
            size: [
                {
                    id: 2,
                    ColorID: 2,
                    Size: "XL",
                    createdAt: "2021-10-14T14:58:26.228Z",
                    updatedAt: "2021-10-14T14:58:26.228Z",
                },
            ],
        },
    ],
};

console.log(item.color[0].size[0]);