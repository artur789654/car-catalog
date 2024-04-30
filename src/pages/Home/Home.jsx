import { withLayout } from "../../components/app/App";
import Carousel from "react-bootstrap/Carousel";
import { carList } from "../../share/carList";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
function Home() {
  const uniqueBrandCars = Array.from(new Map(carList.map(car => [car.manufacturer, car])).values());
  return (
    <>
      <div className="container">
        <Container className={styles.catalogWelcome}>
          <Row className="justify-content-md-center">
            <Col xs={12}>
              <h1 className={styles.textCenter}>
                Welcome to Our New Car Catalog!
              </h1>
              <p className="mb-2">Your guide to the latest in automotive innovation.</p>
            </Col>
          </Row>

            <div className={`mx-auto ${styles.banner}`}>
              <div className="mb-2">
              <img src="https://hips.hearstapps.com/hmg-prod/images/editors-choice-main-landing-illustration-by-ryan-olbrysh-01-1676994537.jpg?resize=2048:*" alt="" />
              </div>
              <p>
                Discover the cutting edge of the automotive world! Our catalog
                offers a wide range of information on the latest car models. We
                are focused on providing you with all the necessary information
                to familiarize yourself with the cutting-edge technologies and
                innovations in the automotive industry. Our catalog is the
                perfect resource for car enthusiasts looking to explore the
                latest releases without the immediate intent to purchase.
              </p>
            </div>
          

          <Row>
            <Col md={8} className="mx-auto">
              <h2>Browse. Marvel. Stay Updated.</h2>
              <ul>
                <li>
                  <strong>Latest Models:</strong> Explore descriptions,
                  specifications, photos, and overviews of the newest car models
                  on the market.
                </li>
                <li>
                  <strong>Innovations and Technologies:</strong> Learn about
                  advanced technologies and innovations being incorporated into
                  the latest vehicles.
                </li>
                <li>
                  <strong>Automotive News:</strong> Get the latest news and
                  updates from the car world to stay on top of all the trends.
                </li>
              </ul>
            </Col>
          </Row>

          <Row>
            <Col md={8} className={`mx-auto ${styles.textCenter}`}>
              <Carousel>
                {uniqueBrandCars.map((car, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={car.photo}
                      alt={car.name}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
              <p>
                Our goal is to provide you with comprehensive information about
                the latest cars, allowing you to experience the full range of
                emotions from exciting new automotive releases, all from the
                comfort of your home.
              </p>
              <p>
                Discover the world of new cars with us. Dive into the details of
                each model and feel the spirit of the latest technologies.
              </p>
              <Link to={'/Carlist'}>
              <button>
                Go to Catalog
              </button>
              </Link>
              
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default withLayout(Home);
