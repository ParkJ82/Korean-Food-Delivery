import React from "react";
import {BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CreateAccountWebsite from './Websites/Create Account Widget/CreateAccount';
import HomePage from './Websites/HomePage Widgets/master/HomePage';
import Login from "./Websites/Login Widgets/Login";
import FoodSpecifics from "./Websites/Food Specific Widgets/FoodSpecifics";
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {

  // var csv = require("jquery-csv");
  // var rawData = $.get(url)
  // var data = $.csv.toObjects(rawData);
  // console.log(data);



  // Papa.parse("FoodData.csv", {
  //   complete: function(results) {
  //       console.log(results);
  //   }
  // });

  // const fs = require("fs");
  // const { parse } = require("csv-parse");

  // const data = [];
  // fs.createReadStream("FoodData.csv")
  //   .pipe(
  //     parse({
  //     delimiter: ",",
  //     columns: true,
  //     ltrim: true,
  //     })
  //   )
  //   .on("data", function (row) {
  //     data.push(row);
  //   })
  //   .on("error", function (error) {
  //     console.log(error.message);
  //   })
  //   .on("end", function () {
  //     console.log("parsed csv data: ");
  //     console.log(data);
  //   });

  // var data;
  //   $.ajax({
  //     type: "GET",  
  //     url: "./FoodData.csv",
  //     dataType: "text",       
  //     success: function(response)  
  //     {
  //       data = $.csv.toArrays(response);
  //     }   
  //   });
  //   console.log(data);
  
  // var shoppingCart = [];

  const FOODDATA = [
    {id: 0, name: "된장찌개", englishName: "soybean-paste-stew", category: "국/찌개", price: "$10.00"},
    {id: 1, name: "잡채", englishName: "Japchae", category: "면류", price: "$7.00"},
    {id: 2, name: "김치찌개", englishName: "Kimchi-stew", category: "국/찌개", price: "$10.00"},
    {id: 3, name: "무쌈", englishName: "radish-slices", category: "야채류", price: "$5.00"},
    {id: 4, name: "삼겹살", englishName: "pork-belly", category: "고기류", price: "$18.00"},
    {id: 5, name: "불고기", englishName: "Bulgogi", category: "고기류", price: "$12.00"},
    {id: 6, name: "간장", englishName: "Soy-sauce", category: "미분류", price: "$3.00"}
  ]

  
  var foodRoutes = FOODDATA.map(
    (food) =>
    (<Route 
      id={food.englishName}
      path={food.englishName}
      element={<FoodSpecifics infoArray={[food.name, food.price]} />}
      />
      )

    );



  return (
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage category={"전체 보기"}/>}/>
          <Route path="/createaccount" element={<CreateAccountWebsite />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/all" element={<HomePage category={"전체 보기"}/>}/>
          <Route path="/meat" element={<HomePage category={"고기류"}/>}/>
          <Route path="/soup" element={<HomePage category={"국/찌개"}/>}/>
          <Route path="/noodle" element={<HomePage category={"면류"}/>}/>
          <Route path="/vegetable" element={<HomePage category={"야채류"}/>}/>
          <Route path="/unidentified" element={<HomePage category={"미분류"}/>}/>
          <Route path="/category/example" element={<FoodSpecifics />}/>
          {foodRoutes}
        </Routes>
        
      
      </div>
    
  );
}

export default App;
