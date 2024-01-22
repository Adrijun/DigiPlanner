import React from 'react';
import { Container, Image, Row, Col } from 'react-bootstrap';
import HeaderImage from '../assets/images/kier-in-sight-archives-nNWb8lN1bqw-unsplash1.jpg';
import '../SassComponents/Header.scss';
import PostIt from '../pages/PostIt';
import Priority from '../pages/Priority';
import { Link } from 'react-router-dom';
import PostItICon from '../assets/icons/notes.png';
import PriorityIcon from '../assets/icons/prioritize.png';
function Header() {
  return (
    <>
      <Container fluid className=" headerContainer">
        <Row className="headerRow">
          <Col className="headerCol">
            <h1 className="headerTitle">DigiPlanner</h1>
            <h2 className="headerUnderTitle text-center">
              {' '}
              Empowering Productivity
            </h2>
          </Col>
        </Row>
      </Container>
      <section className="navbar">
        <Link to={'/postit'}>
          <img src={PostItICon} alt="" width="30" height="30" />
        </Link>
        <Link to={'/priority'}>
          <img src={PriorityIcon} alt="" width="30" height="30" />
        </Link>
      </section>
      <Container></Container>
    </>
  );
}

export default Header;
