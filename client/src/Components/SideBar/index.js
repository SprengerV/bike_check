import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./style.css"

const cats = ['Mountain', 'Road', 'Gravel', 'Touring', 'BMX', 'Commuter', 'Custom Builds', 'Vintage'];

const SideBar = (props) => {



  return (
    <Card className="sideBarCard">
      <Card.Header className="categoryHeader">
        Categories
      </Card.Header>
      <Card.Body className="row">
        {cats.map((cat, i) => <>
        <div className="col-6 col-lg-12 col-md-12">
          <button onClick={() => props.getPosts({cat})} className="catBtn"   key={i} variant="light"><a className="sideBarRefs" href={`/category/${cat}`}> {cat}</a> </button>
          </div>
        </>)}
      </Card.Body>
    </Card>
  );
}


export default SideBar;