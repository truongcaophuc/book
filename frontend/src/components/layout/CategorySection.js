import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../App1.css";
import { Card, Container, Grid } from "@mui/material";
const CategorySection = ({setCatagory}) => {
  const { category } = useSelector((state) => state.category);
  return (
    <div class="category-area-start category-style-one mt-100 position-relative">
      <div style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
        <div class="row">
          <div class="col-lg-12">
            <div class="section-head-style-one">
              <h2>What do you looking for ?</h2>
              <p>We have variety of catagories available</p>
            </div>
          </div>
        </div>
        <Container>
          <Grid container spacing={3}>
          {category.map((category, idx) => {
            return (
              <Grid item md={2}>
                <Card>
                <div class="category-icon"onClick={
                  ()=>{ setCatagory(category.name)}
                 }>
                  <Link to={`/search/all?category=${category.name}`}>
                    <img src={category.images[0].url} />
                  </Link>
                </div>
                <h5 class="category-title"onClick={
                  ()=>{ setCatagory(category.name)}}>
                  <Link to={`/search/all?category=${category.name}`}>{category.name}</Link>
                </h5>
                </Card>
                
              
              </Grid>
              
            );
          })}
          </Grid>
         

        </Container>
      </div>
    </div>
  );
};

export default CategorySection;