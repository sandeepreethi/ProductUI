import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./login";
import { useNavigate } from "react-router-dom";

function CRUD() {
  const navigate = useNavigate();
  const [EditAPIData, setEditAPIData] = useState([]);
  const editData = (data) => {
    console.log(data);
    setName(data.name);
    setDescription(data.description);
    setPrice(data.price);
    setProductId(data.id);
    setIsVisible((current) => !current);
  };

  const deleteData = (id) => {
    axios
      .post(
        "https://localhost:44328/api/v1/product/DeleteProduct",
        JSON.stringify({ id: id }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "Bearer " + window.sessionStorage.getItem("UserData"),
            "Content-Type": "application/json charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.data.statusCode == 200) alert("Record has been deleted");
        fetchdata();
      })
      .catch((err) => console.log(err));
  };
  const [fileSelected, setFileSelected] = useState();

  function handleFileChange(event) {
    setFileSelected(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  }
  const [APIData, setAPIData] = useState([]);
  const [formInput, setFormInput] = useState(""); // You can add your "data" as default value
  const fetchdata = (async) => {
    debugger;
    axios
      .get(`https://localhost:44328/api/v1/product/GetAllProducts`, {
        headers: {
          Authorization: "Bearer " + window.sessionStorage.getItem("UserData"),
          "Content-Type": "application/x-www-form-urlencoded charset=utf-8",
        },

        IncludeInactive: true,
        Id: null,
      })
      .then((response) => {
        setAPIData(response.data.value);
      })
      .catch((err) => {
        debugger;
        console.log(err);
      });
  };

  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [ProductId, setProductId] = useState("");

  const [isVisible, setIsVisible] = useState(true);

  const uploadFile = () => {
    const formData = new FormData();
    formData.append("loadFile", fileSelected);

    axios
      .post("https://localhost:44328/api/v1/product/UploadFile", formData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "content-type": "multipart/form-data charset=utf-8",
          Authorization: "Bearer " + window.sessionStorage.getItem("UserData"),
        },
      })
      .then((response) => {
        if (response.data.statusCode == 200)
          alert("File uploaded successfully");
      })
      .catch((err) => console.log(err));
  };
  const logout = () => {
    window.sessionStorage.removeItem("UserData");
    navigate("/login");
  };

  const resetProduct = (event) => {
    setName("");
    setDescription("");
    setPrice("");
    setProductId("");
    setImage("");
    setFileSelected("");
    setIsVisible((current) => !current);
  };
  const saveProduct = () => {
    var postData = JSON.stringify({
      name: Name,
      description: Description,
      price: Price,
    });
    axios
      .post("https://localhost:44328/api/v1/product/AddProduct", postData, {
        headers: {
          authorization: window.sessionStorage.getItem("UserData"),
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + window.sessionStorage.getItem("UserData"),
          "Content-Type": "application/json charset=utf-8",
        },
      })
      .then((response) => {
        if (response.data.statusCode == 200) alert("Record has been added");
        fetchdata();
      })
      .catch((err) => console.log(err));
  };
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  const updateProduct = () => {
    axios
      .put(
        "https://localhost:44328/api/v1/product/UpdateProduct",
        JSON.stringify({
          id: ProductId,
          name: Name,
          description: Description,
          price: Price,
        }),
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization:
              "Bearer " + window.sessionStorage.getItem("UserData"),
            "Content-Type": "application/json charset=utf-8",
          },
        }
      )
      .then((response) => {
        if (response.data.statusCode == 200) alert("Record has been Updated");
        setTimeout(function () {}, 5000);
        fetchdata();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Mounting Phase");
    fetchdata();
  }, []);

  return (
    <div>
      <div className="row p-3 mb-2">
        <div className="col-sm-11">
          <h1 className="text-center">CRUD OPERATION </h1>
        </div>
      </div>
      <div className="container border border-dark addScroll">
        <div className="row p-1 bg-info text-dark border border-dark">
          <div className="col-sm">Id</div>
          <div className="col-sm">Name</div>
          <div className="col-sm">Description</div>
          <div className="col-sm">Price</div>
          <div className="col-sm">Edit Product</div>
          <div className="col-sm">Delete Product</div>
        </div>
        {APIData.map((item, index) => (
          <div
            className="row border"
            data-index={index}
            key={item.id}
          >
            <div className="col-sm ">{item.id}</div>
            <div className="col-sm ">{item.name}</div>
            <div className="col-sm ">
              {item.description.length > 10
                ? item.description.substr(0, 10) + "..."
                : item.description}
            </div>
            <div className="col-sm ">{item.price}</div>
            <div className="col-sm ">
              <input
                type="button"
                className="btn btn-link "
                onClick={() => editData(item)}
                value="Edit"
              />
            </div>
            <div className="col-sm ">
              <input
                className="btn btn-link  text-danger"
                type="button"
                onClick={() => deleteData(item.id)}
                value="Delete"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <form className="container">
          <div className="row p-3 mb-2 border border-dark">
            <div className="col-sm-6">
              <div className="form-group row">
                <label className="col-sm col-form-label">Name</label>
                <div className="col-sm">
                  <input
                    className="form-control"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm col-form-label">Description </label>
                <div className="col-sm">
                  <textarea
                    className="form-control"
                    placeholder="Describe about the product with in 250 chars"
                    maxLength={250}
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm col-form-label">Product Price</label>
                <div className="col-sm">
                  <input
                    className="form-control"
                    pattern="[0-9]*"
                    placeholder="Only Numeric"
                    maxLength={6}
                    value={Price}
                    onChange={(e) =>
                      setPrice((v) =>
                        e.target.validity.valid ? e.target.value : v
                      )
                    }
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm">
                  <input
                    type="button"
                    className="btn btn-primary"
                    onClick={resetProduct}
                    value="Reset Product"
                  />
                </div>
                <div className="col-sm">
                  {ProductId == "" ? (
                    <input
                      type="button"
                      className="btn btn-primary"
                      onClick={saveProduct}
                      value="Save Product"
                    />
                  ) : (
                    <input
                      type="button"
                      className="btn btn-primary"
                      onClick={updateProduct}
                      value="Update Product"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group row">
                <div className="form-group row">
                  <div className="col-sm-6 col-form-label">
                    <label className="col-sm col-form-label">
                      Upload Product Image
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                      accept="image/*"
                    />
                  </div>
                  <div className="col-sm-6 col-form-label">
                    <img
                      width={250}
                      height={120}
                      src={image}
                      accept="image/*"
                    />
                  </div>
                  <div className="form-group">
                    <div className="col-sm">
                      <input
                        type="button"
                        className="btn btn-primary"
                        onClick={uploadFile}
                        value="Upload File"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CRUD;
